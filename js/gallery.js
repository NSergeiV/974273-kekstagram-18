'use strict';

// Модуль. Формирование галереи из неповторяющихся фотографий
(function () {
  var numReserve = [];
  while (numReserve.length < 25) {
    var randomNumber = Math.ceil(Math.random() * 25);
    var found = false;
    for (var i = 0; i < numReserve.length; i++) {
      if (numReserve[i] === randomNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      numReserve[numReserve.length] = randomNumber;
    }
  }

  var fillUsers = function () {
    for (var c = 0; c < 25; c++) {
      window.usersPhotos[c] = {
        url: 'photos/' + numReserve[c] + '.jpg',
        description: 'описание фотографии',
        likes: window.randomCase(200, 15),
        comments: []
      };
      window.usersPhotos[c].comments.length = window.randomCase(6, 1);

      for (var b = 0; b < window.usersPhotos[c].comments.length; b++) {
        window.usersPhotos[c].comments[b] = {
          avatar: 'img/avatar-' + window.randomCase(6, 1) + '.svg',
          message: window.commentsToPhotos[window.randomCase(6, 1)],
          name: window.namesAvatars[window.randomCase(6, 1)]
        };
      }
    }
  };

  fillUsers();

  var creatingCopies = function () {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var d = 0; d < window.usersPhotos.length; d++) {
      template.querySelector('.picture__img').src = window.usersPhotos[d].url;
      template.querySelector('.picture__likes').textContent = window.usersPhotos[d].likes;
      template.querySelector('.picture__comments').textContent = window.usersPhotos[d].comments.length;
      var wizardElement = template.cloneNode(true);
      fragment.appendChild(wizardElement);
    }
    window.galleryPhotos.appendChild(fragment);
  };
  creatingCopies();
})();
