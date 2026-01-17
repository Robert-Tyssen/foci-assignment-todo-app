import { useQuery } from "@tanstack/react-query";
import { useDependencies } from "../../app/di/DependenciesContext";
import { getTodoList } from "../../domain/usecases/get-todo-list";
import { queryKeys } from "./query-keys";

/**
 * Custom hook which uses tanstack-query to handle state management for
 * loading the to-do list. The `useQuery` hook includes parameters for
 * error and loading states, and resolved data from the query.
 * 
 * See https://tanstack.com/query/latest for details on `useQuery` behavior.
 */
export const useTodoList = () => {
  const { todoRepository } = useDependencies();

  return useQuery({
    queryKey: queryKeys.todoList,
    queryFn: () => getTodoList(todoRepository),
  });
};
