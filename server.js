const express = require('express')
const path = require('path')
const parseLevels = require('./levels/parseLevels')
const server = express()

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

let levels = null
server.get('/levels', async (req, res) => {
  if (!levels) {
    levels = await parseLevels('./levels/levels-all.bbiy')
    
  }
  res.json(levels)
})

server.use(express.static('public'))

server.listen('3000')
