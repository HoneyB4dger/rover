'use strict'

const chai = require('chai')
const expect = chai.expect


let calculateApp = require('../runCommands.js')
describe('Examples from the excercise', function () {
  it('should calculate the correct output', function () {
    let move = calculateApp([
      { position: { x: 1, y: 2, direction: 'N' },
          movement: [ 'L', 'F', 'L', 'F', 'L', 'F', 'L', 'F', 'F' ] },
      { position: { x: 3, y: 3, direction: 'E' },
          movement: [ 'F', 'F', 'R', 'F', 'F', 'R', 'F', 'R', 'R', 'F' ] } ], [5, 5])
    expect(move).to.deep.equal([
      { x: 1, y: 3, direction: 'N' },
      { x: 5, y: 1, direction: 'E' } ])
  })
})

let rotationApp = require('../proccessRotation.js')
describe('Test rotation', function () {
  it('Rotation should give the right output', function () {
    let move = rotationApp('N', 'L')
    expect(move).to.equal('W')
  })
})

let movementApp = require('../proccessMovement.js')
describe('Test movement', function () {
  it('Movement should give the right output', function () {
    let move = movementApp({'x': 1, 'y': 1, 'direction': 'N'}, [], [5, 5])
    expect(move).to.deep.equal({'x': 1, 'y': 2, 'direction': 'N'})
  })
})
