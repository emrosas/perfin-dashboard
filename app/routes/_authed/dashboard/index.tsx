import { db } from "@/app/db/client";
import { wallet } from "@/app/db/schema/currency";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/_authed/dashboard/")({
  loader: async (ctx) =>
    await getDashboardData({ data: ctx.context.session.user.id }),
  component: RouteComponent,
});

const getDashboardData = createServerFn()
  .validator((data: string): string => data)
  .handler(async ({ data }) => {
    const walletData = await db
      .select()
      .from(wallet)
      .where(eq(wallet.userId, data));

    return walletData;
  });

function RouteComponent() {
  const walletData = useLoaderData({ from: "/_authed/dashboard/" });
  return <div>Hello, your balance is {walletData[0].balance}</div>;
}
