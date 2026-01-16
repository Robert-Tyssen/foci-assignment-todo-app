import { describe, expect, it } from "vitest";
import { isOverdue, type Todo } from "./todo";

describe("To-Do Overdue Functionality", () => {
  const t1: Todo = {
    id: "111",
    title: "Test To-Do",
    description: "",
    dueDate: new Date(1990, 7, 1),
    isCompleted: false,
    createdAt: new Date(),
  };

  it("Is overdue when incomplete and due date is in past", () => {
    expect(isOverdue(t1));
    expect(isOverdue(t1, new Date(1990, 7, 2)));
  });

  it("Is not overdue when complete and due date is in past", () => {
    const t: Todo = { ...t1, isCompleted: true };
    expect(isOverdue(t));
    expect(isOverdue(t1, new Date(1990, 7, 2)));
  });

  it("Is not overdue when no due date is specified", () => {
    const t: Todo = { ...t1, dueDate: null };
    expect(!isOverdue(t));
    expect(!isOverdue(t, new Date(1990, 7, 2)));
  });

  it("Is not overdue when due date is in future", () => {
    const t: Todo = { ...t1, dueDate: new Date(9999, 12, 31) };
    expect(!isOverdue(t));
    expect(!isOverdue(t, new Date(9999, 12, 30)));
  });
});
