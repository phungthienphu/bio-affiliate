import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Thiết lập trong 2 phút",
    desc: "Đăng ký, điền thông tin, thêm sản phẩm — trang bio của bạn sẵn sàng ngay lập tức.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Tùy chỉnh giao diện",
    desc: "6 bộ theme màu sắc đẹp mắt. Thay đổi theo phong cách riêng của bạn bất kỳ lúc nào.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Theo dõi hiệu quả",
    desc: "Xem sản phẩm nào được click nhiều nhất. Tối ưu danh sách để tăng thu nhập affiliate.",
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "var(--color-gradient)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "var(--color-gradient)" }}
        />
      </div>

      {/* ── Nav ── */}
      <header
        className="relative z-10 border-b"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-surface) 85%, transparent)",
          borderColor: "var(--color-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-5 h-13 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "var(--color-gradient)" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="hidden sm:block font-bold text-sm" style={{ color: "var(--color-text)" }}>
              BioAffiliate
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="px-3.5 sm:px-4 py-1.5 text-sm font-semibold rounded-lg text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: "var(--color-gradient)" }}
            >
              <span className="hidden sm:inline">Đăng ký miễn phí</span>
              <span className="sm:hidden">Đăng ký</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-5 py-14 sm:py-28 text-center">
        {/* Badge */}
        <div className="animate-fadeIn mb-6">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--color-primary)",
              borderColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Miễn phí — Không cần thẻ tín dụng
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fadeIn text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-2xl leading-[1.1]"
          style={{ animationDelay: "0.05s", color: "var(--color-text)" }}
        >
          Một trang duy nhất
          <br />
          <span className="t-gradient-text">cho mọi link của bạn</span>
        </h1>

        <p
          className="animate-fadeIn mt-5 text-base sm:text-lg max-w-md leading-relaxed"
          style={{ animationDelay: "0.12s", color: "var(--color-text-secondary)" }}
        >
          Tạo trang bio affiliate cá nhân, chia sẻ sản phẩm yêu thích và theo dõi hiệu quả — chỉ trong vài phút.
        </p>

        {/* CTAs */}
        <div
          className="animate-fadeIn flex flex-col sm:flex-row items-center gap-3 mt-8"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/register"
            className="px-7 py-3 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--color-gradient)", boxShadow: "var(--shadow-md)" }}
          >
            Bắt đầu miễn phí
          </Link>
          <Link
            href="/login"
            className="px-7 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-[var(--color-surface-hover)]"
            style={{
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            Đăng nhập
          </Link>
        </div>

        {/* Preview URL pill */}
        <p
          className="animate-fadeIn mt-4 text-xs"
          style={{ animationDelay: "0.28s", color: "var(--color-text-muted)" }}
        >
          yoursite.com/u/<span style={{ color: "var(--color-primary)" }}>username</span>
        </p>

        {/* ── Features ── */}
        <div
          className="animate-fadeIn mt-20 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{ animationDelay: "0.35s" }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                  color: "var(--color-primary)",
                }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5" style={{ color: "var(--color-text)" }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 border-t py-5 text-center text-xs"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
      >
        © {new Date().getFullYear()} BioAffiliate &middot; Xây dựng với ❤️
      </footer>
    </div>
  );
}
