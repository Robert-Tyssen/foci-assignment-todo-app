import { errorInvalidId, errorNotFound } from "../errors";
import type { TodoRepository } from "../todo-repository";

export const deleteTodo = async (repo: TodoRepository, id: string) => {
  // Validate that the id is not empty
  if (!id) {
    throw Error(errorInvalidId);
  }

  const result = await repo.delete(id);
  if (!result) {
    throw Error(errorNotFound);
  }
};
