module.exports = function processRotation(initial, directed) {
  const compass = ['N', 'E', 'S', 'W']
  const indexOfInitial = compass.indexOf(initial['direction'])
  if (directed === 'L') {
    if (indexOfInitial - 1 < 0) {
      return 'W'
    } else {
      return compass[indexOfInitial - 1]
    }
  } else if (directed === 'R') {
    if (indexOfInitial + 1 > 3) {
      return 'N'
    } else {
      return compass[indexOfInitial + 1]
    }
  }
}
