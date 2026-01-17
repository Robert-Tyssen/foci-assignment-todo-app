import { useQuery } from "@tanstack/react-query";
import { useDependencies } from "../../app/di/DependenciesContext";
import { getTodoById } from "../../domain/usecases/get-todo";
import { queryKeys } from "./query-keys";

/**
 * Custom-hook which handles state management for fetching a single to-do,
 * given its unique id. Uses `useQuery` for caching, loading and error
 * functionality.
 *
 * @param id the unique id of the to-do to be read
 */
export const useTodo = (id: string) => {
  // Fetch the injected repository from dependencies
  const { todoRepository } = useDependencies();

  // Return a query which calls the use case function to fetch the to-do
  return useQuery({
    queryKey: queryKeys.todoDetail(id),
    queryFn: () => getTodoById(todoRepository, id),
  });
};
