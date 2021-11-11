import {showAlert} from './utils.js';

let appData = [];

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.ok ? response.json() : showAlert('Возникла проблема с загрузкой данных'))
    .then((data) => {
      appData = data;
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Возникла проблема с загрузкой данных');
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData, appData};
