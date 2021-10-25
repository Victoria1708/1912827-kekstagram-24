import {isEscapeKey} from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const uploadControl = document.querySelector('#upload-file');
const editPhotoForm = document.querySelector('.img-upload__overlay');
const closeUploadBtn = document.querySelector('#upload-cancel');
const hashtagRegexp = new RegExp('^#[a-zA-Z0-9а-яА-ЯёЁщЩЇїІіЄєҐґ]{1,19}$');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const validateHashtag = () => {
  const hashtagsList = hashtagsInput.value.toLowerCase().split(' ');
  const uniqueList = [...new Set(hashtagsList)];
  const verifyHashtags = hashtagsList.map((hashTag) => hashtagRegexp.test(hashTag));

  if (!verifyHashtags.every(Boolean)) {
    hashtagsInput.setCustomValidity(`
      Xэш-тег начинается с # и состоит из букв и чисел;
      Максимальная длина одного хэш-тега 20 символов;
      Хэш-теги разделяются пробелами;`);
  } else if (hashtagsList.length > 5) {
    hashtagsInput.setCustomValidity('Максимальное колличество хэш-тегов - 5');
  } else if (hashtagsList.length !== uniqueList.length) {
    hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
};

const validateComment = () => {
  const valueLength = commentInput.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

// Code is temporary commented because changing a scale is a task of another module

// const decreasePhotoBtn = document.querySelector('.scale__control--smaller');
// const increasePhotoBtn = document.querySelector('.scale__control--bigger');
// const img = document.querySelector('.img-upload__preview img');
// const minScale = 25;
// const maxScale = 100;
// let numberScale = +document.querySelector('.scale__control--value').value.split('%').slice(0, 1).join('');

// const onDecreaseBtn = () => {
//   if (numberScale === minScale) {
//     return;
//   }
//   numberScale -= minScale;
//   document.querySelector('.scale__control--value').value = `${numberScale}%`;
//   document.querySelector('.img-upload__preview img').style.transform = `scale(${numberScale/100})`;
// };

// const onIncreaseBtn = () => {
//   if (numberScale === maxScale) {
//     return;
//   }
//   numberScale += minScale;
//   document.querySelector('.scale__control--value').value = `${numberScale}%`;
//   document.querySelector('.img-upload__preview img').style.transform = `scale(${numberScale/100})`;
// };

const hideEditForm = () => {
  editPhotoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeUploadBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
  hashtagsInput.removeEventListener('change', validateHashtag);
  commentInput.removeEventListener('input', validateComment);
  uploadControl.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  // decreasePhotoBtn.removeEventListener('click', onDecreaseBtn);
  // increasePhotoBtn.removeEventListener('click', onIncreaseBtn);
};

const showEditForm = () => {
  editPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagsInput.addEventListener('change', validateHashtag);
  commentInput.addEventListener('input', validateComment);
  closeUploadBtn.addEventListener('click', hideEditForm);
  document.addEventListener('keydown', onPopupEscKeydown);
  // decreasePhotoBtn.addEventListener('click', onDecreaseBtn);
  // increasePhotoBtn.addEventListener('click', onIncreaseBtn);
};

uploadControl.addEventListener('change', showEditForm);

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagsInput) {
      return;
    }
    if (document.activeElement === commentInput) {
      return;
    }
    evt.preventDefault();
    hideEditForm();
  }
}

function onCloseBtnClick() {
  hideEditForm();
}
