import React, { useEffect } from "react";
import { useAppDispatch } from "../store";
import { updateNoteById } from "../store/notes";
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

  const handleStickyCardDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  };

  const handleStickyCardMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardEl = event.currentTarget;
    let shiftX = event.clientX - cardEl.getBoundingClientRect().left;
    let shiftY = event.clientY - cardEl.getBoundingClientRect().top;

    const moveAt = (pageX: number, pageY: number) => {
      cardEl.style.left = pageX - shiftX + "px";
      cardEl.style.top = pageY - shiftY + "px";
      dispatch(
        updateNoteById({
          id: note.id,
          note: {
            ...note,
            position: {
              x: pageX - shiftX,
              y: pageY - shiftY,
            },
            updatedTs: Date.now(),
          },
        })
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      moveAt(event.pageX, event.pageY);
    };

    cardEl.addEventListener("mousemove", onMouseMove);

    cardEl.addEventListener(
      "mouseup",
      () => {
        cardEl.removeEventListener("mousemove", onMouseMove);
      },
      {
        once: true,
      }
    );
    cardEl.addEventListener(
      "mouseleave",
      () => {
        cardEl.removeEventListener("mousemove", onMouseMove);
      },
      {
        once: true,
      }
    );
  };

  return (
    <div
      className="sticky-card-wrapper"
      style={{ top: note.position.y, left: note.position.x }}
      onMouseDown={handleStickyCardMouseDown}
      onDoubleClick={handleStickyCardDoubleClick}
    >
      <textarea className="editor" onChange={handleContentChange} defaultValue={note.content}></textarea>
    </div>
  );
};

export default StickyCard;
