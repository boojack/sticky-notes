import React, { useEffect } from "react";
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

  const handleDashBoardDoubleClick = (event: React.MouseEvent) => {
    const mousePosition: Position = {
      x: event.pageX,
      y: event.pageY,
    };
    dispatch(
      addNote({
        id: `${Date.now()}`,
        content: "",
        bounding: {
          width: 200,
          height: 200,
        },
        position: mousePosition,
        createdTs: Date.now(),
        updatedTs: Date.now(),
      })
    );
  };

  return (
    <div className="dashboard-wrapper" onDoubleClick={handleDashBoardDoubleClick}>
      <p className="hint-text">Just double click on any blank space to create a card.</p>
      {notes.map((note) => {
        return <StickyCard key={`${note.id}`} note={note} />;
      })}
    </div>
  );
};

export default Dashboard;
