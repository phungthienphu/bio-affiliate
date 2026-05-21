import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return <AdminUsersClient currentUserId={session.user.id} />;
}
