import {photoDescriptions} from './create-photo-descriptions.js';
import {showFullSize} from './full-size-photo.js';

const photoTemplate = document.querySelector('#picture').content;
const photosContainer = document.querySelector('.pictures');
const photosListFragment = document.createDocumentFragment();

photoDescriptions.forEach((description) => {
  const userPhoto = photoTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__likes').textContent = description.likes;
  const img = userPhoto.querySelector('.picture__img');
  img.setAttribute('src', description.url);
  img.setAttribute('data-id', description.id);

  userPhoto.querySelector('.picture__comments').textContent = '1';

  photosListFragment.appendChild(userPhoto);
});

photosContainer.appendChild(photosListFragment);

window.onload = function () {
  const photosCollection = document.querySelectorAll('.picture');
  const photosArray = Array.from(photosCollection);
  photosArray.forEach((photo) => photo.addEventListener('click', showFullSize));
};

