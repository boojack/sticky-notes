export function getTestNotes(): Note[] {
  return [
    {
      id: `${Date.now()}`,
      content: "test",
      bounding: {
        width: 200,
        height: 200,
      },
      position: {
        x: 100,
        y: 100,
      },
      createdTs: Date.now(),
      updatedTs: Date.now(),
    },
  ];
}
