module.exports = function processMovement(position, allPositions, coordinatesXY) {
  let proposedMovement = position
  switch(position['direction']) {
      case 'N':
          proposedMovement = { 'x': position['x'], 'y': position['y'] + 1, 'direction': 'N'}
          break
      case 'E':
          proposedMovement = { 'x': position['x'] + 1, 'y': position['y'], 'direction': 'E'}
          break
      case 'S':
          proposedMovement = { 'x': position['x'], 'y': position['y'] - 1, 'direction': 'S'}
          break
      case 'W':
          proposedMovement = { 'x': position['x'] - 1, 'y': position['y'], 'direction': 'W'}
          break
      default:
          console.log("Wrong direction!")
  }

  let scentDetected = false
  // check if detected the scent
  for (const otherRover of allPositions.filter(r => r['status'] === "LOST")) {
    const samePositionCheck = (x1, y1, x2, y2) => x1 === x2 && y1 === y2
    if (samePositionCheck(otherRover['x'], position['x'], otherRover['y'], position['y']) &&
        otherRover['status'] === "LOST") {
          scentDetected = true
          break
    }
  }

  // check if out of bounds
  if (
    proposedMovement['x'] < 0 ||
    proposedMovement['x'] > coordinatesXY[0] ||
    proposedMovement['y'] < 0 ||
    proposedMovement['y'] > coordinatesXY[1]
  ) {
    if (!scentDetected) {
      console.log('Out of bounds! Lost a rover')
      position['status'] = 'LOST'
    }
    return position
  }
  return proposedMovement
}
