import {isEscapeKey} from './utils.js';
import {appData} from './api.js';

const bigPicture = document.querySelector('.big-picture');
const chancelIcon = document.querySelector('.big-picture__cancel');
const commentsLoadBtn = document.querySelector('.comments-loader');
const socialCommentsWrapper = document.querySelector('.social__comments');
const visibleCommentsCountWrapper = document.querySelector('.view-comments-count');
const commentsLoaderBtn = document.querySelector('.comments-loader');
let onPopupEscKeydown = null;
let onChancelIconClick = null;

let photoComments = [];
let offset = 0;
let limit = 5;
let visibleCommentsCounter = 0;

const renderPhotoComments = (comments) => {
  const createCommentWrapper = (userComment) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const pText = document.createTextNode(userComment.message);

    li.className = 'social__comment';
    img.className = 'social__picture';
    p.className = 'social__text';

    img.setAttribute('width', '35');
    img.setAttribute('height', '35');
    img.setAttribute('src', userComment.avatar);
    img.setAttribute('alt', userComment.name);

    p.appendChild(pText);
    li.appendChild(img);
    li.appendChild(p);

    return li;
  };

  comments.forEach((comment) => socialCommentsWrapper.appendChild(createCommentWrapper(comment)));
};

const onLoadComments = () => {
  offset += limit; // skip 5 comments (we already showed them)
  const hiddenComments = photoComments.slice(offset, offset + limit);
  visibleCommentsCounter += hiddenComments.length;
  visibleCommentsCountWrapper.innerHTML = visibleCommentsCounter;

  if (visibleCommentsCounter === photoComments.length) {
    commentsLoaderBtn.classList.add('hidden');
  }

  renderPhotoComments(hiddenComments);
};

const closeUserModal = () => {
  photoComments = [];
  offset = 0;
  limit = 5;
  visibleCommentsCounter = 0;
  socialCommentsWrapper.innerHTML = '';

  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  commentsLoaderBtn.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  chancelIcon.removeEventListener('click', onChancelIconClick);
  commentsLoadBtn.removeEventListener('click', onLoadComments);
};

onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

onChancelIconClick = () => {
  closeUserModal();
};

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  chancelIcon.addEventListener('click', onChancelIconClick);
  commentsLoadBtn.addEventListener('click', onLoadComments);
};

const showFullSize = (event) => {
  const pictureWrapper = event.target.closest('.picture');

  if (!pictureWrapper) {
    return;
  }

  openUserModal();

  const photoLikesCount = (event.target.closest('a').querySelector('.picture__likes').textContent);
  const photoCommentsCount = (event.target.closest('a').querySelector('.picture__comments').textContent);
  const imageWrapper = document.querySelector('.big-picture__img');
  const defaultImage = imageWrapper.querySelector('img');
  const socialCaption = document.querySelector('.social__caption');
  const userImg = pictureWrapper.querySelector('img');
  const photoDescId = +userImg.dataset.id;
  const clickedPhoto = appData.find((i) => i.id === photoDescId);
  socialCommentsWrapper.innerHTML = '';

  // copy comments to prevent their change in other modules
  photoComments = [...clickedPhoto.comments];

  const defaultComments = clickedPhoto.comments.slice(offset, limit); // take 5 first comments
  visibleCommentsCounter += defaultComments.length;
  visibleCommentsCountWrapper.innerHTML = visibleCommentsCounter;

  if (photoComments.length <= 5) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
  renderPhotoComments(defaultComments); // show 5 first comments

  defaultImage.setAttribute('src', clickedPhoto.url);
  document.querySelector('.comments-count').textContent = photoCommentsCount;
  document.querySelector('.likes-count').textContent = photoLikesCount;
  socialCaption.innerHTML = clickedPhoto.description;
  document.querySelector('.social__comment-count').classList.remove('hidden');
};

export {showFullSize};
