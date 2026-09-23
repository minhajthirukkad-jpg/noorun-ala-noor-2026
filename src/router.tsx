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

  const isGhPages =
    typeof window !== "undefined" && window.location.pathname.startsWith("/noorun-ala-noor-2026");
  const basepath = isGhPages ? "/noorun-ala-noor-2026" : undefined;

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
