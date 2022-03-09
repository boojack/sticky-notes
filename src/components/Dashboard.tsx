import React, { useCallback, useEffect } from "react";
import { storage } from "../helpers/storage";
import { useAppDispatch, useAppSelector } from "../store";
import { addNote } from "../store/note";
import StickyCard from "./StickyCard";
import Toolbar from "./Toolbar";
import "../less/dashboard.less";

const Dashboard = () => {
  const noteList = useAppSelector((state) => state.note.noteList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    storage.set({
      noteList: noteList,
    });
  }, [noteList]);

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

  const handleStopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <div className="dashboard-wrapper" onDoubleClick={handleDashBoardDoubleClick}>
      <p className="hint-text" onDoubleClick={handleStopPropagation}>
        double-click on any blank space to create a card. <a href="https://github.com/justmemos/sticky-notes">GitHub</a>
      </p>
      <Toolbar />
      {noteList.map((note) => {
        return <StickyCard key={`${note.id}`} note={note} />;
      })}
    </div>
  );
};

export default Dashboard;
