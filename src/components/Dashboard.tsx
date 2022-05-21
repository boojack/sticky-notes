import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addNote } from "../store/note";
import StickyCard from "./StickyCard";
import Toolbar from "./Toolbar";
import "../less/dashboard.less";

const Dashboard = () => {
  const noteList = useAppSelector((state) => state.note.noteList.filter((note) => note.status === "NORMAL"));
  const dispatch = useAppDispatch();

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
        status: "NORMAL",
        createdTs: now,
        updatedTs: now,
      })
    );
  }, []);

  const handleStopPropagation = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <div className="dashboard-wrapper" onDoubleClick={handleDashBoardDoubleClick}>
      <div className="hint-block" onDoubleClick={handleStopPropagation}>
        <img className="logo-img" src="/sticky-notes.ico" alt="" />
        <span>double-click on any blank space to create a card. </span>
        <a href="https://github.com/justmemos/sticky-notes">
          <img src="https://img.shields.io/github/stars/usememos/sticky-notes" alt="" />
        </a>
      </div>
      <Toolbar />
      {noteList.map((note) => {
        return <StickyCard key={`${note.id}`} note={note} />;
      })}
    </div>
  );
};

export default Dashboard;
