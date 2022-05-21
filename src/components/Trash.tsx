import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setShowTrashDialogFlag } from "../store/global";
import TrashCard from "./TrashCard";
import "../less/trash.less";

const Trash = () => {
  const showTrashDialogFlag = useAppSelector((state) => state.global.showTrashDialogFlag);
  const noteList = useAppSelector((state) => state.note.noteList.filter((note) => note.status === "TRASH"));
  const dispatch = useAppDispatch();

  const handleCloseBtnClick = useCallback(() => {
    dispatch(setShowTrashDialogFlag(false));
  }, []);

  return (
    <dialog className={`trash-wrapper ${showTrashDialogFlag ? "" : "hidden"}`}>
      <div className="dialog-header">
        <span className="title-text">Trash</span>
        <div className="btns-container">
          <span className="btn" onClick={handleCloseBtnClick}>
            close
          </span>
        </div>
      </div>
      <div className="dialog-content">
        <p className="tip-text">
          You can delete a note by dragging and dropping it into the <span className="icon-text">🗑</span> tool.
        </p>
        {noteList.length === 0 ? (
          <p className="empty-text">Empty</p>
        ) : (
          noteList.map((note) => {
            return <TrashCard key={`${note.id}`} note={note} />;
          })
        )}
      </div>
    </dialog>
  );
};

export default Trash;
