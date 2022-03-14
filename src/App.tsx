import { useEffect } from "react";
import { storage } from "./helpers/storage";
import { useAppSelector } from "./store";
import Dashboard from "./components/Dashboard";
import Trash from "./components/Trash";

const App = () => {
  const noteList = useAppSelector((state) => state.note.noteList);

  useEffect(() => {
    storage.set({
      noteList: noteList,
    });
  }, [noteList]);

  return (
    <>
      <Dashboard />
      <Trash />
    </>
  );
};

export default App;
