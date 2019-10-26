'use strict';

// Модуль. Формирование галереи из неповторяющихся фотографий
(function () {

  var creatingCopies = function (usersPhotos) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var d = 0; d < 25; d++) {
      var userPhoto = usersPhotos[d];
      template.querySelector('.picture__img').src = userPhoto.url;
      template.querySelector('.picture__likes').textContent = userPhoto.likes;
      template.querySelector('.picture__comments').textContent = userPhoto.comments.length;
      var photoElement = template.cloneNode(true);
      fragment.appendChild(photoElement);
    }
    window.galleryPhotos.appendChild(fragment);
  };

  window.backend.load(creatingCopies, window. errorHandler); // Зопуск функции запроса данных с сервера
})();
