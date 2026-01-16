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
 *
 * @param repo the repository implementing persistence logic
 * @param param1
 * @returns
 */
export const createTodo = async (
  repo: TodoRepository,
  {
    title,
    description = "",
    dueDate = null,
    isCompleted = false,
  }: CreateTodoParams
) => {
  // Validate that title is not empty
  if (!title.trim()) {
    throw Error("Title cannot be empty");
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
