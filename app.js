const express = require('express')
const app = express()
const readline = require('readline')
const runCommands = require('./runCommands')

let marsXY = []
let rovers = []
let output = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.prompt()

let enteredCoords = false
let roverLineOne = true
rl.on('line', (line) => {
  if (!enteredCoords) {
    // Entering grid references
    const lineElements = line.trim().split(' ')
    marsXY = [
      parseInt(lineElements[0]),
      parseInt(lineElements[1])
    ]
    enteredCoords = true
  } else {
    if (roverLineOne) {
      // Entering position of a rover
      const lineElements = line.trim().split(' ')
      rovers.push({
        'position': {
          'x': parseInt(lineElements[0]),
          'y': parseInt(lineElements[1]),
          'direction': lineElements[2]
        },
        'movement' : []
      })
      roverLineOne = false
    } else {
      // Entering movements of a rover
      rovers[rovers.length - 1]['movement'] = line.trim().split('')
      roverLineOne = true
      console.log('Rover added')
    }
  }
  rl.prompt()
}).on('close', () => {
  console.log('Output:')
  output = runCommands(rovers, marsXY)
  for (o = 0; o < output.length; o += 1) {
    let roverOutput = ''
    for (const [key, value] of Object.entries(output[o])) {
      roverOutput += value + ' '
    }
    console.log(roverOutput)
  }
  process.exit(0)
})



//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(3000, () => console.log('Example app listening on port 3000!'))
