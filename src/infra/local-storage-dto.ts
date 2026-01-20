import type { Todo } from "../domain/todo";

/**
 * Type representing the storage format of a To-Do item. This is intended to be
 * a JSON format that is as close as possible to the stored representation of the object.
 * This allows us to handle more complex entity types (e.g. date fields) to ensure they
 * are stored in a predictable way.
 */
export type TodoStorageDto = {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  createdAt: string;
  isCompleted: boolean;
};

/**
 * Converts the entity (domain representation) of the To-Do item to the
 * data-transformation object (DTO) representation. Most fields are stored
 * as is since they are JSON compatible. Dates are converted to strings.
 */
export const entityToDto = (t: Todo): TodoStorageDto => ({
  ...t,
  dueDate: t.dueDate?.toISOString() || null,
  createdAt: t.createdAt.toISOString(),
});

/**
 * Converts the DTO representation of the To-DO item to its domain representation.
 * Most fields can be mapped back 1:1, but date fields are reconstructed from strings.
 */
export const dtoToEntity = (dto: TodoStorageDto): Todo => ({
  ...dto,
  dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
  createdAt: new Date(dto.createdAt),
});
