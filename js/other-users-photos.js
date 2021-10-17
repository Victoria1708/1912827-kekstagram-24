import {createPhotoDescriptions} from './create-photo-descriptions.js';

const photoTemplate = document.querySelector('#picture').content;
const photosContainer = document.querySelector('.pictures');
const photoDescriptions = createPhotoDescriptions();
const photosListFragment = document.createDocumentFragment();

photoDescriptions.forEach((description) => {
  const userPhoto = photoTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__likes').textContent = description.likes;
  userPhoto.querySelector('.picture__img').src = description.url;
  userPhoto.querySelector('.picture__comments').textContent = '1';
  photosListFragment.appendChild(userPhoto);
});

photosContainer.appendChild(photosListFragment);

