import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import todoApi, { type Todo } from "../services/todoApi";

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await todoApi.getTodos();
      return data.todos;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

// Mutations that only update the cache (no API calls)
const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (newTodo: Omit<Todo, "id">) => newTodo,
    onMutate: (newTodo) => {
      const tempId = Date.now();
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        { ...newTodo, id: tempId },
        ...old,
      ]);
    },
  });

  // Update (client only)
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Todo>;
    }) => ({ id, ...updates }),
    onMutate: ({ id, updates }) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    },
  });

  // Delete (client only)
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => id,
    onMutate: (todoId) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== todoId)
      );
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export { useTodoMutations };
