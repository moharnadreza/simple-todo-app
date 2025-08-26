"use client";

import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoContainer = () => {
  return (
    <div className="flex flex-col gap-12">
      <TodoForm />
      <TodoFilters />
      <TodoList />
    </div>
  );
};

export default TodoContainer;
