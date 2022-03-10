import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../helpers/storage";

interface NoteState {
  noteList: Note[];
}

interface UpdateNoteById {
  id: UUID;
  note: Partial<Note>;
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
    status: "NORMAL",
    createdTs: Date.now(),
    updatedTs: Date.now(),
  };
};

const getInitialState = (): NoteState => {
  const { noteList } = storage.get(["noteList"]);

  return {
    noteList: noteList ?? [getBlankNote()],
  };
};

export const noteStoreSlice = createSlice({
  name: "note",
  initialState: getInitialState(),
  reducers: {
    // add note to noteList
    addNote: (state, action: PayloadAction<Note>) => {
      state.noteList = [...state.noteList, action.payload].sort((a, b) => a.updatedTs - b.updatedTs);
    },
    // update note by id
    updateNoteById: (state, action: PayloadAction<UpdateNoteById>) => {
      const noteIndex = state.noteList.findIndex((note) => note.id === action.payload.id);
      if (noteIndex !== -1) {
        state.noteList[noteIndex] = {
          ...state.noteList[noteIndex],
          ...action.payload.note,
        };
      }
      state.noteList = [...state.noteList].sort((a, b) => a.updatedTs - b.updatedTs);
    },
    // delete note by id
    deleteNoteById: (state, action: PayloadAction<UUID>) => {
      const temp = state.noteList.filter((note) => note.id !== action.payload);
      state.noteList = [...temp].sort((a, b) => a.updatedTs - b.updatedTs);
    },
  },
});

export const { addNote, updateNoteById, deleteNoteById } = noteStoreSlice.actions;

export default noteStoreSlice.reducer;
