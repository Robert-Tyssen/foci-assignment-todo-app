import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";

/**
 * 
 * @param repo 
 * @returns 
 */
export const getTodoList = async (repo: TodoRepository): Promise<Todo[]> => {
  return repo.readTodoList();
};
