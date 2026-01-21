import { errorInvalidId, errorNotFound } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

export const getTodoById = async (
  repo: TodoRepository,
  id: string,
): Promise<Todo> => {
  // Validate that an id was provided
  if (!id) {
    throw new Error(errorInvalidId);
  }

  // Attempt to fetch the To-Do from the repository, and throw an error
  // if none was found for the given id
  const result = await repo.readTodoById(id);
  if (!result) {
    throw new Error(errorNotFound);
  }

  return result;
};
