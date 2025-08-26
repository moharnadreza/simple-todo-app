"use client";

import { Button, Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setFilter, setSearchQuery } from "../store/todoSlice";

const filters = [
  { value: "all", label: "All" },
  { value: "incomplete", label: "Active" },
  { value: "completed", label: "Completed" },
] as const;

const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const { filter, searchQuery } = useAppSelector((state) => state.todos);

  return (
    <div className="flex flex-col items-center space-y-4 border border-gray-50 rounded-2xl p-4">
      <Input
        type="text"
        name="search"
        id="search"
        label="Filter by:"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <div className="w-full flex gap-1 lg:gap-4">
        {filters.map(({ value, label }) => (
          <Button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            variant={filter === value ? "primary" : "secondary"}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;
