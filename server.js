const express = require('express')
const path = require('path')
const server = express()

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})


server.use(express.static('public'))

server.listen('3000')
