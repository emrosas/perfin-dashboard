import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex items-center justify-center flex-grow">
      <div className="border-white/10 border text-center rounded-lg bg-white/5 py-6 px-5">
        <h1 className="text-3xl font-medium">
          Welcome to <span className="text-orange-600">Perfin</span>
        </h1>
        <p className="opacity-60 mt-2">
          This is your sign to start taking care of your finances.
        </p>
        <div className="flex items-center gap-2 mt-4 justify-center">
          <Link
            to="/signin"
            className="border border-white/15 bg-white/5 hover:bg-white/15 transition ease-out rounded-md px-2 py-1 cursor-pointer"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="border border-white/15 bg-white/5 hover:bg-white/15 transition ease-out rounded-md px-2 py-1 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
