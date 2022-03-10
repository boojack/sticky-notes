interface Position {
  x: number;
  y: number;
}

interface Bounding {
  width: number;
  height: number;
}

type Status = "NORMAL" | "TRASH";

// Sticky note card data model
interface Note {
  id: UUID;
  // text content could be markdown or raw text.
  content: string;
  // card bounding.
  bounding: Bounding;
  // card relative position.
  position: Position;
  status: Status;
  createdTs: Timestamp;
  updatedTs: Timestamp;
}
