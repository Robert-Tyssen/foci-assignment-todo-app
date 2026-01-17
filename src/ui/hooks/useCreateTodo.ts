import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDependencies } from "../../app/di/DependenciesContext";
import { createTodo } from "../../domain/usecases/create-todo";
import { queryKeys } from "./query-keys";

interface UseCreateTodoProps {
  title: string;
  description: string;
  dueDate: Date | null;
}

export const useCreateTodo = () => {
  const { todoRepository } = useDependencies();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ title, description, dueDate }: UseCreateTodoProps) =>
      createTodo(todoRepository, { title, description, dueDate }),

    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.todoList }),
  });
};
