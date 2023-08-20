export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16)
  while (randomColor.length < 6) {
    randomColor = '0' + randomColor
  }
  return '#' + randomColor
}

export function getRandomStringFromArray(array) {
  const randomString = array[Math.floor(Math.random() * array.length)]
  return randomString
}
