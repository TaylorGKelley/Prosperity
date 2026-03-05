"use client";

import { signIn } from "@/actions/auth/sign-in";
import Link from "next/link";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {
    values: {
      email: "",
      password: "",
    },
  });

  return (
    <form action={action} className="grid w-fit gap-4">
      <div className="grid w-sm">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state.values.email}
          required
          aria-describedby="email-error"
          className="px-4 py-2 border rounded-xl"
        />
        {state.errors?.email && (
          <p id="email-error">{state.errors.email.join(", ")}</p>
        )}
      </div>
      <div className="grid w-sm">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={state.values.password}
          required
          aria-describedby="password-error"
          className="px-4 py-2 border rounded-xl"
        />
        {state.errors?.password && (
          <p id="password-error">{state.errors.password.join(", ")}</p>
        )}
      </div>
      {state.message && <p aria-live="polite">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="py-2 px-3 hover:bg-gray-500/10 bg-gray-50 dark:bg-gray-900 border rounded-xl cursor-pointer"
      >
        {pending ? "Logging in..." : "sign-in"}
      </button>
      <p>
        Dont have an account? <Link href="/auth/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
