const express = require('express')
const app = express()

const filmes = require('./routes/filmesRoute')

app.use(express.json())

app.all('*', (req, res, next) => {
    next()
})

app.use('/', filmes)


module.exports = app