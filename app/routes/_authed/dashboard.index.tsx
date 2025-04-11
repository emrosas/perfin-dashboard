import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return <main className="mt-4 flex-grow">Dashboard page</main>;
}
