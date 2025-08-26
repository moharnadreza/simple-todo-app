"use client";

import * as core from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useTodos } from "../hooks/useTodos";
import { reorderTodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { draggedTodoIds, filter, searchQuery } = useAppSelector(
    (state) => state.todos
  );
  const { data: todos = [], isLoading, error } = useTodos();

  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    core.useSensor(core.KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (searchQuery)
      filtered = filtered.filter((todo) =>
        todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
      );

    switch (filter) {
      case "completed":
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case "incomplete":
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    return filtered;
  }, [todos, filter, searchQuery]);

  // Apply custom ordering from drag & drop
  const orderedTodos = useMemo(() => {
    if (draggedTodoIds.length === 0) return filteredTodos;

    const orderedIds = draggedTodoIds;
    const reordered = [];
    const remaining = [...filteredTodos];

    // First, add todos in the specified order
    for (const id of orderedIds) {
      const todo = remaining.find((t) => t.id.toString() === id);
      if (todo) {
        reordered.push(todo);
        const index = remaining.indexOf(todo);
        remaining.splice(index, 1);
      }
    }

    // Then add any remaining todos
    reordered.push(...remaining);

    return reordered;
  }, [filteredTodos, draggedTodoIds]);

  const handleDragEnd = (event: core.DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = orderedTodos.findIndex(
        (todo) => todo.id.toString() === active.id
      );
      const newIndex = orderedTodos.findIndex(
        (todo) => todo.id.toString() === over?.id
      );

      const newOrder = arrayMove(orderedTodos, oldIndex, newIndex);
      dispatch(reorderTodos(newOrder.map((todo) => todo.id.toString())));
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingIndicator />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm">
          Error loading todos. Please try again.
        </p>
      </div>
    );

  if (orderedTodos.length === 0)
    return (
      <div className="text-center py-8">
        <p className="text-gray-900 text-sm">
          {searchQuery || filter !== "all"
            ? "No todos match your criteria"
            : "No todos yet. Add one above!"}
        </p>
      </div>
    );

  return (
    <core.DndContext
      sensors={sensors}
      collisionDetection={core.closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedTodos.map((todo) => todo.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {orderedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </SortableContext>
    </core.DndContext>
  );
};

export default TodoList;
