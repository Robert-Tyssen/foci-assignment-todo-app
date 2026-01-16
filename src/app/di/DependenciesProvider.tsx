import type { PropsWithChildren } from "react";
import type { AppDependencies } from "./dependencies";
import { createLocalStorageRepo } from "../../infra/local-storage-todo-repo";
import { DependenciesContext } from "./DependenciesContext";

export const DependenciesProvider = ({ children }: PropsWithChildren) => {
  const deps: AppDependencies = {
    todoRepository: createLocalStorageRepo(),
  };

  return (
    <DependenciesContext.Provider value={deps}>
      {children}
    </DependenciesContext.Provider>
  );
};
