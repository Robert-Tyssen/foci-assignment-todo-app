import { getLocalToday, toAbsoluteDate } from "../utils/date-utils";
import type { Todo } from "./todo";

/**
 * Interface defining the 'quick filter' model for To-do object. It includes a `type`
 * field to define the type of filtering, and a `showCompleted` flag, to indicate
 * if already-completed To-do's should be returned by the filter.
 */
export interface TodoQuickFilter {
  type: FilterType;
  showCompleted: boolean;
}

/**
 * Type of filter to be applied to the To-do list.
 *   - all - retains the entire To-do list
 *   - overdue - only displays To-do's with due dates in the past
 *   - today - only displays To-do's due today
 *   - upcoming - only displays To-do's with due dates in the future
 */
export type FilterType = "all" | "overdue" | "today" | "upcoming";

/**
 * Helper type which defines a predicate which can be applied to the various
 * filter types in combination with Array.filter().
 */
type FilterPredicate = (t: Todo, now: Date) => boolean;

/**
 * This function applies a filter selection to an original list of To-do objects,
 * and returns the resulting list.
 *
 * @param todos the original list of To-do's to be filtered
 * @param filter the quick filter selection to be applied
 * @returns a filtered list of To-do's based on the filter options
 */
export const applyQuickFilter = (
  todos: Todo[],
  filter: TodoQuickFilter,
): Todo[] => {
  // Create a copy of the list for filtering
  let filteredTodos = [...todos];

  // Filter out any completed tasks if specified
  if (!filter.showCompleted) {
    filteredTodos = todos.filter((t) => !t.isCompleted);
  }

  const now = getLocalToday();

  return filteredTodos.filter((t) => filterPredicate[filter.type](t, now));
};

// Map containing filtering predicates which are used for filtering logic
// for each of the filter types. These predicates are intended to be used
// within an Array<Todo[]>.filter statement, and return true for each to-do
// which should be retained by the filter.
const filterPredicate: Record<FilterType, FilterPredicate> = {
  // Returns a predicate that is always true
  all: () => true,

  // Returns a predicate that is true when the to-do has a due date
  // which is earlier than 'now'
  overdue: (t: Todo, now: Date) =>
    !!t.dueDate && toAbsoluteDate(t.dueDate).getTime() < now.getTime(),

  // Returns a predicate that is true when the to-do has a due date
  //  with the same year, month and date as 'now'
  today: (t: Todo, now: Date) => {
    if (!t.dueDate) {
      return false;
    }

    // Get the absolute date of the due date for comparisons
    const due = toAbsoluteDate(t.dueDate);

    return (
      due.getFullYear() === now.getFullYear() &&
      due.getMonth() === now.getMonth() &&
      due.getDate() === now.getDate()
    );
  },

  // Returns a predicate that is true when the to-do has a due date
  // which is later than 'now'
  upcoming: (t: Todo, now: Date) =>
    !!t.dueDate && toAbsoluteDate(t.dueDate).getTime() > now.getTime(),
};
