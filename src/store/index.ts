import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notesReducer from "./notes";

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
