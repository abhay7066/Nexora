export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const WEB3FORMS_ACCESS_KEY = "db4bca53-dbfe-4d02-b0d7-df3eb6b33f6c";

export async function submitContact(payload: ContactPayload): Promise<void> {
  const formData = new FormData();
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", `New strategy call request from ${payload.name}`);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("company", payload.company);
  formData.append("message", payload.message);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message ?? "Failed to send message.");
  }
}
