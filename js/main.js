function getRandomInteger(from, to) {
  document.querySelector('.error').innerHTML = '';
  from = Math.ceil(from);
  to = Math.floor(to);
  if (to < 0 || from < 0) {
    document.querySelector('.error').innerHTML = 'Диапазон может быть только положительный, включая ноль';
    return;
  }
  if (to <= from) {
    document.querySelector('.error').innerHTML = 'Значение «до» меньшее, чем значение «от», или равное ему';
    return;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function isStringHasProperLength(string, maxLength) {
  return string.length < maxLength;
}

getRandomInteger(2, 7);
isStringHasProperLength('dshhdshdshu dhduusd', 150);

