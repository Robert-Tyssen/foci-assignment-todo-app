import type { Todo } from "./todo";

/**
 * Interface defining the data persistence operations for a Todo Repository.
 * The actual implementation is injected at runtime, allowing the actual storage
 * mechanism (e.g. database, local storage, in-memory) to be swapped easily.
 */
export interface TodoRepository {
  /**
   * Creates a new to-do item.
   */
  createTodo(todo: Todo): Promise<Todo>;

  /**
   * Reads the entire to-do list.
   */
  readTodoList(): Promise<Todo[]>;

  /**
   * Reads a to-do item given its unique id. Returns the To-Do if it was found,
   * and null if no item was found
   *
   * @param id the unique id of the to-do being fetched.
   */
  readTodoById(id: string): Promise<Todo | null>;

  /**
   * Updates an existing to-do with new data. Returns the updated To-Do if successful,
   * or null if no To-Do was found for the id.
   *
   * @param todo the updated to-do item.
   */
  update(todo: Todo): Promise<Todo | null>;

  /**
   * Deletes an existing to-do based on its id.
   *
   * @param id the unique id of the to-do to be deleted.
   */
  delete(id: string): Promise<boolean>;
}
