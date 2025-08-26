"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckIcon, EqualsIcon, TrashIcon } from "@heroicons/react/16/solid";
import { IconButton } from "@/components";
import { useTodoMutations } from "../hooks/useTodos";
import type { Todo } from "../services/todoApi";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { updateMutation, deleteMutation } = useTodoMutations();

  // Drag and drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  const toggleComplete = () => {
    updateMutation.mutate({
      id: todo.id,
      updates: { completed: !todo.completed },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?"))
      deleteMutation.mutate(todo.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-y-4 bg-white border border-gray-50 rounded-2xl py-3 pl-6 pr-2"
    >
      <div className="flex items-center gap-4 flex-1">
        <EqualsIcon
          {...listeners}
          className="size-4 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
            className="hidden peer"
          />
          <div
            className="w-4 h-4 border-1 border-gray-400 rounded-sm flex items-center justify-center
                  peer-checked:bg-gray-900 peer-checked:border-gray-900 cursor-pointer"
          >
            <CheckIcon className="size-4 text-white" />
          </div>
        </label>

        <span
          className={`flex-1 select-none text-md ${
            todo.completed ? "line-through text-gray-500" : "text-gray-950"
          }`}
        >
          {todo.todo}
        </span>

        <IconButton
          icon={<TrashIcon className="size-4 text-red-600" />}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TodoItem;
