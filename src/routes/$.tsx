import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Not found — Nexora" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "The page you're looking for doesn't exist." },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <section className="relative min-h-[70vh] pt-32 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <div className="max-w-2xl">
          <div className="eyebrow text-primary">404</div>
          <h1 className="text-gradient mt-6 text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            This page took a <span className="text-gradient-primary italic">wrong turn.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The URL doesn't match anything we've shipped. Head back home, or jump straight into what
            we do.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Back to home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/40"
            >
              Explore services
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
