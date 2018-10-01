const processMovement = require('./proccessMovement')
const processRotation = require('./proccessRotation')

module.exports = function runCommands(rovers, marsXY) {
  let allPositions = []
  rovers.forEach(rover => {
    let currentPosition = rover['position']
    for (m = 0; m < rover['movement'].length; m += 1) {
      const movement = rover['movement'][m]
      if (movement === 'F') {
        currentPosition = processMovement(currentPosition, allPositions, marsXY)
        if (currentPosition['status'] === 'LOST') break
      } else {
        currentPosition['direction'] = processRotation(currentPosition, movement)
      }
      // You can log each step of the movement here - useful for debugging
      // console.log(currentPosition)
    }
    allPositions.push(currentPosition)
  })
  return allPositions
}
