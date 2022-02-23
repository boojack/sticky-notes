interface Position {
  x: number;
  y: number;
}

interface Bounding {
  width: number;
  height: number;
}

// Sticky note card data model
interface Note {
  id: UUID;
  // text content could be markdown or raw text.
  content: string;
  // card bounding.
  bounding: Bounding;
  // card relative position.
  position: Position;
  createdTs: Timestamp;
  updatedTs: Timestamp;
}
