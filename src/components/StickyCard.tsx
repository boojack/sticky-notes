import React, { useEffect } from "react";
import "../less/sticky-card.less";

interface Props {
  note: Note;
}

const StickyCard: React.FC<Props> = (props) => {
  const { note } = props;

  useEffect(() => {
    console.log("here");
  }, []);

  const handleStickyCardDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="sticky-card-wrapper"
      onDoubleClick={handleStickyCardDoubleClick}
      style={{ top: note.position.y, left: note.position.x }}
    >
      <textarea defaultValue={note.content}></textarea>
    </div>
  );
};

export default StickyCard;
