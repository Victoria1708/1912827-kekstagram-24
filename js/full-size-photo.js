import {photoDescriptions} from './create-photo-descriptions.js';
import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const chancelIcon = document.querySelector('.big-picture__cancel');
const commentLoadBtn = document.querySelector('.comments-loader');
const socialCommentsWrapper = document.querySelector('.social__comments');
const viewCommentsCountWrapper = document.querySelector('.view-comments-count');

let photoComments = [];
let offset = 0;
let limit = 5;
let visibleCommentsCounter = 0;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const onChancelIconClick = () => {
  closeUserModal();
};

function closeUserModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');

  photoComments = [];
  offset = 0;
  limit = 5;
  visibleCommentsCounter = 0;

  document.removeEventListener('keydown', onPopupEscKeydown);
  chancelIcon.removeEventListener('click', onChancelIconClick);
  commentLoadBtn.removeEventListener('click', onLoadComments);
}

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  chancelIcon.addEventListener('click', onChancelIconClick);
  commentLoadBtn.addEventListener('click', onLoadComments);
};

const showFullSize = (event) => {
  openUserModal();

  const imageWrapper = document.querySelector('.big-picture__img');
  const defaultImage = imageWrapper.querySelector('img');
  const socialCaption = document.querySelector('.social__caption');
  const userImg = event.currentTarget.querySelector('img');

  const photoDescId = +userImg.dataset.id;
  const descriptionItem = photoDescriptions.find((i) => i.id === photoDescId);

  //copy comments to prevent their change in other modules
  photoComments = [...descriptionItem.comments];

  socialCommentsWrapper.innerHTML = '';
  const defaultComments = photoComments.slice(offset, limit); // take 5 first comments
  visibleCommentsCounter += defaultComments.length;
  viewCommentsCountWrapper.innerHTML = visibleCommentsCounter;

  loadComments(socialCommentsWrapper, defaultComments); // show 5 first comments


  defaultImage.setAttribute('src', descriptionItem.url);
  document.querySelector('.comments-count').textContent = String(descriptionItem.comments.length);
  document.querySelector('.likes-count').textContent = descriptionItem.likes;
  socialCaption.innerHTML = descriptionItem.description;
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

function loadComments(socialComments, comments) {
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

  for (let i = 0; i < comments.length; i++) {
    socialComments.appendChild(createCommentWrapper(comments[i]));
  }
}

function onLoadComments() {
  offset += limit; // skip 5 comments (we already showed them)
  const hiddenComments = photoComments.slice(offset, offset + limit);
  visibleCommentsCounter += hiddenComments.length;
  viewCommentsCountWrapper.innerHTML = visibleCommentsCounter;
  loadComments(socialCommentsWrapper, hiddenComments);
}

export {showFullSize};
