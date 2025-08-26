import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TodoUIState {
  draggedTodoIds: string[];
  filter: "all" | "completed" | "incomplete";
  searchQuery: string;
}

const initialState: TodoUIState = {
  draggedTodoIds: [],
  filter: "all",
  searchQuery: "",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reorderTodos: (state, action: PayloadAction<string[]>) => {
      state.draggedTodoIds = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "incomplete">
    ) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { reorderTodos, setFilter, setSearchQuery } = todoSlice.actions;
