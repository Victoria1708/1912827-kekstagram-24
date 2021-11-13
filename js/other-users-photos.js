import {showFullSize} from './full-size-photo.js';
import {appData} from './api.js';
import {getRandomPositiveInteger} from './utils.js';
import {debounce} from './utils/debounce.js';

const photoTemplate = document.querySelector('#picture').content;
const photosContainer = document.querySelector('.pictures');

const onUserPhotoClick = () => {
  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.addEventListener('click', showFullSize);
};

const renderUsersPhotos = (photos) => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  const photosListFragment = document.createDocumentFragment();

  photos
    .forEach((photo) => {
      const userPhoto = photoTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__likes').textContent = photo.likes;
      const img = userPhoto.querySelector('.picture__img');
      img.setAttribute('src', photo.url);
      img.setAttribute('data-id', photo.id);

      userPhoto.querySelector('.picture__comments').textContent = photo.comments.length;

      photosListFragment.appendChild(userPhoto);
    });

  photosContainer.innerHTML = '';
  photosContainer.appendChild(photosListFragment);

  onUserPhotoClick();
};
const debouncePhotosRendering = debounce(renderUsersPhotos);

const filtersForm = document.querySelector('.img-filters__form');
const getPopularPhotos = ((prevPhoto, currentPhoto) => currentPhoto.comments.length - prevPhoto.comments.length);

const getRandomPhotos = (data) => {
  const RANDOM_PHOTOS_LENGTH = 10;
  let uniquePhotos = [];
  const uniqueURLsMapper = {}; // object with unique url keys (the values may have duplicated urls)

  data.forEach((item) => {
    if (item.url in uniqueURLsMapper) { // if we've already have such key (item.url), take its value and push the whole item there
      uniqueURLsMapper[item.url].push(item);
    }
    uniqueURLsMapper[item.url] = [item]; // add object key and its value
  });

  for (const key in uniqueURLsMapper) {
    uniquePhotos.push(uniqueURLsMapper[key][0]); // take only first element of key.value, it is unique (we don't include others, they are repeated)
  }

  if (uniquePhotos.length <= RANDOM_PHOTOS_LENGTH) {
    return uniquePhotos;
  }

  const startIndex = getRandomPositiveInteger(0, uniquePhotos.length - RANDOM_PHOTOS_LENGTH);
  return uniquePhotos = uniquePhotos.slice(startIndex, startIndex + RANDOM_PHOTOS_LENGTH);
};

const onFilterClick = (evt) => {
  const item = evt.target;
  const filtersArray = Array.from(filtersForm.children);
  filtersArray.forEach((filter) => filter.classList.remove('img-filters__button--active'));

  if (item.closest('button')) {
    item.classList.add('img-filters__button--active');
  }

  if (item.id === 'filter-discussed') {
    const sortedPhotos = appData.slice().sort(getPopularPhotos);
    debouncePhotosRendering(sortedPhotos);
    return;
  }

  if (item.id === 'filter-default') {
    debouncePhotosRendering(appData);
    return;
  }

  if (item.id === 'filter-random') {
    const randomPhotos = getRandomPhotos(appData);
    debouncePhotosRendering(randomPhotos);
  }
};

filtersForm.addEventListener('click', onFilterClick);


export {renderUsersPhotos};

