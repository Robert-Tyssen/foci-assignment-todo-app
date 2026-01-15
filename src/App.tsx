import { MantineProvider, Title } from "@mantine/core";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <>
      <MantineProvider>
        <Title>Placeholder App Title</Title>
      </MantineProvider>
    </>
  );
};

export default App;
