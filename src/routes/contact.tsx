import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { COMPANY } from "@/constants/nav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nexora" },
      {
        name: "description",
        content:
          "Book a strategy call with Nexora — an AI-powered business growth company. We respond within one business day.",
      },
      { property: "og:title", content: "Contact — Nexora" },
      {
        property: "og:description",
        content: "Book a 30-minute strategy call with our team.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's talk"
        title={
          <>
            Book a <span className="text-gradient-primary italic">strategy call.</span>
          </>
        }
        lead="Tell us where you're stuck and where you want to go. We'll come back with a working POV — usually within one business day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <aside className="flex flex-col gap-8">
            <ContactItem
              icon={<Mail className="size-5" />}
              label="Email"
              value={COMPANY.email}
              href={`mailto:${COMPANY.email}`}
            />
            <ContactItem
              icon={<MapPin className="size-5" />}
              label="Where we work"
              value={COMPANY.location}
            />
            <ContactItem
              icon={<Phone className="size-5" />}
              label="Response time"
              value="Within one business day"
            />
            <div className="surface-card mt-4 p-6">
              <p className="text-sm text-muted-foreground">
                Prefer to skip the form? Email us directly and mention your business, stage and
                where you feel stuck.
              </p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-primary">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-1 text-base text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="transition-colors hover:text-primary">
      {content}
    </a>
  ) : (
    content
  );
}
