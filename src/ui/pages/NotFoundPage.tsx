import { Center, Title, Text, Stack } from "@mantine/core";

/**
 * This component is the default 404 Not Found page that the application uses
 * if a user attempts to navigate to an unknown route.
 */
const NotFoundPage = () => {
  return (
    <Center mt="xl">
      <Stack ta="center" maw={500}>
        <Title order={3} c="dimmed">
          404
        </Title>
        <Title order={5}>Page Not Found</Title>
        <Text c="dimmed" fw={500}>
          The page you are trying to navigate to does not exist. It may have
          been moved to a different URL, or there may be a typo.
        </Text>
        <a href="/">Go Home</a>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
