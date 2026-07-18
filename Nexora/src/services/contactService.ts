export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Placeholder contact submission service.
 * Replace with real API / server function when backend is wired up.
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[contactService] submission", payload);
  }
}
