import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (data?.session) {
      return redirect({ to: "/dashboard" });
    }
  },
  component: SignIn,
});

function SignIn() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message || "Something went wrong. Try again later.");
      setPending(false);
      return;
    }

    setEmail("");
    setPassword("");
    setName("");
    setPending(false);

    router.navigate({ to: "/dashboard" });
  };

  return (
    <main className="flex-grow mt-64">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-white/15 rounded-md px-2 py-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white/15 rounded-md px-2 py-1"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white/15 rounded-md px-2 py-1"
          />
          <button
            type="submit"
            className={`border border-white/15 bg-white/5 hover:bg-white/15 transition ease-out rounded-md px-2 py-1 ${pending ? "cursor-not-allowed pointer-events-none opacity-60" : "cursor-pointer"}`}
          >
            Sign Up
          </button>
        </form>
        {error && (
          <div className="text-red-600 opacity-60 flex items-center gap-2 mt-4 text-sm">
            <div
              aria-hidden="true"
              className="bg-red-600 text-white rounded-full size-4 flex items-center justify-center text-xs"
            >
              i
            </div>
            {error}
          </div>
        )}
        <div className="text-sm mt-4 text-white/50">
          Already have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
