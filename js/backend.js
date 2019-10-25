'use strict';

// Фаил backend.js
// Отправка и запрос данных сервера
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка: ' + xhr.status);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Время запроса больше ' + xhr.timeout / 10000 + ' с.');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
