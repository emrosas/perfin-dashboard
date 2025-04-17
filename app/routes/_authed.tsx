import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../lib/server/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { SignIn } from "./signin";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    const request = getWebRequest();
    if (request === undefined) {
      throw new Error("Request is undefined");
    }

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      throw new Error("Not authenticated");
    }

    console.log(session);
    return {
      session,
    };
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <SignIn />;
    }

    throw error;
  },
});
