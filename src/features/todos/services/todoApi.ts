import axiosClient from "@/api/axiosClient";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

const todoApi = {
  getTodos: (): Promise<{ data: TodosResponse }> => axiosClient("/todos"),

  createTodo: (todo: Omit<Todo, "id">): Promise<Todo> =>
    axiosClient("/todos/add", {
      method: "POST",
      data: todo,
    }),

  updateTodo: (id: number, updates: Partial<Omit<Todo, "id">>): Promise<Todo> =>
    axiosClient(`/todos/${id}`, {
      method: "PUT",
      data: updates,
    }),

  deleteTodo: (id: number): Promise<void> =>
    axiosClient(`/todos/${id}`, {
      method: "DELETE",
    }),
};

export default todoApi;
