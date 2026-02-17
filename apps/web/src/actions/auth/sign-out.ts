import { authClient } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return {};
}
