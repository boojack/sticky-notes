import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  showTrashDialogFlag: boolean;
  draggingNote?: Note;
}

const getInitialState = (): GlobalState => {
  return {
    showTrashDialogFlag: false,
    draggingNote: undefined,
  };
};

export const globalStoreSlice = createSlice({
  name: "global",
  initialState: getInitialState(),
  reducers: {
    setShowTrashDialogFlag: (state, action: PayloadAction<boolean>) => {
      state.showTrashDialogFlag = action.payload;
    },
    setDraggingNote: (state, action: PayloadAction<Note | undefined>) => {
      state.draggingNote = action.payload;
    },
  },
});

export const { setShowTrashDialogFlag, setDraggingNote } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
