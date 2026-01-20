import type { Todo } from "../domain/todo";
import type { TodoRepository } from "../domain/todo-repository";
import {
  dtoToEntity,
  entityToDto,
  type TodoStorageDto,
} from "./local-storage-dto";

// Storage key used for accessing local storage
const STORAGE_KEY = "foci-todo-list-storage";

/**
 * Factory function which creates an implementation of `TodoRepository`, using local
 * storage for data persistence. Note that this implementation is for demonstration
 * purposes only and contains several limitations:
 *
 *   - It performs actions by reading / saving the entire list. This will become a
 *     performance issue as the list grows.
 *
 *   - If the list grows, it would be beneficial to use pagination, instead of reading
 *     the entire list. This would be a key feature to be added in a production app.
 *
 *   - The data has no reference to the user who created it. In a multi-tenant app,
 *     we may add a `userId` field to the `Todo` data model, and include it when
 *     doing CRUD operations. We would need additional checks server-side to ensure
 *     users can only access / modify their own data, and prevent un-authenticated
 *     users from accessing data at all.
 *
 * @returns an instance of the To-Do repository using local storage for persistence.
 */
export const createLocalStorageRepo = (): TodoRepository => {
  // Helper function which loads to-do items from local storage
  const load = (): TodoStorageDto[] => {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as TodoStorageDto[];
  };

  // Helper function to save to-do items to local storage
  const save = (dtos: TodoStorageDto[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
  };

  return {
    /**
     * Saves a new To-Do item to storage.
     *
     * @param todo the new to-do item to be created.
     * @returns the newly created To-Do item
     * @throws an `Error` if a To-Do already exists with the same id.
     */
    createTodo: async (todo: Todo) => {
      // Get the existing todos, and ensure none exists with the same id
      const todos = load();
      if (todos.find((value) => value.id === todo.id)) {
        throw new Error("Duplicate To-Do id found");
      }

      // Valid date - add it to the local storage
      todos.push(entityToDto(todo));
      save(todos);
      return todo;
    },

    /**
     * Reads all To-Do list items from storage.
     *
     * @returns a list containing all To-Do items. Will return an empty list if
     * no items exist yet.
     */
    readTodoList: async () => {
      const dtos = load();
      return dtos.map((dto) => dtoToEntity(dto));
    },

    /**
     * Reads a single To-Do item, given its unique id.
     *
     * @param id the unique id of the To-Do to be read.
     * @returns the corresponding To-Do if it was found, or null if no To-Do exists with
     * the provided id.
     */
    readTodoById: async (id: string) => {
      // Load the list from storage, and find index with corresponding id
      const list = load();
      const idx = list.findIndex((val) => val.id === id);

      // Item was found - return it
      if (idx >= 0) {
        return dtoToEntity(list[idx]);
      }

      // No item was found with the given id
      return null;
    },

    /**
     * Updates an existing To-Do item with new data.
     *
     * @param todo the updated To-Do to be saved.
     * @returns the updated To-Do if it could be updated successfully, or null if no
     * To-Do exists with the same id.
     */
    update: async (todo: Todo) => {
      // Load the list from storage, and find index with corresponding id
      const list = load();
      const idx = list.findIndex((val) => val.id === todo.id);

      // If item was found, update the list at the index and save
      if (idx >= 0) {
        list[idx] = entityToDto(todo);
        save(list);
        return todo;
      }

      // To-Do not found
      return null;
    },

    /**
     * Deletes the To-Do with the given id.
     *
     * @param id the unique id of the To-Do to be deleted.
     * @returns true if the item was successfully deleted, or false if the id was not found.
     */
    delete: async (id: string) => {
      // Load the list from storage, and find index with corresponding id
      const list = load();
      const idx = list.findIndex((val) => val.id === id);

      // If item was found, remove it and save
      if (idx >= 0) {
        list.splice(idx, 1);
        save(list);
        return true;
      }

      // To-Do not found
      return false;
    },
  };
};
