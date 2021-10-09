function getRandomInteger(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to < 0 || from < 0) {
    return -1;
  }
  if (to <= from) {
    return -1;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function isStringHasProperLength(string, maxLength) {
  return string.length <= maxLength;
}

export {getRandomInteger, isStringHasProperLength};
