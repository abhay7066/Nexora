import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/services/contactService";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      await submitContact({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="surface-card flex flex-col items-center gap-4 p-12 text-center"
      >
        <CheckCircle2 className="size-10 text-primary" />
        <h2 className="font-display text-2xl text-foreground">Message received.</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          A member of our team will be in touch within one business day with a proposed strategy
          call.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit}
      className="surface-card flex flex-col gap-5 p-8 md:p-10"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <Field label="Company" name="company" autoComplete="organization" />
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="message"
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          What are you looking to grow?
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          className="border-border bg-background/50 focus-visible:ring-primary"
          placeholder="Tell us about your business, stage and the growth constraint you're feeling."
        />
      </div>
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {status === "submitting" ? "Sending..." : "Request a strategy call"}
        <ArrowRight className="ml-1 size-4" />
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong. Please email us directly.</p>
      )}
    </motion.form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 border-border bg-background/50 focus-visible:ring-primary"
      />
    </div>
  );
}
