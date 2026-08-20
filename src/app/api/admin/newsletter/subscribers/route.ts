import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { listContacts } from "@/lib/newsletter/resend";

export async function GET() {
  const store = await cookies();
  if (!isAdminSessionValid(store)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await listContacts();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Admin newsletter: failed to list subscribers", error);
    return NextResponse.json({ error: "list_failed" }, { status: 500 });
  }
}
