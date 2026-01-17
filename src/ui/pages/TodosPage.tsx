import { Container, Stack, Switch, Text, Title } from "@mantine/core";
import { useState } from "react";
import CreateTodoButton from "../components/CreateTodoButton";
import TodoListTile from "../components/TodoListTile";
import { useTodoList } from "../hooks/useTodoList";
import { useNavigate } from "@tanstack/react-router";
import type { Todo } from "../../domain/todo";

const TodosPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);
  const { data: todos, error, isLoading } = useTodoList();
  const navigate = useNavigate();

  const onTodoSelected = (todo: Todo) => {
    navigate({ to: "/todos/$todoId", params: { todoId: todo.id } });
  };

  return (
    <Container>
      <Title mt="xl">My To-Do List</Title>
      <Text c="dimmed" fw={500} mb="lg">
        Click on a to-do in the list below to view additional details, or create
        a new to-do.
      </Text>
      <CreateTodoButton />
      <Switch
        checked={showCompleted}
        onChange={(evt) => setShowCompleted(evt.currentTarget.checked)}
        size="md"
        label="Show Completed To-Do's"
        my="lg"
      />

      {!isLoading && !error && todos && (
        <>
          <Stack>
            {todos.map((t) => (
              <TodoListTile t={t} onClick={() => onTodoSelected(t)} />
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default TodosPage;
