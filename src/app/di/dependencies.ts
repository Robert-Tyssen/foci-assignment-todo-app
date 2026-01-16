import type { TodoRepository } from "../../domain/todo-repository";

/**
 * Interface acting as a dependency-injection contain for any dependencies
 * used throughout the app (e.g. repository instances, etc.). It is used
 * to create a `DependenciesContext` and `DependenciesProvider` which can
 * expose dependencies throughout the tree via the `useDependencies` hook.
 *
 * Also allows custom hooks and components to be tested using mock repository
 * implementations.
 */
export interface AppDependencies {
  todoRepository: TodoRepository;
}
