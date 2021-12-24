import * as notes from './notes';
import * as yargs from 'yargs';

yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { title: string; body: string }): void {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { title: string }): void {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler(): void {
    notes.listNotes();
  },
});

yargs.command({
  command: 'read',
  describe: 'read a notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { title: string }): void {
    notes.readNote(argv.title);
  },
});

yargs.parse();
