import { errorInvalidId, errorNotFound } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

/**
 * Get To-do by Id use case, which is used to read the details for a single To-do object,
 * given its id. Currently, this returns identical information that would be available
 * from the `getTodoList()` use case; however, in a larger application with more complex
 * data, this use case may be modified to return more details (e.g. a `DetailedTodo`).
 *
 * It invokes the read operation on the repository, and returns the resulting To-do.
 *
 * @param repo the repository performing the read operation
 * @param id the unique id of the To-do to be read
 */
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
