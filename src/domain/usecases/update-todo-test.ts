import { describe, expect, it } from "vitest";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";
import { updateTodo } from "./update-todo";
import { errorNotFound, errorTitleEmpty } from "../errors";

// Mock implementation that passes back the to-do, except for a given condition
const fakeRepo: Partial<TodoRepository> = {
  update: async (todo: Todo): Promise<Todo | null> => {
    // Add some mock failure conditions
    if (todo.id === "id-will-fail") throw Error("unexpected error");
    if (todo.id === "id-not-found") return null;

    // Normal case - update successful
    return todo;
  },
};

const mockTodo: Todo = {
  id: "", // Will be replaced per test case
  title: "Mock To-Do",
  description: "Mock description",
  dueDate: null,
  createdAt: new Date(),
  isCompleted: false,
};

describe("Update To-Do Use Case", () => {
  it("Fails when title is empty", async () => {
    const repo = fakeRepo as TodoRepository;
    const todo: Todo = { ...mockTodo, id: "this-should-fail", title: "" };
    await expect(updateTodo(repo, todo)).rejects.toThrowError(errorTitleEmpty);
  });

  it("Succeeds with valid data", async () => {
    const repo = fakeRepo as TodoRepository;
    const todo: Todo = { ...mockTodo, id: "this-should-succeed" };
    const updated = await updateTodo(repo, todo);
    expect(updated.id === todo.id);
    expect(updated.title === todo.title);
  });

  it("Fails when id is not found (repo returns null)", async () => {
    const repo = fakeRepo as TodoRepository;
    const todo: Todo = { ...mockTodo, id: "id-not-found" };
    await expect(updateTodo(repo, todo)).rejects.toThrowError(errorNotFound);
  });

  it("Passes through repository error on unexpected failure", async () => {
    const repo = fakeRepo as TodoRepository;
    const todo: Todo = { ...mockTodo, id: "id-will-fail" };
    await expect(updateTodo(repo, todo)).rejects.toThrowError(
      "unexpected error"
    );
  });
});
