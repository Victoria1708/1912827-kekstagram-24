import {showFullSize} from './full-size-photo.js';

const photoTemplate = document.querySelector('#picture').content;
const photosContainer = document.querySelector('.pictures');

const onUserPhotoClick = () => {
  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.addEventListener('click', showFullSize);
};

const renderUsersPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const userPhoto = photoTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__likes').textContent = photo.likes;
    const img = userPhoto.querySelector('.picture__img');
    img.setAttribute('src', photo.url);
    img.setAttribute('data-id', photo.id);

    userPhoto.querySelector('.picture__comments').textContent = photo.comments.length;

    photosListFragment.appendChild(userPhoto);
  });

  photosContainer.appendChild(photosListFragment);

  onUserPhotoClick();
};


export {renderUsersPhotos};

