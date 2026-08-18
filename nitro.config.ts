import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "cloudflare-module",
  cloudflare: {
    wrangler: {
      workers_dev: false,
      routes: [{ pattern: "nexoratech.biz", custom_domain: true }],
    },
  },
});
