import {
  Button,
  Checkbox,
  Container,
  Group,
  Skeleton,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconTextPlus,
  IconTrash,
} from "@tabler/icons-react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import type { Todo } from "../../domain/todo";
import { useTodo } from "../hooks/useTodo";

// Get the routing API for the to-do detail page
const routeApi = getRouteApi("/todos/$todoId");

const TodoDetailPage = () => {
  // Extract the To-Do id from the URL and call the custom hook to query
  const { todoId } = routeApi.useParams();
  const { data: todo } = useTodo(todoId);

  // TODO - add error indicator
  if (!todo) {
    return <TodoLoading />;
  }

  // Render an editable form for the To-Dp
  return <TodoEditView todo={todo} />;
};

const TodoEditView = ({ todo }: { todo: Todo }) => {
  const form = useForm({
    initialValues: {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      isCompleted: todo.isCompleted,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  const handleDelete = () => {};

  return (
    <Container mt="xl">
      <BackButton />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group display="flex">
          <Checkbox
            size="md"
            radius="xl"
            key={form.key("isCompleted")}
            {...form.getInputProps("isCompleted")}
          />
          <TextInput
            variant="unstyled"
            size="xl"
            placeholder="Enter title for your To-Do"
            key={form.key("title")}
            flex={1}
            {...form.getInputProps("title")}
          />
        </Group>

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
        <Text size="sm" c="dimmed" mt="xl">
          Created on Date XYZ
        </Text>

        <Group justify="end">
          <Button
            color="red"
            leftSection={<IconTrash />}
            variant="light"
            onClick={handleDelete}
          >
            Delete To-Do
          </Button>
          <Button type="submit">Save Changes</Button>
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
