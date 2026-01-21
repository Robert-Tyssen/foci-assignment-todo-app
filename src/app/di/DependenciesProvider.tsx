import type { PropsWithChildren } from "react";
import type { AppDependencies } from "./dependencies";
import { createLocalStorageRepo } from "../../infra/local-storage-todo-repo";
import { DependenciesContext } from "./DependenciesContext";

/**
 * Context provider which injectes the dependencies into the React context,
 * so that they can be retrieved at runtime via the `useDependencies()` hook.
 */
export const DependenciesProvider = ({ children }: PropsWithChildren) => {
  // Build the DI container
  const deps: AppDependencies = {
    todoRepository: createLocalStorageRepo(),
  };

  // Return the context, wrapping all children
  return (
    <DependenciesContext.Provider value={deps}>
      {children}
    </DependenciesContext.Provider>
  );
};
