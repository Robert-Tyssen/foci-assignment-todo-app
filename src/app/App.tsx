import { MantineProvider } from "@mantine/core";
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
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
      </DependenciesProvider>
    </>
  );
};

export default App;
