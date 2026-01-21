/* This file contains the standardized errors which are possible in the application.
 * This is to ensure use cases return consistent messages when errors occur.
 */

/**
 * Error message to indicate that no To-do was found with the provided id.
 */
export const errorNotFound = "No To-Do found with the given id";

/**
 * Error message indicating that the To-do title is empty (invalid).
 */
export const errorTitleEmpty = "The To-Do's title cannot be empty";

/**
 * Error message indicating that the To-do id is empty (invalid)
 */
export const errorInvalidId = "The id cannot be empty";
