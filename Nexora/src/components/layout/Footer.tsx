import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/common/Logo";
import { COMPANY, NAV_ITEMS } from "@/constants/nav";
import { SERVICES } from "@/constants/services";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">{COMPANY.description}</p>
        </div>
        <FooterColumn
          heading="Company"
          links={NAV_ITEMS.map((n) => ({ label: n.label, to: n.to }))}
        />
        <FooterColumn
          heading="Services"
          links={SERVICES.map((s) => ({
            label: s.title,
            to: "/services",
          }))}
        />
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </h3>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-sm text-foreground hover:text-primary"
          >
            {COMPANY.email}
          </a>
          <p className="text-sm text-muted-foreground">{COMPANY.location}</p>
          <Link
            to="/contact"
            className="mt-2 inline-flex w-fit rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Book a strategy call
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>Built for ambitious businesses.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
