import { errorNotFound, errorTitleEmpty } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

/**
 * Update To-do use case, which is used to update an existing To-do with new information.
 * It performs some input validations on the To-do data, then calls the repository function
 * to perform the update. Returns the updated To-do if successful, or throws an error
 * if something goes wrong.
 *
 * @param repo the repository which performs the update operation
 * @param t the updated To-do to be saved
 */
export const updateTodo = async (repo: TodoRepository, t: Todo) => {
  // Validate that the title is not empty
  if (!t.title.trim()) {
    throw new Error(errorTitleEmpty);
  }

  // Call the repository to perform the update and validate that it was successful
  // If no result returned from repo, it indicates the To-do does not exist
  const result = await repo.update(t);
  if (!result) {
    throw new Error(errorNotFound);
  }

  return result;
};
