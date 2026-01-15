import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

const App = () => {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
};

export default App;
