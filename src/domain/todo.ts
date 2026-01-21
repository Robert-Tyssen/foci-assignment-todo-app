import { getLocalToday, toAbsoluteDate } from "../utils/date-utils";

/**
 * Model representing an item in a to-do list. A to-do is uniquely identified
 * by its `id`, and include additional fields to capture details such as title,
 * due date, and completion status.
 */
export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  isCompleted: boolean;
}

/**
 * Function which determines if the to-do item is overdue. An item is overdue
 * if it is incomplete, and has a due date in the past.
 *
 * @param t the Todo item being evaluated
 * @param today the value to use as the current time for evaluating due date
 * @returns true if the Todo is overdue
 */
export const isOverdue = (t: Todo, today = new Date()): boolean => {
  // Can't be overdue if already completed, or if no due date
  if (t.isCompleted || !t.dueDate) {
    return false;
  }

  // Convert the UTC due date to an absolute date, at midnight
  const due = toAbsoluteDate(t.dueDate);

  // Make sure 'today' is oriented to midnight
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);

  // Otherwise compare due date against current time
  return due < todayMidnight;
};

/**
 * Function which determines if the to-do item is due today. An item is considered
 * 'due today' if it is not already completed, and has a due date equal to today.
 *
 * @param t the Todo item being evaluated
 * @param today the value to use as 'today' for the comparison. Defaults to the current date.
 * @returns true if the Todo is due today.
 */
export const isDueToday = (t: Todo, today = getLocalToday()): boolean => {
  // Can't be overdue if already completed, or if no due date
  if (t.isCompleted || !t.dueDate) {
    return false;
  }

  // Convert the UTC due date to an absolute date, at midnight
  const due = toAbsoluteDate(t.dueDate);

  // Make sure 'today' is oriented to midnight
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);

  // Compare the timestamps - should be date-only comparison now
  return due.getTime() === todayMidnight.getTime();
};

// Validation thresholds for form inputs
export const titleMaxLength = 200;
export const descriptionMaxLength = 500;
