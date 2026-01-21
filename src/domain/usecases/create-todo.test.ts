import { describe, expect, it } from "vitest";
import { errorTitleEmpty } from "../errors";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";
import { createTodo } from "./create-todo";

// Mock implementation that passes back the to-do, except for a given condition
const fakeRepo: Partial<TodoRepository> = {
  createTodo: async (todo: Todo): Promise<Todo> => {
    // Use title condition to decide behavior
    if (todo.title === "failing-data") throw Error("unexpected error");
    return todo;
  },
};

describe("Create To-Do Use Case", () => {
  it("Fails when title is empty", async () => {
    const repo = fakeRepo as TodoRepository;
    await expect(createTodo(repo, { title: " " })).rejects.toThrowError(
      errorTitleEmpty,
    );
  });

  it("Succeeds with valid data", async () => {
    const repo = fakeRepo as TodoRepository;
    const title = "Valid Title";
    const t = await createTodo(repo, { title });
    expect(!!t.id);
    expect(t.title === title);
    expect(!t.dueDate);
    expect(!t.isCompleted);
  });

  it("Passes through repo error on failure", async () => {
    const repo = fakeRepo as TodoRepository;
    const title = "failing-data";
    await expect(createTodo(repo, { title })).rejects.toThrowError(
      "unexpected error",
    );
  });
});
