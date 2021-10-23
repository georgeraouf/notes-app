const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
};

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    
    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('New note added!'));
    }
    else {
        console.log(chalk.red.inverse('That title is used before!'))
    }
    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if (newNotes.length === notes.length) {
        console.log(chalk.red.inverse('No note found!'));
    } else {
        console.log(chalk.green.inverse('Note was removed'));
    }
    saveNotes(newNotes);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your Notes'));
    notes.forEach((note) => {
        console.log(chalk.yellow(note.title));
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const dataParsed = JSON.parse(dataJSON);    
        return dataParsed;
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};