import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db/client";
import { createServerFn } from "@tanstack/react-start";
import { transaction, wallet } from "@/db/schema/currency";

export const Route = createFileRoute("/_transactions")({});

export const createWalletFn = createServerFn()
  .validator((data: { id: string }) => data)
  .handler(async (ctx) => {
    try {
      await db.insert(wallet).values({ balance: 0, userId: ctx.data.id });
    } catch (error) {
      return { success: false };
    }
    return { success: true };
  });

export const createTransactionFn = createServerFn()
  .validator(
    (data: {
      amount: number;
      description: string;
      type: "income" | "expense";
    }) => data,
  )
  .handler(async ({ data }) => {
    let result;
    try {
      result = await db.insert(transaction).values({
        amount: data.amount,
        description: data.description,
        type: data.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      return { success: false, result: null };
    }
    return { success: true, result };
  });
