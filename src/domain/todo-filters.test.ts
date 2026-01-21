import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Todo } from "./todo";
import { applyQuickFilter, type TodoQuickFilter } from "./todo-filters";

const todoTemplate: Todo = {
  id: "",
  title: "",
  description: "",
  createdAt: new Date(),
  dueDate: null,
  isCompleted: false,
};

// Create a set of to-dos from the template to test filter conditions
const mockList: Todo[] = [
  {
    ...todoTemplate,
    id: "id-today",
    dueDate: new Date("2026-01-01T00:00:00Z"),
  },
  {
    ...todoTemplate,
    id: "id-today-done",
    dueDate: new Date("2026-01-01T00:00:00Z"),
    isCompleted: true,
  },
  {
    ...todoTemplate,
    id: "id-overdue-1",
    dueDate: new Date("2025-12-31T00:00:00Z"),
  },
  {
    ...todoTemplate,
    id: "id-overdue-2",
    dueDate: new Date("2025-12-31T00:00:00Z"),
  },
  {
    ...todoTemplate,
    id: "id-upcoming",
    dueDate: new Date("2026-01-02T00:00:00Z"),
  },
  {
    ...todoTemplate,
    id: "id-no-date",
    dueDate: null,
  },
];

describe("To-Do Quick Filtering Functionality", () => {
  // For this test suite we'll mock the current date
  // to Jan 1st, 2026 at midnight UTC
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1));
  });

  // Cleanup time mocking after tests
  afterEach(() => vi.useRealTimers());

  it("Retains all items when default filters are used", () => {
    const filter: TodoQuickFilter = { type: "all", showCompleted: true };
    const retained = applyQuickFilter(mockList, filter);

    // Expect all to be retained
    expect(retained.length).toBe(6);
  });

  it("Retains incomplete to-dos when show completed is false", () => {
    const filter: TodoQuickFilter = { type: "all", showCompleted: false };
    const retained = applyQuickFilter(mockList, filter);

    // Expect original list unchanged
    expect(mockList.length).toBe(6);

    // Expect one item to be removed
    expect(retained.length).toBe(5);
    expect(retained.findIndex((t) => t.id === "id-today")).toBe(0);
    expect(retained.findIndex((t) => t.id === "id-today-done")).toBe(-1);
  });

  it("Retains today's to-dos when filter type is 'today'", () => {
    const filter: TodoQuickFilter = { type: "today", showCompleted: true };
    const retained = applyQuickFilter(mockList, filter);

    // Expect original list unchanged
    expect(mockList.length).toBe(6);

    // Expect two items to remain
    expect(retained.length).toBe(2);
    expect(retained.findIndex((t) => t.id === "id-today")).toBe(0);
    expect(retained.findIndex((t) => t.id === "id-today-done")).toBe(1);
  });

  it("Retains past to-dos when filter type is 'overdue'", () => {
    const filter: TodoQuickFilter = { type: "overdue", showCompleted: true };
    const retained = applyQuickFilter(mockList, filter);

    // Expect original list unchanged
    expect(mockList.length).toBe(6);

    // Expect one item to be removed
    expect(retained.length).toBe(2);
    expect(retained.findIndex((t) => t.id === "id-overdue-1")).toBe(0);
    expect(retained.findIndex((t) => t.id === "id-overdue-2")).toBe(1);
  });

  it("Retains upcoming to-dos when filter type is 'upcoming'", () => {
    const filter: TodoQuickFilter = { type: "upcoming", showCompleted: true };
    const retained = applyQuickFilter(mockList, filter);

    // Expect original list unchanged
    expect(mockList.length).toBe(6);

    // Expect one item to be removed
    expect(retained.length).toBe(1);
    expect(retained.findIndex((t) => t.id === "id-upcoming")).toBe(0);
  });
});
