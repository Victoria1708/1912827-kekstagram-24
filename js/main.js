function getRandomInteger(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to < 0 || from < 0) {
    console.log('Диапазон может быть только положительный, включая ноль');
    return;
  }
  if (to <= from) {
    console.log('Значение «до» меньшее, чем значение «от», или равное ему');
    return;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

console.log(getRandomInteger(4,7));

function isStringHasProperLength(string, maxLength) {
  return string.length < maxLength;
}

console.log(isStringHasProperLength('dshhdshdshu dhduusd', 150));

