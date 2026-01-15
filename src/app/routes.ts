import { createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";
import TodosPage from "../ui/pages/TodosPage";

// Root route which wraps all other routes
const rootRoute = createRootRoute();

// Index route which automatically redirects to main 'todos' routes
const indexRoot = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: todosRoute.to });
  },
});

// ----------------------
// To-Do specific routes
// ----------------------

// To-Do list view routes
const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: TodosPage
});


// Compose routes into route tree, and build the router
const routeTree = rootRoute.addChildren([indexRoot, todosRoute]);
export const router = createRouter({ routeTree });

// Add this so that any routing within the app logic is type-safe
// (e.g. syntax error if route doesn't exist)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}