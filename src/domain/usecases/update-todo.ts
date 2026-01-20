import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

export const updateTodo = async (repo: TodoRepository, t: Todo) => {
  // Validate that the title is not empty
  if (!t.title.trim()) {
    throw new Error("Title cannot be empty");
  }

  const result = await repo.update(t);
  if (!result) {
    throw new Error("To-Do not found");
  }

  return result;
};
