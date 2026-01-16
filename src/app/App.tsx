import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { DependenciesProvider } from "./di/DependenciesProvider";
import { router } from "./routes";

const App = () => {
  return (
    <>
      <DependenciesProvider>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </DependenciesProvider>
    </>
  );
};

export default App;
