"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button, Input, Textarea, Card, Modal, Badge, Toggle, IconImage } from "@/components/ui";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  affiliateUrl: string;
  price: number;
  showPrice: boolean;
  category: string;
  isActive: boolean;
  clicks: number;
  order: number;
}

const EMPTY_FORM = {
  name: "",
  description: "",
  image: "",
  affiliateUrl: "",
  price: 0,
  showPrice: false,
  category: "",
  isActive: true,
  order: 0,
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateField = <K extends keyof typeof EMPTY_FORM>(
    key: K,
    value: (typeof EMPTY_FORM)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    updateField("image", data.url);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/products/${editing}` : "/api/products";
    const method = editing ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setShowForm(false);
    setEditing(null);
    setSaving(false);
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      image: product.image,
      affiliateUrl: product.affiliateUrl,
      price: product.price,
      showPrice: product.showPrice ?? false,
      category: product.category,
      isActive: product.isActive,
      order: product.order,
    });
    setEditing(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleToggleActive = async (product: Product) => {
    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !product.isActive }),
    });
    fetchProducts();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
  const activeCount = products.filter((p) => p.isActive).length;

  const stats = [
    { label: "Tổng sản phẩm", value: products.length, color: "var(--color-text)" },
    { label: "Đang hiển thị", value: activeCount, color: "#059669" },
    { label: "Tổng clicks", value: totalClicks, color: "var(--color-primary)" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-xs sm:text-sm t-text-muted">
              {stat.label}
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold t-text">
          Quản lý sản phẩm
        </h1>
        <Button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? "Đóng" : "+ Thêm"}
        </Button>
      </div>

      {/* Product Form Modal */}
      <Modal
        open={showForm}
        onClose={resetForm}
        title={editing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tên sản phẩm *"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
          <Input
            label="Link Affiliate *"
            type="url"
            value={form.affiliateUrl}
            onChange={(e) => updateField("affiliateUrl", e.target.value)}
            placeholder="https://..."
            required
          />

          <Textarea
            label="Mô tả"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Danh mục"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              placeholder="Ví dụ: Công nghệ"
            />
            <Input
              label="Thứ tự hiển thị"
              type="number"
              value={form.order}
              onChange={(e) => updateField("order", Number(e.target.value))}
            />
          </div>

          {/* Price + showPrice toggle */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <Input
              label="Giá (VND)"
              type="number"
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
            <div className="pb-1">
              <Toggle
                label="Hiện giá cho người xem"
                checked={form.showPrice}
                onChange={(checked) => updateField("showPrice", checked)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium t-text-sub">
              Hình ảnh *
            </label>
            <label
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors"
              style={{ borderColor: form.image ? "var(--color-primary)" : "var(--color-border)" }}
            >
              {form.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={form.image}
                    alt="Preview"
                    fill
                    className="object-contain rounded-xl p-2"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <IconImage className="w-8 h-8 mx-auto mb-2 t-text-muted" />
                  <p className="text-sm t-text-muted">
                    {uploading ? "Đang tải ảnh..." : "Click để chọn ảnh"}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              loading={saving}
              disabled={saving || uploading || !form.image}
            >
              {editing ? "Cập nhật" : "Thêm sản phẩm"}
            </Button>
            <Button variant="secondary" type="button" onClick={resetForm}>
              Hủy
            </Button>
          </div>
        </form>
      </Modal>

      {/* Products List - Card layout thay vì table */}
      <Card padding={false}>
        {products.length === 0 ? (
          <div className="text-center py-16 t-text-muted">
            <div className="text-4xl mb-3">📦</div>
            <p>Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <div>
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 transition-opacity ${
                  !product.isActive ? "opacity-40" : ""
                } ${index < products.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
              >
                {/* Image */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1 t-text">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {product.category && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full t-text-primary t-bg-hover">
                        {product.category}
                      </span>
                    )}
                    <span className="text-xs t-text-muted">
                      {product.clicks} clicks
                    </span>
                    {product.showPrice && product.price > 0 && (
                      <span className="text-xs font-medium t-text-primary">
                        {product.price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <Badge
                    variant={product.isActive ? "success" : "default"}
                    onClick={() => handleToggleActive(product)}
                  >
                    {product.isActive ? "Hiện" : "Ẩn"}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                    Sửa
                  </Button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
