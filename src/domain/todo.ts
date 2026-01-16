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

  // Otherwise compare due date against current time
  return t.dueDate < now;
};
