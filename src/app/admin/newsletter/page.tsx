import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin-auth";
import AdminHeader from "@/components/admin/AdminHeader";
import NewsletterAdmin from "@/components/admin/NewsletterAdmin";

export default async function AdminNewsletterPage() {
  const store = await cookies();
  if (!isAdminSessionValid(store)) redirect("/admin/login");

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader active="/admin/newsletter" />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">
        <NewsletterAdmin />
      </main>
    </div>
  );
}
