// app/routes/__root.tsx
import styles from "@/app/styles/app.css?url";
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Perfin",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: styles,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function NotFoundComponent() {
  return (
    <main className="flex-grow flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold">404 Not Found</h1>
        <p>
          <span className="opacity-60">Go back to the </span>
          <Link to="/" className="text-green-600 hover:underline">
            Home page
          </Link>
        </p>
      </div>
    </main>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="bg-black/95 text-white flex flex-col min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
