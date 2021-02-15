const fs = require('fs');
const express = require('express')

let rawdata = fs.readFileSync('projects.json');
let projects = JSON.parse(rawdata);

const app = express()
const port = 3000

app.get('/projects', (req, res) => {
    res.send(projects)
})

app.listen(port, () => {
    console.log(`Fake Projects API listening at http://localhost:${port}`)
})