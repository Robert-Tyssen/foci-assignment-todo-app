import {
  ActionIcon,
  Box,
  Checkbox,
  Group,
  Paper,
  Text,
  Tooltip,
  type MantineStyleProps,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { Todo } from "../../domain/todo";
import DueDateBadge from "./DueDateBadge";

import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import classes from "./ClickablePaper.module.css";
import {
  deleteFailedNotification,
  deleteSuccessNotification,
  updateFailedNotification,
  updateSuccessNotification,
} from "./notifications";

// Input props for `TodoListTile`
interface TodoListTileProps {
  // The To-do being displayed by this tile
  t: Todo;

  // Optional callback which is invoked when the tile is clicked.
  // This can be used to navigate to the detail page for the To-Do
  onClick?: () => void;
}

const TodoListTile = ({ t, onClick }: TodoListTileProps) => {
  // Custom hooks for updating and deleting the to-do
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  // Get a strikethrough effect for completed to-dos
  const textDecoration: MantineStyleProps["td"] = t.isCompleted
    ? "line-through"
    : undefined;

  // Trigger the callback when the list item is clicked
  const handleContainerClicked = () => {
    onClick?.();
  };

  // Handler called when the value of the 'is completed' checkbox changes.
  // Construct an updated to-do with the new 'isCompleted' value, then use
  // the hook mutation to trigger the update and display a notification.
  const handleCompleted = (value: boolean) => {
    const updated = { ...t, isCompleted: value };
    updateTodo(updated, {
      onSuccess: () => updateSuccessNotification(),
      onError: (e) => updateFailedNotification(e.message),
    });
  };

  // Handler valled when the delete button is clicked. Calls the hook
  // mutation to trigger the deletion, and displays a notification with the result.
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTodo(t.id, {
      onSuccess: () => deleteSuccessNotification(),
      onError: (e) => deleteFailedNotification(e.message),
    });
  };

  return (
    <Paper
      withBorder
      shadow="md"
      px="md"
      py="xs"
      radius="lg"
      // Custom CSS classes for hover styles
      className={classes.clickablePaper}
      onClick={handleContainerClicked}
    >
      <Group align="start" justify="start" display="flex">
        {/* Checkbox displaying if the To-do is completed */}
        <Tooltip
          label={
            t.isCompleted ? "Mark To-do incomplete" : "Mark To-do complete"
          }
        >
          <Checkbox
            radius="xl"
            pt={4}
            checked={t.isCompleted}
            onClick={(evt) => evt.stopPropagation()}
            onChange={(evt) => handleCompleted(evt.currentTarget.checked)}
          />
        </Tooltip>

        {/* Middle section of tile containing title, due date label and creation date*/}
        <Box flex={1}>
          <Text lineClamp={1} td={textDecoration}>
            {t.title}
          </Text>
          <Group wrap="nowrap" mt="xs" gap="sm">
            <DueDateBadge todo={t} />
            <Text size="xs" c="dimmed">{`Created ${t.createdAt}`}</Text>
          </Group>
        </Box>

        {/* Delete To-do button */}
        <Tooltip label="Delete To-Do">
          <ActionIcon
            variant="light"
            color="red"
            pt={4}
            onClick={handleDeleteClick}
            loading={isDeleting}
          >
            <IconTrash style={{ width: "80%", height: "80%" }} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Paper>
  );
};

export default TodoListTile;
