import {
  ActionIcon,
  Box,
  Checkbox,
  Group,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { Todo } from "../../domain/todo";
import DueDateBadge from "./DueDateBadge";

import { notifications } from "@mantine/notifications";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import classes from "./ClickablePaper.module.css";

interface TodoListTileProps {
  t: Todo;
  onClick?: () => void;
}

const TodoListTile = ({ t, onClick }: TodoListTileProps) => {
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  const handleContainerClicked = () => {
    onClick?.();
  };
  
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Checkbox clicked");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTodo(t.id, {
      onSuccess: () => {
        notifications.show({
          title: "Success!",
          message: "To-Do was deleted successfully",
          color: "green",
        });
      },
    });
  };

  return (
    <Paper
      withBorder
      shadow="md"
      px="md"
      py="xs"
      radius="lg"
      className={classes.clickablePaper}
      onClick={handleContainerClicked}
    >
      <Group align="start" justify="start" display="flex">
        <Checkbox radius="xl" pt={4} onClick={handleCheckboxClick} />

        <Box flex={1}>
          <Text lineClamp={1}>{t.title}</Text>
          <Group wrap="nowrap" mt="xs" gap="sm">
            <DueDateBadge todo={t} />
            <Text size="xs" c="dimmed">{`Created ${t.createdAt}`}</Text>
          </Group>
        </Box>

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
