import { errorNotFound, errorTitleEmpty } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

export const updateTodo = async (repo: TodoRepository, t: Todo) => {
  // Validate that the title is not empty
  if (!t.title.trim()) {
    throw new Error(errorTitleEmpty);
  }

  const result = await repo.update(t);
  if (!result) {
    throw new Error(errorNotFound);
  }

  return result;
};
