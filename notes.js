const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();

  if (checkNotes(title, notes))
    return console.log(`Note title: '${title}' is already taken!.`);

  notes.push({
    title,
    body,
  });

  saveNotes(notes);
  return console.log(`Note title: '${title}' was added!.`);
};

const checkNotes = (title, notes, callback = null) => {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title === title) {
      if (callback) return callback();
      return true;
    }
  }
  return false;
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
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
  if (!notes.length) return console.log(`There are no notes available!.`);

  //check title in notes and execute callback
  const filteredNotes = checkNotes(title, notes, () => {
    return notes.filter((note) => note.title !== title);
  });

  //if title not found
  if (!filteredNotes)
    return console.log(`Note title: ${title} was not found!.`);

  saveNotes(filteredNotes);
  console.log(`Note title: ${title} was removed!.`);
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
};
