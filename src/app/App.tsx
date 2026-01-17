import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { DependenciesProvider } from "./di/DependenciesProvider";
import { router } from "./routes";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <DependenciesProvider>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <Notifications />
            <RouterProvider router={router} />
          </MantineProvider>
        </QueryClientProvider>
      </DependenciesProvider>
    </>
  );
};

export default App;
