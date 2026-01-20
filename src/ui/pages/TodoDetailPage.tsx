import {
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  Skeleton,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
  type MantineStyleProps,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconCheck,
  IconRefresh,
  IconTextPlus,
  IconTrash,
} from "@tabler/icons-react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import type { Todo } from "../../domain/todo";
import {
  deleteFailedNotification,
  deleteSuccessNotification,
  updateFailedNotification,
  updateSuccessNotification,
} from "../components/notifications";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useTodo } from "../hooks/useTodo";
import { useTodoForm } from "../hooks/useTodoForm";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

// Get the routing API for the to-do detail page
const routeApi = getRouteApi("/todos/$todoId");

/**
 * React component representing the detail page used to display information for a
 * single To-do. It provides loading and error views, and form controls for updating the To-do.
 */
const TodoDetailPage = () => {
  // Extract the To-Do id from the URL and call the custom hook to query
  const { todoId } = routeApi.useParams();
  const { data: todo, isPending, error, refetch } = useTodo(todoId);

  // Display error indicator if load failed
  if (error) {
    return <TodoError error={error.message} onRetry={refetch} />;
  }

  // Display loading indicator if load is still in progress
  if (isPending) {
    return <TodoLoading />;
  }

  // Render an editable form for the To-Dp
  return <TodoEditView todo={todo} />;
};

/* Component which is used to display the To-do detail when it has loaded successfully.
 */
const TodoEditView = ({ todo }: { todo: Todo }) => {
  // Custom hooks for updating and deleting the todo, and for form input
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const form = useTodoForm(todo);

  // Hook for navigation
  const navigate = useNavigate();

  // Handles the To-do update when the 'Save' button is clicked. Since it
  // is called via form.onSubmit, it is safe to assume all form validations
  // have passed for the values in the form.
  const handleUpdate = (values: typeof form.values) => {
    // Construct the updated To-do with the form values, and
    // ensure that the due date is formatted to a Date object
    const updated: Todo = {
      ...todo,
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? new Date(values.dueDate) : null,
      isCompleted: values.isCompleted,
    };

    // Trigger the mutation from the update hook, and respond accordingly
    updateTodo(updated, {
      // Update success - show notification and navigate back
      onSuccess: () => {
        updateSuccessNotification();
        navigate({ to: "/todos" });
      },

      // Update failed - show notification
      onError: (e) => updateFailedNotification(e.stack),
    });
  };

  // Handles the To-do update when the 'Delete' button is clicked.
  const handleDelete = () => {
    deleteTodo(todo.id, {
      // Delete successful - navigate back and show notification
      onSuccess: () => {
        deleteSuccessNotification();
        navigate({ to: "/todos" });
      },
      // Delete failed - show notification with error
      onError: (e) => deleteFailedNotification(e.message),
    });
  };

  // Get a strikethrough effect for completed to-dos
  const textDecoration: MantineStyleProps["td"] = form.values.isCompleted
    ? "line-through"
    : undefined;

  return (
    <Container mt="xl">
      {/* Button to navigate back to the list page */}
      <BackButton />

      {/* Wrap all form controls in a `form` tag for type-safe onSubmit */}
      <form onSubmit={form.onSubmit(handleUpdate)}>
        {/* Top row containing checkbox and title */}
        <Group display="flex">
          {/* Checkbox for marking To-do Complete / Incomplete */}
          {/* Linked to the 'dueDate' form input */}
          <Tooltip
            label={
              form.values.isCompleted
                ? "Mark To-do incomplete"
                : "Mark To-do complete"
            }
          >
            <Checkbox
              size="md"
              radius="xl"
              key={form.key("isCompleted")}
              {...form.getInputProps("isCompleted", { type: "checkbox" })}
            />
          </Tooltip>

          {/* To-Do title text input, linked to 'title' form input*/}
          <TextInput
            variant="unstyled"
            size="xl"
            placeholder="Enter title for your To-Do"
            key={form.key("title")}
            flex={1}
            {...form.getInputProps("title")}
            td={textDecoration}
          />
        </Group>

        {/* Due date form input */}
        <Group>
          <IconCalendarEvent />
          <DateInput
            size="md"
            placeholder="Add a due date"
            key={form.key("dueDate")}
            clearable
            {...form.getInputProps("dueDate")}
          />
        </Group>

        {/* Description form input */}
        <Group display="flex" align="start" mt="lg">
          <IconTextPlus />
          <Textarea
            flex={1}
            size="md"
            placeholder="(Optional) Add a description to your To-Do"
            rows={6}
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Group>

        {/* Bottom row containing action buttons and creation date */}
        <Group justify="end" mt="xl">
          <Text size="sm" c="dimmed">
            Created {todo.createdAt.toDateString()}
          </Text>

          {/* Delete To-do button */}
          <Button
            color="red"
            leftSection={<IconTrash />}
            variant="light"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>

          {/* Save changes button */}
          <Button
            type="submit"
            leftSection={<IconCheck />}
            loading={isUpdating}
          >
            Save
          </Button>
        </Group>
      </form>
    </Container>
  );
};

/* Component which is used to indicate that the page is still loading.
 */
const TodoLoading = () => {
  return (
    <Container mt="xl">
      <BackButton />
      <Skeleton h={24} w={"80%"} mt="xl" />

      <Stack mt="xl">
        <Skeleton h={18} w={"70%"} />
        <Skeleton h={18} w={"60%"} />
        <Skeleton h={18} w={"65%"} />
        <Skeleton h={18} w={"55%"} />
      </Stack>
    </Container>
  );
};

/* Component which is used to indicate that the To-do failed to load.
 */
const TodoError = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) => {
  return (
    <Container mt="xl">
      <Alert
        color="red"
        variant="outline"
        title="Error occurred loading the To-do"
      >
        <div>
          <Text inherit>{error}</Text>
          <Button
            mt="md"
            variant="outline"
            color="red"
            leftSection={<IconRefresh />}
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

/* Component which can be used as a back button to navigate from the
 * detail page back to the list page.
 */
const BackButton = () => {
  // Get navigation hook
  const navigate = useNavigate();

  // When back button is clicked, navigate back to list page
  const handleClick = () => navigate({ to: "/todos" });

  return (
    <Button
      leftSection={<IconArrowLeft />}
      onClick={handleClick}
      variant="transparent"
    >
      Back to To-Do List
    </Button>
  );
};

export default TodoDetailPage;
