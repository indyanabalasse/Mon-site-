import Link from "next/link";
import LogoutButton from "./LogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/newsletter", label: "Newsletter" },
] as const;

export default function AdminHeader({
  active,
}: {
  active: (typeof NAV_LINKS)[number]["href"];
}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-8">
          <span className="font-serif text-lg sm:text-xl font-medium">
            INDYANASTUDIO
          </span>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === link.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
