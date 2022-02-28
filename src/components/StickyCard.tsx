import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../store";
import { updateNoteById, deleteNoteById } from "../store/notes";
import "../less/sticky-card.less";

interface Props {
  note: Note;
}

const StickyCard: React.FC<Props> = (props) => {
  const { note } = props;
  const dispatch = useAppDispatch();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const resizeObserver = new window.ResizeObserver(() => {
      if (!editorRef.current) {
        return;
      }
      dispatch(
        updateNoteById({
          id: note.id,
          note: {
            bounding: {
              width: editorRef.current.clientWidth,
              height: editorRef.current.clientHeight,
            },
            updatedTs: Date.now(),
          },
        })
      );
    });
    resizeObserver.observe(editorRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [note.id]);

  const handleStickyCardDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleStickyCardMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      const shiftX = event.clientX - left;
      const shiftY = event.clientY - top;

      const handleMouseMove = (event: MouseEvent) => {
        dispatch(
          updateNoteById({
            id: note.id,
            note: {
              position: {
                x: event.pageX - shiftX,
                y: event.pageY - shiftY,
              },
              updatedTs: Date.now(),
            },
          })
        );
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        {
          once: true,
        }
      );
    },
    [note.id]
  );

  const handleStickyCardTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      const shiftX = event.touches[0].clientX - left;
      const shiftY = event.touches[0].clientY - top;

      const handleTouchMove = (event: TouchEvent) => {
        dispatch(
          updateNoteById({
            id: note.id,
            note: {
              position: {
                x: event.touches[0].pageX - shiftX,
                y: event.touches[0].pageY - shiftY,
              },
              updatedTs: Date.now(),
            },
          })
        );
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener(
        "touchend",
        () => {
          document.removeEventListener("touchmove", handleTouchMove);
        },
        {
          once: true,
        }
      );
    },
    [note.id]
  );

  // stop propagation mouse down event in editor
  const handleStopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  // rerender card to update its z-index
  const handleEditorClick = useCallback(() => {
    dispatch(
      updateNoteById({
        id: note.id,
        note: {
          updatedTs: Date.now(),
        },
      })
    );
  }, [note.id]);

  const handleEditorContentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        updateNoteById({
          id: note.id,
          note: {
            content: event.target.value,
            updatedTs: Date.now(),
          },
        })
      );
    },
    [note.id]
  );

  const handleDeleteBtnClick = useCallback(() => {
    dispatch(deleteNoteById(note.id));
  }, [note]);

  return (
    <div
      className="sticky-card-wrapper"
      style={{ top: note.position.y, left: note.position.x }}
      onDoubleClick={handleStickyCardDoubleClick}
      onMouseDown={handleStickyCardMouseDown}
      onTouchStart={handleStickyCardTouchStart}
    >
      <div className="header-container">
        <div className="btns-container">
          <span className="btn delete-btn" onClick={handleDeleteBtnClick}>
            Delete
          </span>
        </div>
      </div>
      <textarea
        style={{ width: note.bounding.width, height: note.bounding.height }}
        className="editor"
        placeholder="..."
        ref={editorRef}
        defaultValue={note.content}
        onClick={handleEditorClick}
        onChange={handleEditorContentChange}
        onMouseDown={handleStopPropagation}
        onTouchStart={handleStopPropagation}
      ></textarea>
    </div>
  );
};

export default StickyCard;
