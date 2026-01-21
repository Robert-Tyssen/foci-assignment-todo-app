import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

/**
 * Get To-do list use case, which returns the entire To-do list by calling the
 * repository function. Returns the entire To-do list if successful. No additional
 * validations or business logic.
 * 
 * @param repo the repository which performs the read operation.
 * @returns 
 */
export const getTodoList = async (repo: TodoRepository): Promise<Todo[]> => {
  return repo.readTodoList();
};
