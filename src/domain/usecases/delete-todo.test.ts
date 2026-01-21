import { describe, expect, it } from "vitest";
import { errorInvalidId, errorNotFound } from "../errors";
import type { TodoRepository } from "../todo-repository";
import { deleteTodo } from "./delete-todo";

const mockRepo: Partial<TodoRepository> = {
  delete: async (id) => {
    if (id === "missing-id") return false;
    if (id === "really-bad-id") throw new Error("unexpected error");
    return true;
  },
};

describe("Delete To-Do Use Case", () => {
  it("Fails when id is missing", async () => {
    const repo = mockRepo as TodoRepository;
    const id = "";

    // Expect the id not found error
    await expect(deleteTodo(repo, id)).rejects.toThrowError(errorInvalidId);
  });

  it("Returns error when repository returns false", async () => {
    const repo = mockRepo as TodoRepository;
    const id = "missing-id";

    // Expect the To-do not found error
    await expect(deleteTodo(repo, id)).rejects.toThrowError(errorNotFound);
  });

  it("Completes successfully when repository returns true", async () => {
    const repo = mockRepo as TodoRepository;
    const id = "good-id";

    // Expect the use case completes without error
    await expect(deleteTodo(repo, id)).resolves.toBeUndefined();
  });

  it("Passes through the error when the repository fails", async () => {
    const repo = mockRepo as TodoRepository;
    const id = "really-bad-id";

    // Expect the To-do not found error
    await expect(deleteTodo(repo, id)).rejects.toThrowError("unexpected error");
  });
});
