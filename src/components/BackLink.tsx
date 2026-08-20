import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
    >
      <ArrowLeftIcon className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}
