import { Container, Switch, Table, Text, Title } from "@mantine/core";
import { useState } from "react";
import CreateTodoButton from "../components/CreateTodoButton";

const TodosPage = () => {
  const [showCompleted, setShowCompleted] = useState(true);

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

      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Completed?</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <Table.Tr>
            <Table.Td>x</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default TodosPage;
