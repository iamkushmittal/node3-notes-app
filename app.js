const chalk = require('chalk')
const yargs = require('yargs')
const notes = require("./notes.js")


//Customized Yargs Version
yargs.version('1.1.0') 

// Create add command
yargs.command({
    command: 'add' ,
    describe: 'Add a new Note' ,
    builder:{
        title:{
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },

        body: {
            describe: 'Body of Note',
            demandOption: true,
            type : 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title,argv.body)
    }
})


//Create Remove Command
yargs.command({
    command : 'remove',
    describe : 'Remove a Note',
    builder:{
        title:{
            describe : "Note Title",
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create List Command
yargs.command({
    command : 'list',
    describe : 'List your notes',
    handler(){
        notes.listNotes()
    }
})

//Create Read Command
yargs.command({
    command : 'read',
    describe : 'Read a Note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


yargs.parse()
