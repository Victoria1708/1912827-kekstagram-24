const getRandomInteger = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to < 0 || from < 0) {
    return -1;
  }
  if (to <= from) {
    return -1;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const isStringHasProperLength = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

export {getRandomInteger, isStringHasProperLength, isEscapeKey};
