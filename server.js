const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const notesRouter = require('./routes/notes.route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', notesRouter);

const PORT = 5000;
app.listen(PORT, () => { console.log(`server has been started on port ${PORT}`) });