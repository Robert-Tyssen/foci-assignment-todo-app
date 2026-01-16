import { describe, expect, it } from "vitest";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";
import { getTodoList } from "./get-todo-list";

// Mock repo that returns an empty list
const emptyRepo: Partial<TodoRepository> = {
  readTodoList: async (): Promise<Todo[]> => [],
};

// Mock repo that fails when called
const failingRepo: Partial<TodoRepository> = {
  readTodoList: async (): Promise<Todo[]> => {
    throw new Error("failed");
  },
} as TodoRepository;

// Mock repo that returns multiple items when called
const goodRepo: Partial<TodoRepository> = {
  readTodoList: async (): Promise<Todo[]> =>
    Array.from({ length: 5 }).map<Todo>((_, i) => ({
      id: `${i}`,
      title: `todo-item-${i}`,
      description: "",
      dueDate: null,
      createdAt: new Date(),
      isCompleted: false,
    })),
} as TodoRepository;

describe("Get To-Do List Use Case", () => {
  it("Returns empty when no results found", async () => {
    const result = await getTodoList(emptyRepo as TodoRepository);
    expect(result.length === 0);
    expect(result).toBeDefined();
  });

  it("Returns data when some results found", async () => {
    const result = await getTodoList(goodRepo as TodoRepository);
    expect(result.length === 5);
    expect(result[0].id === "0");
  });

  it("Passes through repo error when call fails", async () => {
    const repo = failingRepo as TodoRepository;
    await expect(getTodoList(repo)).rejects.toThrowError("failed");
  });
});
