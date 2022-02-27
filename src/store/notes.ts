import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../helpers/storage";

interface NotesState {
  notes: Note[];
}

interface updateNoteById {
  id: UUID;
  note: Note;
}

const getBlankNote = (): Note => {
  return {
    id: `${Date.now()}`,
    content: "📝 input right here",
    bounding: {
      width: 256,
      height: 128,
    },
    position: {
      x: 100,
      y: 100,
    },
    createdTs: Date.now(),
    updatedTs: Date.now(),
  };
};

const getInitialState = (): NotesState => {
  const { notes } = storage.get(["notes"]);

  return {
    notes: notes ?? [getBlankNote()],
  };
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: getInitialState(),
  reducers: {
    // add note to notes
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
    },
    // update note by id
    updateNoteById: (state, action: PayloadAction<updateNoteById>) => {
      const noteIndex = state.notes.findIndex((note) => note.id === action.payload.id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = action.payload.note;
      }
      state.notes = [...state.notes];
    },
    // delete note by id
    deleteNoteById: (state, action: PayloadAction<UUID>) => {
      const temp = state.notes.filter((note) => note.id !== action.payload);
      state.notes = [...temp];
    },
  },
});

export const { addNote, updateNoteById, deleteNoteById } = notesSlice.actions;

export default notesSlice.reducer;
