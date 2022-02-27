import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addNote } from "../store/notes";
import StickyCard from "./StickyCard";
import "../less/dashboard.less";

const Dashboard = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();

  const handleDashBoardMouseMove = (event: React.MouseEvent) => {
    // console.log(event.pageX, event.pageY);
  };

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
    <div className="dashboard-wrapper" onMouseMove={handleDashBoardMouseMove} onDoubleClick={handleDashBoardDoubleClick}>
      <p className="hint-text">New card with just double-click any blank space</p>
      {notes.map((note) => {
        return <StickyCard key={`${note.id}`} note={note} />;
      })}
    </div>
  );
};

export default Dashboard;
