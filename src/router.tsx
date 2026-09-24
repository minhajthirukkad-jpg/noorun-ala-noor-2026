import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  let basepath: string | undefined = undefined;
  if (typeof window !== "undefined") {
    const p = window.location.pathname.toLowerCase();
    if (p.startsWith("/noorun-ala-noor-2026/docs")) {
      basepath = "/noorun-ala-noor-2026/docs";
    } else if (p.startsWith("/noorun-ala-noor-2026")) {
      basepath = "/noorun-ala-noor-2026";
    }
  }

  const router = createRouter({
    routeTree,
    basepath,
    context: {
      queryClient,
    },
    scrollRestoration: true,
  });

  return router;
}

export type AppRouter = ReturnType<typeof getRouter>;

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
