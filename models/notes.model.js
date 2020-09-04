const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');



class Notes {
    id = 0;
    constructor(title, description) {
        this.id = uuid(),
            this.title = title,
            this.description = description

    };

    getForm() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
        }
    }


    async save() {
        const notes = await Notes.getAll();
        notes.push(this.getForm());
        return new Promise((resolve, reject) => {

            fs.writeFile(path.join(__dirname, '..', 'mocked-database', 'notes.json'), JSON.stringify(notes), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }


    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'mocked-database', 'notes.json'), 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        })

    }

    static async findById(id) {
        const notes = await Notes.getAll();
        const data = await notes.find(note => note.id == id);
        return data;
    }

    static async updateOne(note) {
        const notes = await Notes.getAll();
        const idx = notes.findIndex(notes => notes.id === note.id);
        notes[idx] = note;
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'mocked-database', 'notes.json'), JSON.stringify(notes), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static async deleteOne(id) {
        let notes = await Notes.getAll();
        notes = notes.filter(note => note.id != id);
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'mocked-database', 'notes.json'), JSON.stringify(notes), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        })


    }
}

module.exports = Notes;