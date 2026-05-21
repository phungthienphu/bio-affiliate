import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { GoogleGenAI } from "@google/genai";

const TIMEOUT = 10_000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function uploadFromUrl(imageUrl: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "affiliate",
      resource_type: "image",
    });
    return result.secure_url;
  } catch {
    return "";
  }
}

// ── Shopee: gọi internal API, parse shopid/itemid từ URL ──
async function scrapeShopee(url: string) {
  const m = url.match(/i\.(\d+)\.(\d+)/);
  if (!m) return null;
  const [, shopid, itemid] = m;

  const res = await fetch(
    `https://shopee.vn/api/v4/item/get?itemid=${itemid}&shopid=${shopid}`,
    {
      headers: {
        "User-Agent": UA,
        Referer: "https://shopee.vn/",
        "x-api-source": "pc",
        "x-csrftoken": "shopee",
        "x-requested-with": "XMLHttpRequest",
        "if-none-match-": "",
      },
      signal: AbortSignal.timeout(TIMEOUT),
    }
  );
  if (!res.ok) return null;

  const data = await res.json();
  const item = data?.data?.item;
  if (!item) return null;

  const imageHash = item.image || item.images?.[0];
  const rawImageUrl = imageHash
    ? `https://cf.shopee.vn/file/${imageHash}_tn`
    : "";
  const image = rawImageUrl ? await uploadFromUrl(rawImageUrl) : "";

  // Shopee lưu giá với hệ số 100000 (VND)
  const price = item.price_min
    ? Math.round(item.price_min / 100000)
    : item.price
    ? Math.round(item.price / 100000)
    : 0;

  return {
    name: item.name || "",
    description: (item.description || "").replace(/\n{3,}/g, "\n\n").slice(0, 400),
    image,
    price,
    affiliateUrl: url,
  };
}

// ── TikTok: dùng oembed ──
async function scrapeTikTok(url: string) {
  const res = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
    { signal: AbortSignal.timeout(TIMEOUT) }
  ).catch(() => null);
  if (!res?.ok) return null;

  const data = await res.json();
  if (!data?.title) return null;

  const image = data.thumbnail_url ? await uploadFromUrl(data.thumbnail_url) : "";
  return { name: data.title, description: "", image, price: 0, affiliateUrl: url };
}

// ── General: OG/meta tags ──
function getMeta(html: string, ...props: string[]): string {
  for (const p of props) {
    const m =
      html.match(new RegExp(`<meta[^>]+property=["']${p}["'][^>]+content=["']([^"']*)["']`, "i")) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${p}["']`, "i")) ||
      html.match(new RegExp(`<meta[^>]+name=["']${p}["'][^>]+content=["']([^"']*)["']`, "i"));
    if (m?.[1]) return m[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  }
  return "";
}

function parseOg(html: string, url: string) {
  const name =
    getMeta(html, "og:title", "twitter:title") ||
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
    "";
  const description = getMeta(html, "og:description", "twitter:description", "description");
  const rawImage = getMeta(html, "og:image", "og:image:url", "twitter:image");
  const priceStr =
    getMeta(html, "product:price:amount", "og:price:amount") ||
    html.match(/"price"\s*:\s*"?([\d.]+)"?/)?.[1] ||
    "";
  const price = priceStr ? Math.round(parseFloat(priceStr)) : 0;
  return { name, description, rawImage, price, affiliateUrl: url };
}

// ── AI fallback: Gemini Flash ──
function cleanHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s{3,}/g, "\n")
    .slice(0, 6000);
}

async function scrapeWithAI(html: string, url: string) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const text = cleanHtml(html);

    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Trích xuất thông tin sản phẩm từ nội dung trang web dưới đây và trả về JSON với format:
{"name":"tên sản phẩm","description":"mô tả ngắn dưới 200 ký tự","price":giá_số_nguyên_VND_hoặc_0,"imageUrl":"url ảnh nếu có hoặc rỗng"}

Nội dung trang (${url}):
${text}

Chỉ trả về JSON, không giải thích thêm.`,
    });

    const raw = res.text?.trim() ?? "";
    const json = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(json);

    return {
      name: parsed.name || "",
      description: parsed.description || "",
      image: parsed.imageUrl ? await uploadFromUrl(parsed.imageUrl) : "",
      price: typeof parsed.price === "number" ? parsed.price : 0,
      affiliateUrl: url,
    };
  } catch {
    return null;
  }
}

// ── Main handler ──
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL là bắt buộc" }, { status: 400 });

  try {
    let result = null;

    if (url.includes("shopee.vn") || url.includes("shopee.com")) {
      result = await scrapeShopee(url);
    } else if (url.includes("tiktok.com") || url.includes("vm.tiktok.com")) {
      result = await scrapeTikTok(url);
    }

    if (!result) {
      // Fetch HTML một lần, dùng cho cả OG scraping và AI fallback
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "text/html", "Accept-Language": "vi,en;q=0.9" },
        signal: AbortSignal.timeout(TIMEOUT),
      });
      const html = res.ok ? await res.text() : "";

      if (html) {
        const og = parseOg(html, url);
        if (og.name) {
          const image = og.rawImage ? await uploadFromUrl(og.rawImage) : "";
          result = { name: og.name, description: og.description, image, price: og.price, affiliateUrl: url };
        } else {
          // AI fallback nếu OG không lấy được tên
          result = await scrapeWithAI(html, url);
        }
      }
    }

    if (!result?.name) {
      return NextResponse.json(
        { error: "Không đọc được thông tin từ link này. Bạn có thể điền tay nhé!" },
        { status: 422 }
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Không thể kết nối đến trang web này" },
      { status: 500 }
    );
  }
}
