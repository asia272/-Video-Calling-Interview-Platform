import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://well-kodiak-83.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;



