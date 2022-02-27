export function getTestNotes(): Note[] {
  return [
    {
      id: `${Date.now()}`,
      content: "📝 what do you think right now",
      bounding: {
        width: 256,
        height: 128,
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
