import {
  Button,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

/**
 * Form properties for to-do creation.
 */
interface CreateTodosFormData {
  title: string;
  description: string;
  dueDate: Date | null;
}

// Form validation parameters
// TODO - consider moving these to domain model
const titleMaxLength = 200;
const descriptionMaxLength = 500;

/**
 * React component providing the interface for creating a new To-Do. Consists of a
 * 'Create New To-Do' button, and a modal. The modal contains a form for creating
 * and submitting the to-do item. A notification will be displayed if the To-Do
 * was created successfully, or if an error occurred.
 */
const CreateTodoButton = () => {
  // State of the Create To-Do modal
  const [opened, { open, close }] = useDisclosure(false);

  // Form for entering to-do details
  const form = useForm<CreateTodosFormData>({
    // Form is empty by default, with no due date specified
    initialValues: { title: "", description: "", dueDate: null },

    // Use mantine built-in form validators
    validate: {
      // Title must have at least 1 char, and not exceed max length
      title: hasLength(
        { min: 1, max: titleMaxLength },
        `Title must be between 1-${titleMaxLength} characters`
      ),

      // Description cannot exceed max length
      description: hasLength(
        { max: descriptionMaxLength },
        `Description cannot exceed ${descriptionMaxLength} characters.`
      ),
    },
  });

  // Helper function to close the modal and reset any form data which was entered
  const closeForm = () => {
    close();
    form.reset();
  };

  // Handler when the form data is submitted, and passes all validations.
  // Triggers a custom hook to submit the data, and displays a notification with the result.
  // This is called from form.onSubmit provided by the mantine framework, so it is safe to
  // assume all form values have passed validations within this function.
  const handleSubmit = (values: typeof form.values) => {
    // TODO - add hook call here
    console.log(values);
    notifications.show({ message: "Not implemented!", color: "red" });
    //notifications.show({title: "Success!", message: "To-Do successfully added", color: "green"});

    // Close the form
    closeForm();
  };

  return (
    <>
      {/* Create New Todo Button */}
      <Button leftSection={<IconPlus />} my="lg" onClick={open}>
        Create New To-Do
      </Button>

      {/* Modal for entering Todo details */}
      <Modal opened={opened} onClose={closeForm} title="Create New To-Do">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            {/* Title input field */}
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Give your to-do a title"
              key={form.key("title")}
              maxLength={titleMaxLength}
              {...form.getInputProps("title")}
            />

            {/* Description input field */}
            <Textarea
              label="Description"
              placeholder="(Optional) Add a description"
              key={form.key("description")}
              maxLength={descriptionMaxLength}
              rows={4}
              {...form.getInputProps("description")}
            />

            {/* Due date input field */}
            <DateInput
              label="Due Date"
              placeholder="(Optional) Add a due date"
              clearable
              key={form.key("dueDate")}
              {...form.getInputProps("dueDate")}
            />

            {/* Row for cancel and submit buttons */}
            <Group justify="end" mt="md">
              <Button variant="transparent" onClick={closeForm}>
                Cancel
              </Button>
              <Button type="submit">Confirm</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreateTodoButton;
