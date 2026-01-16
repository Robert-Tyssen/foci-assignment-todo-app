import { describe, expect, it } from "vitest";
import { isDueToday, isOverdue, type Todo } from "./todo";

// Test cases for the `isOverdue()` function
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

// Test cases for the `isDueToday()` function
describe("To-Do Due Today Functionality", () => {
  const t1: Todo = {
    id: "222",
    title: "Test To-Do",
    description: "",
    dueDate: new Date(2026, 1, 18),
    isCompleted: false,
    createdAt: new Date(),
  };

  it("Is due today when incomplete, and due date is today", () => {
    expect(isDueToday(t1, new Date(2026, 1, 18)));
    expect(isDueToday(t1, new Date(2026, 1, 18, 23, 59))); // Ensure time-agnostic
  });

  it("Is not due today when there is no due date", () => {
    const t: Todo = { ...t1, dueDate: null };
    expect(!isDueToday(t));
  });

  it("Is not due today when it is already completed", () => {
    const t: Todo = { ...t1, isCompleted: true };
    expect(!isDueToday(t, new Date(2026, 1, 18)));
  });
});
