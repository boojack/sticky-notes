import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTestNotes } from "./test";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: getTestNotes(),
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // add note to notes
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

export const { addNote } = notesSlice.actions;

export default notesSlice.reducer;
