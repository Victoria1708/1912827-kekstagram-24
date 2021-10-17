import {getRandomInteger} from './utils.js';

const DESCRIPTIONS = [
  'Природа',
  'Город',
  'Животные',
  'Семья',
  'Море',
  'Люди',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function createPhotoDescriptions() {
  const photoDescriptions = [];
  for (let item = 1; item <= 25; item++) {
    photoDescriptions.push({
      id: item,
      url: `photos/${item}.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: {
        id: item + 30,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
        name: NAMES[getRandomInteger(0, NAMES.length - 1)],
      },
    });
  }
  return photoDescriptions;
}

export {DESCRIPTIONS, NAMES, MESSAGES, createPhotoDescriptions};
