import { Badge, type MantineColor } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";
import { isDueToday, isOverdue, type Todo } from "../../domain/todo";

const DueDateBadge = ({ todo }: { todo: Todo }) => {
  // Get the variant to use for the badge
  // Use a filled badge for todos due today or overdue
  const variant = isDueToday(todo) || isOverdue(todo) ? "filled" : "outline";

  // Returns the color to be used for the due date badge background
  // Use grey for the 'no due date' case, and red for overdue
  // For all other cases, undefined results in the default theme color
  const getColor = (): MantineColor | undefined => {
    if (!todo.dueDate) return "gray";
    if (isOverdue(todo)) return "red";
  };

  // Returns the text to display in the due date badge
  // Will indicate 'no due date' or 'today' accordingly, else will
  // simply display the date text
  const getDueDateText = () => {
    if (!todo.dueDate) return "No Due Date";
    if (isDueToday(todo)) return "Today";
    return todo.dueDate;
  };

  return (
    <Badge
      leftSection={<IconCalendarEvent size={12} />}
      size="sm"
      variant={variant}
      fw={500}
      tt="none"
      color={getColor()}
    >{`${getDueDateText()}`}</Badge>
  );
};

export default DueDateBadge;
