import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { todoSlice } from "@/features/todos/store/todoSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      todos: todoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

// Client-side store instance
const store = makeStore();

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };
export type { AppDispatch, AppStore, RootState };
