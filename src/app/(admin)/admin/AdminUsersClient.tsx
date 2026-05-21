"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button, Card, Badge, Input, Modal } from "@/components/ui";
import LoadingSpinner from "@/components/LoadingSpinner";

interface UserWithStats {
  _id: string;
  email: string;
  username: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  productLimit: number;
  productCount: number;
  totalClicks: number;
  createdAt: string;
}

export default function AdminUsersClient({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserWithStats | null>(null);
  const [editLimit, setEditLimit] = useState("");
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (active) {
          setUsers(data);
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, []);

  const handleToggleStatus = async (user: UserWithStats) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    await fetch(`/api/admin/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    reload();
  };

  const handleSaveLimit = async () => {
    if (!editingUser) return;
    setSaving(true);
    await fetch(`/api/admin/users/${editingUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productLimit: Number(editLimit) }),
    });
    setSaving(false);
    setEditingUser(null);
    reload();
  };

  const handleDelete = async (user: UserWithStats) => {
    if (!confirm(`Xóa tài khoản @${user.username}? Toàn bộ dữ liệu sẽ bị xóa.`)) return;
    await fetch(`/api/admin/users/${user._id}`, { method: "DELETE" });
    reload();
  };

  if (loading) return <LoadingSpinner />;

  const stats = [
    { label: "Tổng users", value: users.length },
    { label: "Đang hoạt động", value: users.filter((u) => u.status === "active").length },
    { label: "Tổng sản phẩm", value: users.reduce((s, u) => s + u.productCount, 0) },
    { label: "Tổng clicks", value: users.reduce((s, u) => s + u.totalClicks, 0) },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-xs t-text-muted">{stat.label}</p>
            <p className="text-xl font-bold mt-1 t-text">{stat.value.toLocaleString()}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold t-text">Quản lý Users</h1>
      </div>

      <Card padding={false}>
        {users.length === 0 ? (
          <div className="text-center py-16 t-text-muted">Chưa có user nào</div>
        ) : (
          <div>
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`px-4 sm:px-5 py-3.5 ${
                  index < users.length - 1 ? "border-b border-(--color-border)" : ""
                }`}
              >
                {/* Main row: avatar + info + desktop actions */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm"
                    style={{ background: "var(--color-gradient)" }}
                  >
                    {user.username[0].toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/u/${user.username}`}
                        target="_blank"
                        className="font-medium text-sm t-text hover:underline"
                      >
                        @{user.username}
                      </Link>
                      {user.role === "admin" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                          admin
                        </span>
                      )}
                    </div>
                    <p className="text-xs t-text-muted truncate">{user.email}</p>
                    <p className="text-xs t-text-muted mt-0.5">
                      {user.productCount}/{user.productLimit} sản phẩm &middot; {user.totalClicks} clicks
                    </p>
                  </div>

                  {/* Desktop actions */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <Badge
                      variant={user.status === "active" ? "success" : "default"}
                      onClick={() => handleToggleStatus(user)}
                    >
                      {user.status === "active" ? "Active" : "Tạm dừng"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingUser(user);
                        setEditLimit(String(user.productLimit));
                      }}
                    >
                      Giới hạn
                    </Button>
                    {user._id !== currentUserId && (
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile actions row */}
                <div className="flex sm:hidden items-center gap-2 mt-2.5 pl-12">
                  <Badge
                    variant={user.status === "active" ? "success" : "default"}
                    onClick={() => handleToggleStatus(user)}
                  >
                    {user.status === "active" ? "Active" : "Tạm dừng"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingUser(user);
                      setEditLimit(String(user.productLimit));
                    }}
                  >
                    Giới hạn
                  </Button>
                  {user._id !== currentUserId && (
                    <button
                      onClick={() => handleDelete(user)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        title={`Giới hạn sản phẩm: @${editingUser?.username}`}
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Số sản phẩm tối đa"
            type="number"
            value={editLimit}
            onChange={(e) => setEditLimit(e.target.value)}
          />
          <div className="flex gap-3">
            <Button onClick={handleSaveLimit} loading={saving}>Lưu</Button>
            <Button variant="secondary" onClick={() => setEditingUser(null)}>Hủy</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
