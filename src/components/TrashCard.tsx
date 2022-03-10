import React, { useCallback } from "react";
import { useAppDispatch } from "../store";
import { deleteNoteById, updateNoteById } from "../store/note";
import "../less/trash-card.less";

interface Props {
  note: Note;
}

const TrashCard: React.FC<Props> = (props) => {
  const { note } = props;
  const dispatch = useAppDispatch();

  const handleRecoverBtnClick = useCallback(() => {
    dispatch(
      updateNoteById({
        id: note.id,
        note: {
          status: "NORMAL",
          position: {
            x: 100,
            y: 100,
          },
        },
      })
    );
  }, []);

  const handleDeleteBtnClick = useCallback(() => {
    dispatch(deleteNoteById(note.id));
  }, []);

  return (
    <div className="trash-card-wrapper">
      <div className="header-container">
        <span></span>
        <div className="btns-container">
          <span className="btn" onClick={handleRecoverBtnClick}>
            Recover
          </span>
          <span className="btn" onClick={handleDeleteBtnClick}>
            Delete
          </span>
        </div>
      </div>
      <textarea readOnly className="editor" defaultValue={note.content}></textarea>
    </div>
  );
};

export default TrashCard;
