import { describe, expect, it } from "vitest";
import type { Todo } from "../todo";
import type { TodoRepository } from "../todo-repository";
import { getTodoById } from "./get-todo";

const todoTemplate: Todo = {
  id: "", // Replaced in repo return value
  title: "Found",
  description: "",
  dueDate: null,
  createdAt: new Date(),
  isCompleted: true,
};

const mockRepo: Partial<TodoRepository> = {
  readTodoById: async (id: string): Promise<Todo | null> => {
    // Test case - unexpected failure in repository call
    if (id === "id-causes-failure") {
      throw new Error("unexpected error");
    }

    // Test case - no todo found with id
    if (id === "id-not-found") {
      return null;
    }

    // To-Do successfully retrieved
    return {
      ...todoTemplate,
      id,
    };
  },
};

describe("Get To-Do by IU Use Case", () => {
  it("Should return the to-do when one is found", async () => {
    const result = await getTodoById(mockRepo as TodoRepository, "123456");
    // Spot check a few fields to ensure they are correct
    expect(result.id === "123456");
    expect(result.title === "FOUND");
  });

  it("Should return not found error when repo returns null", async () => {
    const repo = mockRepo as TodoRepository;
    await expect(getTodoById(repo, "id-not-found")).rejects.toThrowError(
      "To-Do not found"
    );
  });

  it("Should pass through repo error when repo fails", async () => {
    const repo = mockRepo as TodoRepository;
    await expect(getTodoById(repo, "id-causes-failure")).rejects.toThrowError(
      "unexpected error"
    );
  });
});
