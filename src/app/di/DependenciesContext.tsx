import { createContext, useContext } from "react";
import type { AppDependencies } from "./dependencies";

/**
 * Context for accessing injected application dependencies.
 */
export const DependenciesContext = createContext<AppDependencies | null>(null);

/**
 * Custom react hook for accessing injected application dependencies provided
 * by the context. Safe to use within components as long as they have a
 * `DependenciesProvider` (or `DependenciesContext.Provider`) as an ancestor.
 */
export const useDependencies = (): AppDependencies => {
  // Ensure that the context has been provided by an upstream component
  const ctx = useContext(DependenciesContext);
  if (!ctx) {
    throw new Error("useDependencies must be used within DependenciesProvider");
  }
  return ctx;
};
