import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDependencies } from "../../app/di/DependenciesContext";
import { deleteTodo } from "../../domain/usecases/delete-todo";
import { queryKeys } from "./query-keys";

export const useDeleteTodo = () => {
  const { todoRepository } = useDependencies();
  const qc = useQueryClient();

  return useMutation({
    // Mutation function calls the use case to perform the deletion
    mutationFn: (id: string) => deleteTodo(todoRepository, id),

    // If successful, invalidate the query keys
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.todoList });
      qc.invalidateQueries({ queryKey: queryKeys.todoDetail(id) });
    },
  });
};
