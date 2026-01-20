import { Container, Stack, Text, Title } from "@mantine/core";
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

const TodosPage = () => {
  // State to track filtering selections for To-do's
  const [filter, setFilter] = useState<TodoQuickFilter>({
    type: "all",
    showCompleted: false,
  });
  const { data: todos, error, isLoading } = useTodoList();
  const navigate = useNavigate();

  const onTodoSelected = (todo: Todo) => {
    navigate({ to: "/todos/$todoId", params: { todoId: todo.id } });
  };

  const filteredTodos = todos && applyQuickFilter(todos, filter);

  return (
    <Container>
      <Title mt="xl">My To-Do List</Title>
      <Text c="dimmed" fw={500} mb="lg">
        Click on a to-do in the list below to view additional details, or create
        a new to-do.
      </Text>
      <CreateTodoButton />

      <FilterPicker filter={filter} onChange={setFilter} />

      {!isLoading && !error && filteredTodos && (
        <>
          <Stack>
            {filteredTodos.map((t) => (
              <TodoListTile t={t} onClick={() => onTodoSelected(t)} />
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default TodosPage;
