const fs = require('fs/promises')
let c = 0
class LevelReader {
  constructor () {
    this.reset()
  }
  
  reset () {
    this.name = null
    this.width = null
    this.height = null
    this.background = ''
    this.foreground = ''
    this.step = 0
  }
  
  handleLine (line) {
    switch (this.step++) {
      case 0:
        if (line.trim() === '') {
          this.step = 0
          return
        }
        this.name = line
        break
      case 1:
        const [width, height] = line.split('x').map(s => parseInt(s.trim()))
        this.width = width
        this.height = height
        break
      default:
        if (this.step - 3 < this.height) {
          this.background += line
        } else if (this.step - 3 < this.height * 2) {
          this.foreground += line
        } else {
          const levelObject = this.levelObject()
          this.reset()
          this.handleLine(line)
          return levelObject
        }
    }
  }
  
  cleanup () {
    if (this.step > 0) {
      if (this.height * this.width === this.foreground.length && this.foreground.length === this.background.length) {
        return this.levelObject()
      }
    }
  }
  
  levelObject () {
    return {
      name: this.name,
      width: this.width,
      height: this.height,
      background: this.background,
      foreground: this.foreground
    }
  }
}

async function parseLevels (filename) {
  // Check if server has permissions to read filename
  const file = await fs.open(filename, fs.constants.O_RDONLY)
  const lineReader = new LevelReader()
  const levels = []
  for await (const line of file.readLines()) {
    const maybeLevel = lineReader.handleLine(line)
    if (maybeLevel) {
      levels.push(maybeLevel)
    }
  }
  const lastLevel = lineReader.cleanup()
  if (lastLevel) {
    levels.push(lastLevel)
  }
  file.close()
  return levels
}

setImmediate(async () => {
  const levels = await parseLevels('levels-all.bbiy')
  console.log(levels)  
})

module.exports = parseLevels
