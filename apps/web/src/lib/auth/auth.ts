import { passkey } from "@better-auth/passkey";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: process.env.API_URL,
  plugins: [nextCookies(), twoFactor(), passkey()],
});
