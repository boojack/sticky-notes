import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setShowTrashDialogFlag } from "../store/global";
import { updateNoteById } from "../store/note";
import "../less/toolbar.less";

const Toolbar = () => {
  const globalState = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const handleStopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleTrashMouseUp = () => {
    if (globalState.draggingNote) {
      dispatch(
        updateNoteById({
          id: globalState.draggingNote.id,
          note: {
            status: "TRASH",
          },
        })
      );
    }
  };

  const handleTrashClick = () => {
    dispatch(setShowTrashDialogFlag(!globalState.showTrashDialogFlag));
  };

  return (
    <div className={`toolbar-container opacity-80 ${globalState.draggingNote ? "z-10" : ""}`} onDoubleClick={handleStopPropagation}>
      <span className="action-btn" onClick={handleTrashClick} onMouseUp={handleTrashMouseUp}>
        🗑
      </span>
    </div>
  );
};

export default Toolbar;
