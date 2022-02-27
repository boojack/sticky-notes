import React, { useCallback, useEffect } from "react";
import { storage } from "../helpers/storage";
import { useAppDispatch, useAppSelector } from "../store";
import { addNote } from "../store/notes";
import StickyCard from "./StickyCard";
import "../less/dashboard.less";

const Dashboard = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    storage.set({
      notes: notes,
    });
  }, [notes]);

  const handleDashBoardDoubleClick = useCallback((event: React.MouseEvent) => {
    const mousePosition: Position = {
      x: event.pageX,
      y: event.pageY,
    };

    const now = Date.now();

    dispatch(
      addNote({
        id: `${now}`,
        content: "",
        bounding: {
          width: 256,
          height: 128,
        },
        position: mousePosition,
        createdTs: now,
        updatedTs: now,
      })
    );
  }, []);

  return (
    <div className="dashboard-wrapper" onDoubleClick={handleDashBoardDoubleClick}>
      <p className="hint-text" onDoubleClick={(e) => e.stopPropagation()}>
        Just double click on any blank space to create a card. Star me in <a href="https://github.com/justmemos/sticky-notes">GitHub</a>.
      </p>
      {notes.map((note) => {
        return <StickyCard key={`${note.id}`} note={note} />;
      })}
    </div>
  );
};

export default Dashboard;
