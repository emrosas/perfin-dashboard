// app/routes/index.tsx
import { createFileRoute, Router, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getUser(),
});

const getUser = createServerFn().handler(async () => {
  const users = await db.select().from(usersTable).all();

  return { users };
});

const createUser = createServerFn({
  method: "POST",
})
  .validator((data: { name: string }) => data)
  .handler(async (ctx) => {
    const user = await db.insert(usersTable).values(ctx.data).returning().get();

    return { user };
  });

function Home() {
  const { users } = Route.useLoaderData();
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim()) {
      await createUser({ data: { name } });
    }
    setName("");
    await router.invalidate();
  };

  return (
    <main className="grid grid-cols-[1fr_4fr] p-4 gap-8">
      <h1 className="text-xl font-medium">Perfin</h1>
      <div className="flex flex-col">
        <form
          className="flex flex-col items-start mb-8"
          onSubmit={handleSubmit}
        >
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black/15 rounded-sm py-1 px-2"
          />
        </form>
        <table>
          <thead className="text-left p-8">
            <th className="w-24">ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
