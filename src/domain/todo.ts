// TODO - add 'ignore completed' flags to date logic below

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
 * @param now the value to use as the current time for evaluating due date
 * @returns true if the Todo is overdue
 */
export const isOverdue = (t: Todo, now = new Date()): boolean => {
  // Can't be overdue if already completed, or if no due date
  if (t.isCompleted || !t.dueDate) {
    return false;
  }

  // Create copies to avoid mutating original values
  const d1 = new Date(t.dueDate);
  const d2 = new Date(now);

  // Remove time component, so that we're only looking at the date
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  // Otherwise compare due date against current time
  return d1 < d2;
};

/**
 * Function which determines if the to-do item is due today. An item is considered
 * 'due today' if it is not already completed, and has a due date equal to today.
 *
 * @param t the Todo item being evaluated
 * @param today the value to use as 'today' for the comparison. Defaults to the current date.
 * @returns true if the Todo is due today.
 */
export const isDueToday = (t: Todo, today = new Date()): boolean => {
  // Can only be due today if not yet completed, and a due date is set
  if (!t.isCompleted && t.dueDate) {
    // Create copies to avoid mutating original values
    const d1 = new Date(t.dueDate);
    const d2 = new Date(today);

    // Remove time component, so that we're only looking at the date
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    // Compare the timestamps - should be date-only comparison now
    return d1.getTime() === d2.getTime();
  }

  return false;
};
