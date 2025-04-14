import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-[320px_1fr]">
      <Outlet />
    </div>
  );
}
