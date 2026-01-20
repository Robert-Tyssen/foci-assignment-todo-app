import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDependencies } from "../../app/di/DependenciesContext";
import type { Todo } from "../../domain/todo";
import { updateTodo } from "../../domain/usecases/update-todo";
import { queryKeys } from "./query-keys";

export const useUpdateTodo = () => {
  const { todoRepository } = useDependencies();
  const qc = useQueryClient();

  return useMutation({
    // Mutation function calls the use case to perform the update
    mutationFn: (t: Todo) => updateTodo(todoRepository, t),

    // If successful, invalidate the query keys for the list and detail results
    onSuccess: (_, t) => {
      qc.invalidateQueries({ queryKey: queryKeys.todoList });
      qc.invalidateQueries({ queryKey: queryKeys.todoDetail(t.id) });
    },
  });
};
