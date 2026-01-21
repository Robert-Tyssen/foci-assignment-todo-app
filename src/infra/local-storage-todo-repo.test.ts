import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createLocalStorageRepo } from "./local-storage-todo-repo";
import type { Todo } from "../domain/todo";

// Note - this test script runs an end-to-end test on the To-Do local storage repo,
// and thus requires access to a localStorage object. This is built-in to our test
// runner since we are using vitest with the 'jsdom' environment. Without jsdom,
// it may be necessary to mock / spy the localStorage object.

describe("Local To-Do Repository", () => {
  // Clear local storage before each test, and after the suite is completed
  beforeEach(() => localStorage.clear());
  afterAll(() => localStorage.clear());

  // Create the repo to use for tests
  const repo = createLocalStorageRepo();

  // Mock template for operations - individual tests can override fields
  const mockTodo: Todo = {
    id: "",
    title: "",
    description: "",
    dueDate: null,
    createdAt: new Date(),
    isCompleted: false,
  };

  it("End-to-end test", async () => {
    // List should be empty at first
    await expect(repo.readTodoList()).resolves.toHaveLength(0);

    const t1 = { ...mockTodo, id: "todo-1", title: "New To-Do 1" };
    const t2 = { ...mockTodo, id: "todo-2", title: "New To-Do 2" };

    // Create two new To-do's and read list
    await expect(repo.createTodo(t1)).resolves.toEqual(t1); // First created
    await expect(repo.createTodo(t1)).rejects.toThrow(); // Can't create duplicate
    await expect(repo.createTodo(t2)).resolves.toEqual(t2); // Second created
    await expect(repo.readTodoList()).resolves.toHaveLength(2); // Should have both items

    // Read To-do's by id
    await expect(repo.readTodoById(t1.id)).resolves.toEqual(t1); // Reads item 1 correctly
    await expect(repo.readTodoById(t2.id)).resolves.toEqual(t2); // Reads item 2 correctly
    await expect(repo.readTodoById("non-existent")).resolves.toBeNull(); // Non-existent item

    // Delete a To-do
    await expect(repo.delete(t1.id)).resolves.toBe(true); // Delete success
    await expect(repo.delete(t1.id)).resolves.toBe(false); // Cannot delete again
    await expect(repo.readTodoList()).resolves.toHaveLength(1); // Item removed

    // Update the remaining To-do
    const t2Updated = { ...t2, dueDate: new Date(2026, 1, 1) };
    await expect(repo.update(t2Updated)).resolves.toEqual(t2Updated);
    await expect(repo.readTodoById(t2.id)).resolves.toEqual(t2Updated);
    await expect(repo.readTodoById(t2.id)).resolves.not.toEqual(t2);
    await expect(repo.readTodoList()).resolves.toHaveLength(1); // Length same

    // Update a To-do that doesn't exist anymore
    const t1Updated = { ...t1, isComplete: true };
    await expect(repo.update(t1Updated)).resolves.toBeNull();
  });
});
