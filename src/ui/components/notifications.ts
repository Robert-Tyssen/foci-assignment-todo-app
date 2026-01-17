import type { MantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const successDefaultTitle = "Success!";
const failedDefaultTitle = "Something went wrong";

// Colors for notifications
const colorSuccess: MantineColor = "green";
const colorFailed: MantineColor = "red";

export const deleteSuccessNotification = () =>
  notifications.show({
    title: successDefaultTitle,
    message: "To-do was deleted successfully",
    color: colorSuccess,
  });

export const deleteFailedNotification = (message?: string) =>
  notifications.show({
    title: failedDefaultTitle,
    message: message || "Unexpected error occurred while deleting the To-do",
    color: colorFailed,
  });
