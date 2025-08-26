"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconButton, Input } from "@/components";
import { useTodoMutations } from "../hooks/useTodos";

const schema = z.object({
  todo: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Task title must be less than 100 characters")
    .trim(),
});

type FormData = z.infer<typeof schema>;

const TodoForm = () => {
  const { createMutation } = useTodoMutations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ todo }: FormData) => {
    try {
      await createMutation.mutateAsync({ todo, completed: false, userId: 1 });
      reset();
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <Input
        {...register("todo")}
        type="text"
        placeholder="Enter new task"
        disabled={isSubmitting}
        error={errors.todo?.message}
      />
      <IconButton
        isLoading={isSubmitting}
        icon={<PlusIcon className="size-6" />}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default TodoForm;
