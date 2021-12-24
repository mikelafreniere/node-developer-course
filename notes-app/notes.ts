import * as fs from 'fs';
import * as util from './util';

const NOTES_FILE_NAME = 'notes.json';
interface Note {
  title: string;
  body: string;
}

export function addNote(title: string, body: string): void {
  const notes = loadNotes();
  const newNote: Note = {
    title,
    body,
  };

  let hasDuplicate = false;
  notes.some((n) => {
    if (n.title === title) {
      hasDuplicate = true;
      return; // break loop
    }
  });
  if (hasDuplicate) {
    util.printMsg(`Failed to add note, duplicate title: "${title}"`, util.MessageType.ERROR);
    return;
  }

  notes.push(newNote);
  util.printMsg(`Successfully added note with title: "${title}"`, util.MessageType.SUCCESS);
  writeNotes(notes);
}

export function removeNote(title: string): void {
  const notes = loadNotes();
  const newNotes = notes.filter((n) => n.title !== title);
  if (notes.length === newNotes.length) {
    util.printMsg(`Failed to find note with title: "${title}"`, util.MessageType.ERROR);
    return;
  }
  util.printMsg(`Successfully removed note with title: "${title}"`, util.MessageType.SUCCESS);
  writeNotes(newNotes);
}

export function readNote(title: string): void {
  const notes = loadNotes();
  const index = notes.findIndex((n) => n.title === title);
  if (index === -1) {
    util.printMsg(`Failed to find note with title: "${title}"`, util.MessageType.ERROR);
    return;
  }
  const note = notes[index];
  util.printMsg(`${note.title}\n\n${note.body}`, util.MessageType.INFO);
}

export function listNotes(): void {
  const notes = loadNotes();
  notes.map((n) => util.printMsg(n.title));
}

const loadNotes = (): Note[] => {
  try {
    const dataBuffer = fs.readFileSync(NOTES_FILE_NAME);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON) as Note[];
  } catch (e) {
    return [];
  }
};

const writeNotes = (notes: Note[]): void => {
  fs.writeFileSync(NOTES_FILE_NAME, JSON.stringify(notes));
};
