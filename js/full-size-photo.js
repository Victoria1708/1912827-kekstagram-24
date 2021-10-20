import {photoDescriptions} from './create-photo-descriptions.js';
import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const chancelIcon = document.querySelector('.big-picture__cancel');

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
  document.removeEventListener('keydown', onPopupEscKeydown);
  chancelIcon.removeEventListener('click', onChancelIconClick);
}

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  chancelIcon.addEventListener('click', onChancelIconClick);
};

const showFullSize = (event) => {
  openUserModal();

  const imageWrapper = document.querySelector('.big-picture__img');
  const socialComments = document.querySelector('.social__comments');
  const defaultImage = imageWrapper.querySelector('img');
  const socialCaption = document.querySelector('.social__caption');
  const userImg = event.currentTarget.querySelector('img');
  const photoDescId = +userImg.dataset.id;
  const descriptionItem = photoDescriptions.find((i) => i.id === photoDescId);

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

  const comment = createCommentWrapper(descriptionItem.comments);
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  defaultImage.setAttribute('src', descriptionItem.url);
  document.querySelector('.comments-count').textContent = '1';
  document.querySelector('.likes-count').textContent = descriptionItem.likes;

  socialComments.innerHTML = '';
  socialComments.appendChild(comment);
  socialCaption.innerHTML = descriptionItem.description;
};

export {showFullSize};