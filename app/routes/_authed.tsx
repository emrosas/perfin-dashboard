import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession();
    if (!data?.session) {
      return redirect({ to: "/signin" });
    }
    if (error) throw new Error("Not authenticated");
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <div>Not authenticated</div>;
    }

    throw error;
  },
});
