import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store";
import { updateNoteById, deleteNoteById } from "../store/notes";
import "../less/sticky-card.less";

interface Props {
  note: Note;
}

const StickyCard: React.FC<Props> = (props) => {
  const { note } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // do nth
  }, []);

  const handleStickyCardDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleStickyCardMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const cardEl = event.currentTarget;
    const shiftX = event.clientX - cardEl.getBoundingClientRect().left;
    const shiftY = event.clientY - cardEl.getBoundingClientRect().top;

    const handleMouseMove = (event: MouseEvent) => {
      dispatch(
        updateNoteById({
          id: note.id,
          note: {
            ...note,
            position: {
              x: event.pageX - shiftX,
              y: event.pageY - shiftY,
            },
            updatedTs: Date.now(),
          },
        })
      );
    };

    cardEl.addEventListener("mousemove", handleMouseMove);
    cardEl.addEventListener(
      "mouseup",
      () => {
        cardEl.removeEventListener("mousemove", handleMouseMove);
      },
      {
        once: true,
      }
    );
    cardEl.addEventListener(
      "mouseleave",
      () => {
        cardEl.removeEventListener("mousemove", handleMouseMove);
      },
      {
        once: true,
      }
    );
  }, []);

  const handleEditorMouseDown = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleEditorContentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        updateNoteById({
          id: note.id,
          note: {
            ...note,
            content: event.target.value,
            updatedTs: Date.now(),
          },
        })
      );
    },
    [note]
  );

  const handleDeleteBtnClick = useCallback(() => {
    dispatch(deleteNoteById(note.id));
  }, [note]);

  return (
    <div
      className="sticky-card-wrapper"
      style={{ top: note.position.y, left: note.position.x }}
      onMouseDown={handleStickyCardMouseDown}
      onDoubleClick={handleStickyCardDoubleClick}
    >
      <div className="tool-bar-container">
        <span className="btn" onClick={handleDeleteBtnClick}>
          Delete
        </span>
      </div>
      <textarea
        style={{ width: note.bounding.width, height: note.bounding.height }}
        className="editor"
        defaultValue={note.content}
        onMouseDown={handleEditorMouseDown}
        onChange={handleEditorContentChange}
      ></textarea>
    </div>
  );
};

export default StickyCard;
