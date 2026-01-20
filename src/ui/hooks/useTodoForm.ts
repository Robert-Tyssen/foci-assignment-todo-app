import { hasLength, useForm } from "@mantine/form";
import {
  descriptionMaxLength,
  titleMaxLength,
  type Todo,
} from "../../domain/todo";
import { toAbsoluteDate } from "../../utils/date-utils";

/**
 * Custom wrapper for Mantine's `useForm` hook, which handles form initialization
 * and input validation for the form inputs. Uses mantine's built-in validators for
 * input validations, such as ensuring `title` is provided, and limiting `description`
 * to a maximum length.
 *
 * Use `<form onSubmit={form.onSubmit(handler)}>` to automatically validate form
 * values prior to any submission logic (e.g. invoking a use case).
 *
 * @param todo optional Todo object to initialize the form with existing values
 */
export const useTodoForm = (todo?: Todo) => {
  const form = useForm({
    // If starting from an existing To-do, use the known field values
    // to init the form, else use defaults
    initialValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      isCompleted: todo?.isCompleted || false,

      // Use ISO string for date input, for compatibility with UI framework
      // Convert to a Date object prior to invoking use-case logic
      dueDate: todo?.dueDate
        ? toAbsoluteDate(todo.dueDate).toISOString().split("T")[0]
        : null,
    },

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

  return form;
};
