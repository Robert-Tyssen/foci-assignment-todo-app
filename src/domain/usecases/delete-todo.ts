import { errorInvalidId, errorNotFound } from "../errors";
import type { TodoRepository } from "../todo-repository";

/**
 * Use case for the deletion of a To-do object. Validates that the id is valid,
 * and then invokes the repository function to perform the deletion. Does not
 * return anything if successful, and throws an error if unucessful.
 *
 * @param repo the repository which performs the delete action.
 * @param id the unique id of the To-do to be deleted.
 */
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
