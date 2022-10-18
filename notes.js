const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)

    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title
    // })

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen("New Note Added!"))
    }
    else{
        console.log(chalk.bgRed("Note Title Already Taken!"))
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title != title)

    // const notesToKeep = notes.filter((note) => {
    //     return note.title != title
    // })

    if (notes.length > notesToKeep.length){
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.bgRed('No Note Found!'))
    }
}

const listNotes = () =>{
    console.log(chalk.bgYellow("Your Notes : "))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote= (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.bgRed("Unable to Find Note!"))
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }
    catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}