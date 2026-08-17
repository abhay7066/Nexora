import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/services/contactService";
import { fadeUp, viewportOnce } from "@/hooks/useMotion";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Inline field validation
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name) newErrors.name = "Please enter your name.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email.";
    if (!message) newErrors.message = "Please describe what you are looking to grow.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      await submitContact({ name, email, company, message });
      setStatus("success");
      toast.success("Strategy call requested!", {
        description: "We will review your project and get back to you within 1 business day.",
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      toast.error("Failed to send message.", {
        description: "Please check your network connection or email us directly.",
      });
    }
  }

  if (status === "success") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="surface-card flex flex-col items-center gap-4 p-12 text-center border border-primary/30"
      >
        <CheckCircle2 className="size-12 text-primary" />
        <h2 className="font-display text-3xl font-bold text-foreground">Message Received!</h2>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Thank you for reaching out. A senior builder on our team will review your inquiry and get back to you within one business day.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="mt-4 rounded-full border-border text-xs uppercase tracking-widest font-mono"
        >
          Send another message
        </Button>
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
      className="surface-card flex flex-col gap-6 p-8 md:p-10 border border-border/60 hover:border-primary/20 transition-all duration-300"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" error={errors.name} placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} placeholder="jane@company.com" />
      </div>
      <Field label="Company / Website" name="company" autoComplete="organization" placeholder="Company or domain" />
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="message"
          className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
        >
          What are you looking to grow? <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          className="border-border bg-background/50 focus-visible:ring-primary leading-relaxed text-sm"
          placeholder="Tell us about your business stage, current tech stack, or the growth constraint you're feeling."
        />
        {errors.message && <span className="text-xs font-mono text-destructive">{errors.message}</span>}
      </div>
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm transition-all"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Submitting Request...
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            Request a Strategy Call
            <ArrowRight className="size-4" />
          </span>
        )}
      </Button>
      {status === "error" && (
        <p className="text-xs font-mono text-destructive text-center">
          Something went wrong. Please email us directly at hello@nexora.com.
        </p>
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
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 border-border bg-background/50 focus-visible:ring-primary text-sm"
      />
      {error && <span className="text-xs font-mono text-destructive">{error}</span>}
    </div>
  );
}
