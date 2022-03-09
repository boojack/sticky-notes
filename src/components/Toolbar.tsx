import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteNoteById } from "../store/note";
import "../less/toolbar.less";

const Toolbar = () => {
  const draggingNote = useAppSelector((state) => state.global.draggingNote);
  const dispatch = useAppDispatch();

  const handleStopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleMouseUp = () => {
    if (draggingNote) {
      dispatch(deleteNoteById(draggingNote.id));
    }
  };

  return (
    <div className={`toolbar-container ${draggingNote ? "z-10" : ""}`} onDoubleClick={handleStopPropagation}>
      <span className="bin" onMouseUp={handleMouseUp}>
        🗑
      </span>
    </div>
  );
};

export default Toolbar;
