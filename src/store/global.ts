import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  draggingNote?: Note;
}

const getInitialState = (): GlobalState => {
  return {};
};

export const globalStoreSlice = createSlice({
  name: "global",
  initialState: getInitialState(),
  reducers: {
    setDraggingNote: (state, action: PayloadAction<Note | undefined>) => {
      state.draggingNote = action.payload;
    },
  },
});

export const { setDraggingNote } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
