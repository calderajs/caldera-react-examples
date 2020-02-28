import { renderCalderaApp } from "caldera";
import React, { useState } from "react";
import fs from "fs";

let nextSessionId = 0;
const FILENAME = "../notes.json";

const savedNotes: Record<string, string> = fs.existsSync(FILENAME)
  ? JSON.parse(fs.readFileSync(FILENAME, "utf8"))
  : {};

const loadNote = (sessionId: string) => savedNotes[sessionId] || "";

const saveNote = (sessionId: string, note: string) => {
  savedNotes[sessionId] = note;
  // Write to disk
  fs.writeFileSync(FILENAME, JSON.stringify(savedNotes, null, 4));
};

const App = () => {
  const [sessionId] = useState(() => (++nextSessionId).toString());
  const [currentNote, setCurrentNote] = useState(loadNote(sessionId));

  return (
    <div>
      <h1>Session ID: {sessionId}</h1>
      <textarea
        ref={ref => console.log({ ref })}
        value={currentNote}
        onChange={e => {
          const { value } = e.target;
          setCurrentNote(value);
          saveNote(sessionId, value);
        }}
      ></textarea>
    </div>
  );
};

renderCalderaApp(<App />);
