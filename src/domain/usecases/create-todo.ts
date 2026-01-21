import { errorTitleEmpty } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

// Input parameters for creating a to-do item.
// Title is the only mandatory field.
interface CreateTodoParams {
  title: string;
  description?: string;
  dueDate?: Date | null;
  isCompleted?: boolean;
}

/**
 * Use case for creation of a To-do object. It performs a validation of the inputs,
 * then invokes the create function from the repository input. If successful, the
 * created To-do object is returned to the caller.
 *
 * @param repo the repository implementing persistence logic
 * @returns
 */
export const createTodo = async (
  repo: TodoRepository,
  {
    title,
    description = "",
    dueDate = null,
    isCompleted = false,
  }: CreateTodoParams,
) => {
  // Validate that title is not empty
  if (!title.trim()) {
    throw Error(errorTitleEmpty);
  }

  // Build the to-do entity
  const t: Todo = {
    id: crypto.randomUUID(),
    title,
    description,
    isCompleted,
    dueDate: dueDate,
    createdAt: new Date(),
  };

  // Call the repo to create the to-do and return
  await repo.createTodo(t);
  return t;
};
