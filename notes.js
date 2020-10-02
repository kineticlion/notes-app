const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
  const notes = loadNotes();

  //if notes array is empty
  if (!notes) return console.log(chalk.red(`No Notes avaialable`));

  //printing list of notes
  console.log(chalk.inverse("Your notes.."));
  for (let i = 0; i < notes.length; i++) {
    console.log(`${i + 1}: Title - '${notes[i].title}'`);
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();

  if (checkNotes(title, notes))
    return console.log(
      chalk.red.inverse(`Note title: '${title}' is already taken!.`)
    );

  notes.push({
    title,
    body,
  });

  saveNotes(notes);
  return console.log(chalk.green.inverse(`Note title: '${title}' was added!.`));
};

const checkNotes = (title, notes, callback = null) => {
  const noteFound = notes.find((note) => note.title === title);
  if (noteFound) {
    if (callback) return callback();
    return true;
  }
  return false;
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const readNote = (title) => {
  const notes = loadNotes();

  if (!notes) return console.log(chalk.red("No notes found!."));

  const noteIndex = notes.findIndex((note) => note.title === title);
  if (noteIndex === -1)
    return console.log(chalk.red(`Note title: ${title} was not found!.`));

  console.log(chalk.inverse(notes[noteIndex].title));
  console.log(notes[noteIndex].body);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  //Notes is empty array
  if (!notes.length)
    return console.log(chalk.red.inverse(`There are no notes available!.`));

  //check title in notes and execute callback
  const filteredNotes = checkNotes(title, notes, () => {
    return notes.filter((note) => note.title !== title);
  });

  //if title not found
  if (!filteredNotes)
    return console.log(
      chalk.red.inverse(`Note title: '${title}' was not found!.`)
    );

  saveNotes(filteredNotes);
  console.log(chalk.green.inverse(`Note title: '${title}' was removed!.`));
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
