import { Chip, ChipGroup, Group, Text } from "@mantine/core";
import type { FilterType, TodoQuickFilter } from "../../domain/todo-filters";

type FilterItem = {
  value: FilterType;
  label: string;
};

const filterItems: FilterItem[] = [
  { value: "all", label: "All Dates" },
  { value: "today", label: "Due Today" },
  { value: "overdue", label: "Due in the Past" },
  { value: "upcoming", label: "Due Later" },
];

interface FilterPickerProps {
  filter: TodoQuickFilter;
  onChange?: (value: TodoQuickFilter) => void;
}

const FilterPicker = ({ filter, onChange }: FilterPickerProps) => {
  // Handler when the filter type is updated
  const handleTypeChange = (type: FilterType) => {
    onChange?.({ ...filter, type });
  };

  // Handler when the 'show completed' is updated
  const handleShowCompletedChange = (showCompleted: boolean) => {
    onChange?.({ ...filter, showCompleted });
  };

  return (
    <>
      <Group py="lg">
        <Text fw="bold">Quick Filters:</Text>
        <ChipGroup
          value={filter.type}
          onChange={(value) => handleTypeChange(value as FilterType)}
        >
          {filterItems.map((item) => (
            <Chip key={`quick-filter-${item.value}`} value={item.value}>
              {item.label}
            </Chip>
          ))}
        </ChipGroup>
        <Chip
          checked={filter.showCompleted}
          onChange={handleShowCompletedChange}
        >
          Show Completed To-Do's
        </Chip>
      </Group>
    </>
  );
};

export default FilterPicker;
