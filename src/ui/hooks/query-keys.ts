export const queryKeys = {
  // Query key for the entire to-do list
  todoList: ["todo", "list"] as const,

  // Query key for details for a single to-do, given its id
  todoDetail: (id: string) => ["todo", "detai", id] as const,
};
