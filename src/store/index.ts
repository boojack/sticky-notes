import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import globalReducer from "./global";
import noteReducer from "./note";

const store = configureStore({
  reducer: {
    global: globalReducer,
    note: noteReducer,
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
