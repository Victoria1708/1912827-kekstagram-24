import {getRandomInteger, generateUniqueNums} from './utils.js';

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

const createPhotoDescriptions = () => {
  const commentsIDs = generateUniqueNums(7);
  const descriptions = [];
  for (let item = 1; item <= 25; item++) {
    descriptions.push({
      id: item,
      url: `photos/${item}.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: [
        {
          id: commentsIDs[0],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[1],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[2],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[3],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[4],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[5],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
        {
          id: commentsIDs[6],
          avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomInteger(0, NAMES.length - 1)],
        },
      ],
    });
  }
  return descriptions;
};

const photoDescriptions = createPhotoDescriptions();

export {DESCRIPTIONS, NAMES, MESSAGES, createPhotoDescriptions, photoDescriptions};
