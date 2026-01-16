import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { RouterProvider } from "@tanstack/react-router";
import { DependenciesProvider } from "./di/DependenciesProvider";
import { router } from "./routes";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const App = () => {
  return (
    <>
      <DependenciesProvider>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
      </DependenciesProvider>
    </>
  );
};

export default App;
