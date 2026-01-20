import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Todo } from "../../domain/todo";
import {
  applyQuickFilter,
  type TodoQuickFilter,
} from "../../domain/todo-filters";
import CreateTodoButton from "../components/CreateTodoButton";
import FilterPicker from "../components/FilterPicker";
import TodoListTile from "../components/TodoListTile";
import { useTodoList } from "../hooks/useTodoList";

/**
 * This component is the page which displays all To-do's for a user. It uses a custom hook
 * for loading the To-do list, and includes loading and error indicators. In addition to
 * the To-do list itself, it renders a 'quick filters' selector which provides convenient
 * filters for the returned list.
 */
const TodosPage = () => {
  // State to track filtering selections for To-do's
  const [filter, setFilter] = useState<TodoQuickFilter>({
    type: "all",
    showCompleted: false,
  });

  // Get custom hook for fetching the To-do list
  const { data: todos, error, isPending, refetch } = useTodoList();

  // Get hook for navigating to To-do detail page
  const navigate = useNavigate();

  // Handler function which navigates to a specific To-do when it is
  // selected, using its id as the URL parameters.
  const onTodoSelected = (todo: Todo) => {
    navigate({ to: "/todos/$todoId", params: { todoId: todo.id } });
  };

  // Return an error view if the fetch failed
  if (error) {
    return <TodoListErrorView error={error.message} onRetry={refetch} />;
  }

  // Return a loading view if results have not loaded yet
  if (isPending) {
    return <TodoListLoading />;
  }

  // List successfully retrieved, apply filters
  const filteredTodos = applyQuickFilter(todos, filter);

  return (
    <Container mt="xl">
      <PageHeader />

      {/* Render quick-filter options */}
      <FilterPicker filter={filter} onChange={setFilter} />

      {/* Conditionally render depending on whether To-do's were found */}
      {filteredTodos.length > 0 ? (
        // At least one To-do found
        <Stack>
          {filteredTodos.map((t) => (
            <TodoListTile key={t.id} t={t} onClick={() => onTodoSelected(t)} />
          ))}
        </Stack>
      ) : (
        // No To-do's found matching filters
        <TodosNoneFound />
      )}
    </Container>
  );
};

/* Shared header for the various page views, which includes the main title
 * and subtitle, and the button for creating a new To-do.
 */
const PageHeader = () => (
  <div>
    <Title>My To-Do List</Title>
    <Text c="dimmed" fw={500}>
      Click on one of your To-Dos in the list below to view additional details.
      Click the button to create a new to-do.
    </Text>
    <CreateTodoButton />
  </div>
);

/* Component which is used to indicate that no To-do's were found which
 * match the provided filters.
 */
const TodosNoneFound = () => (
  <Center mt="xl">
    <Stack ta="center" maw={500} gap="sm">
      <Text fw={500} size="lg" c="dimmed">
        You're all caught up!
      </Text>
      <Text c="dimmed" fw={500}>
        No To-Do's found matching your selected filter conditions. You can
        update your filters, or create a new To-Do using the button above.
      </Text>
    </Stack>
  </Center>
);

/* Component which is used to indicate that the To-do list is still loading.
 */
const TodoListLoading = () => {
  return (
    <Container my="xl">
      <PageHeader />

      {/* Skeleons representing quick filters component */}
      <Stack gap="sm" mb="lg">
        <Skeleton h={18} w={"70%"} />
        <Skeleton h={18} w={"50%"} />
      </Stack>

      {/* Skeletons representing To-do list tiles */}
      <Stack>
        {Array.from({ length: 5 }).map((_, i) => (
          <Paper withBorder p="md" radius="lg" key={`loading-item-${i}`}>
            <Group display="flex" align="start">
              {/* Checkbox placeholder */}
              <Skeleton h={24} w={24} radius="xl" />

              {/* Main content placeholder */}
              <Stack flex={1} mt={4} gap="xs">
                <Skeleton h={18} w={"70%"} />
                <Skeleton h={12} w={"40%"} />
              </Stack>

              {/* Delete button placeholder */}
              <Skeleton h={32} w={32} radius="md" />
            </Group>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};

/* Component which is used to indicate that the To-do list failed to load.
 */
const TodoListErrorView = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) => {
  return (
    <Container mt="xl">
      <PageHeader />
      <Alert
        color="red"
        variant="outline"
        title="Error occurred loading the To-Do list"
        radius="lg"
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

export default TodosPage;
