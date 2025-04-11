import { authClient } from "@/app/lib/auth-client";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data, error } = authClient.useSession();

  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/signin" });
        },
      },
    });
  };

  return (
    <div className="flex-grow flex-col flex p-8" id="wrapper">
      <nav className="flex justify-between items-center">
        <h1>Welcome back {data?.user.name}!</h1>
        <button
          onClick={handleClick}
          className="border border-white/15 bg-white/5 hover:bg-white/15 transition ease-out cursor-pointer rounded-md px-3 py-1"
        >
          Sign Out
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
