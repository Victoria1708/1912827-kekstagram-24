import {isEscapeKey} from './utils.js';
import {sendData} from './api.js';

const MAX_COMMENT_LENGTH = 140;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadImgForm = document.querySelector('.img-upload__form');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const uploadControl = document.querySelector('#upload-file');
const preview = document.querySelector('.setup-user-pic');
const editPhotoForm = document.querySelector('.img-upload__overlay');
const closeUploadBtn = document.querySelector('#upload-cancel');
const hashtagRegexp = new RegExp('^#[a-zA-Z0-9а-яА-ЯёЁщЩЇїІіЄєҐґ]{1,19}$');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const decreasePhotoBtn = document.querySelector('.scale__control--smaller');
const increasePhotoBtn = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const formImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider'); // slider
const effectValueControl = document.querySelector('.effect-level__value'); //hidden input with slider value
let numberScale = +document.querySelector('.scale__control--value').value.split('%').slice(0, 1).join('');
let hideEditForm = null;

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

// Change photo's scale
const onDecreaseBtn = () => {
  if (numberScale === MIN_SCALE) {
    return;
  }
  numberScale -= MIN_SCALE;
  document.querySelector('.scale__control--value').value = `${numberScale}%`;
  document.querySelector('.img-upload__preview img').style.transform = `scale(${numberScale / 100})`;
};

const onIncreaseBtn = () => {
  if (numberScale === MAX_SCALE) {
    return;
  }
  numberScale += MIN_SCALE;
  document.querySelector('.scale__control--value').value = `${numberScale}%`;
  document.querySelector('.img-upload__preview img').style.transform = `scale(${numberScale / 100})`;
};

const onPopupEscKeydown = (evt) => {
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
};

const onCloseBtnClick = () => {
  hideEditForm();
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

sliderElement.parentElement.style.visibility = 'hidden';

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  const sliderValue = unencoded[handle];
  effectValueControl.value = sliderValue;

  switch (formImage.className) {
    case 'effects__preview--chrome': {
      formImage.style.filter = `grayscale(${sliderValue})`;
      break;
    }
    case 'effects__preview--sepia': {
      formImage.style.filter = `sepia(${sliderValue})`;
      break;
    }
    case 'effects__preview--marvin': {
      formImage.style.filter = `invert(${sliderValue}%)`;
      break;
    }
    case 'effects__preview--phobos': {
      formImage.style.filter = `blur(${sliderValue}px)`;
      break;
    }
    case 'effects__preview--heat': {
      formImage.style.filter = `brightness(${sliderValue})`;
      break;
    }
  }

});
const onChangeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    switch (evt.target.id) {
      case 'effect-chrome':
        formImage.className = 'effects__preview--chrome';
        sliderElement.parentElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        break;
      case 'effect-sepia':
        formImage.className = 'effects__preview--sepia';
        sliderElement.parentElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        break;
      case 'effect-marvin':
        formImage.className = 'effects__preview--marvin';
        sliderElement.parentElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        break;
      case 'effect-phobos':
        formImage.className = 'effects__preview--phobos';
        sliderElement.parentElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        break;
      case 'effect-heat':
        formImage.className = 'effects__preview--heat';
        sliderElement.parentElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        break;
      default:
        formImage.className = '';
        formImage.style.filter = '';
        effectValueControl.value = '';
        sliderElement.parentElement.style.visibility = 'hidden';
    }
  }
};

hideEditForm = () => {
  preview.src = 'img/upload-default-image.jpg'; // set default src
  uploadControl.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  effectValueControl.value = '';
  formImage.value = '';
  formImage.className = '';
  formImage.style.filter = '';
  effectsPreviews.forEach((effectsPreview) => {
    effectsPreview.style.backgroundImage = 'url(\'img/upload-default-image.jpg\')'; // set default background-img
  });
  document.querySelector('.img-upload__preview img').style.transform = '';
  sliderElement.parentElement.style.visibility = 'hidden';
  editPhotoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeUploadBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
  hashtagsInput.removeEventListener('change', validateHashtag);
  commentInput.removeEventListener('input', validateComment);
  decreasePhotoBtn.removeEventListener('click', onDecreaseBtn);
  increasePhotoBtn.removeEventListener('click', onIncreaseBtn);
  effectsList.removeEventListener('click', onChangeEffect);
};

const showEditForm = () => {
  const file = uploadControl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${preview.src})`;
    });
  }

  editPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagsInput.addEventListener('change', validateHashtag);
  commentInput.addEventListener('input', validateComment);
  closeUploadBtn.addEventListener('click', hideEditForm);
  document.addEventListener('keydown', onPopupEscKeydown);
  decreasePhotoBtn.addEventListener('click', onDecreaseBtn);
  increasePhotoBtn.addEventListener('click', onIncreaseBtn);
  effectsList.addEventListener('click', onChangeEffect);
};

uploadControl.addEventListener('change', showEditForm);

const outsideClickListener = (evt) => {
  if (!evt.target.classList.contains('success__inner') || !evt.target.classList.contains('error__inner')) {
    evt.target.classList.add('hidden');
    evt.target.remove();
    document.removeEventListener('click', outsideClickListener);
  }
};

// When form was successfully submitted
const onSuccess = () => {
  hideEditForm();
  const successMsgTemplate = document.querySelector('#success');
  const successForm = successMsgTemplate.content.cloneNode(true);
  document.body.append(successForm);
  const closeBtn = document.querySelector('.success__button');

  closeBtn.addEventListener('click', () => {
    document.querySelector('.success').classList.add('hidden');
    document.querySelector('.success').remove();
  });

  document.addEventListener('keydown', (evt) => {
    isEscapeKey(evt) && document.querySelector('.success').classList.add('hidden');
    document.querySelector('.success').remove();
  });

  document.addEventListener('click', outsideClickListener);
};

const onFail = () => {
  hideEditForm();
  const errorMsgTemplate = document.querySelector('#error');
  const errorForm = errorMsgTemplate.content.cloneNode(true);
  document.body.append(errorForm);
  const closeBtn = document.querySelector('.error__button');

  closeBtn.addEventListener('click', () => {
    document.querySelector('.error').classList.add('hidden');
    document.querySelector('.error').remove();
  });

  document.addEventListener('keydown', (evt) => {
    isEscapeKey(evt) && document.querySelector('.error').classList.add('hidden');
    document.querySelector('.error').remove();
  });

  document.addEventListener('click', outsideClickListener);
};

const setUserFormSubmit = () => {
  uploadImgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(onSuccess, onFail, new FormData(evt.target));
  });
};

export {setUserFormSubmit, showEditForm};
