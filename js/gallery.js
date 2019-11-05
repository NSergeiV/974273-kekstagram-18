'use strict';

// Модуль. Формирование галереи из неповторяющихся фотографий
(function () {

  window.usersPhotosArray = [];

  window.creatingCopies = function (usersPhotos) {
    // window.galleryPhotos.innerHTML = '';
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    var takeNumber = usersPhotos.length > 25 ? 25 : usersPhotos.length;

    // template.innerHTML = '';
    for (var d = 0; d < takeNumber; d++) {
      var userPhoto = usersPhotos[d];
      template.querySelector('.picture__img').src = userPhoto.url;
      template.querySelector('.picture__likes').textContent = userPhoto.likes;
      template.querySelector('.picture__comments').textContent = userPhoto.comments.length;
      var photoElement = template.cloneNode(true);
      fragment.appendChild(photoElement);
    }
    window.galleryPhotos.appendChild(fragment);
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (data) {
    window.usersPhotosArray = data;
    window.creatingCopies(data);
  };

  window.backend.load(successHandler, window.errorHandler); // Зопуск функции запроса данных с сервера

})();

// Модуль фильтрации фотографий

(function () {
  var buttonFilterPopular = document.querySelector('#filter-popular');
  var buttonFilterRandom = document.querySelector('#filter-random');
  var buttonFilterDiscussed = document.querySelector('#filter-discussed');

  var deletePhoto = function () {
    var containerForImages = document.querySelector('.pictures');
    var togArray = containerForImages.querySelectorAll('a');
    for (var i = 0; i < togArray.length; i++) {
      togArray[i].remove();
    }
  };

  var renderingTimeDelay = window.debounce(function (array) {
    deletePhoto();
    window.creatingCopies(array);
  });

  var onButtonClickPopular = function () {
    buttonFilterPopular.classList.add('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    renderingTimeDelay(window.usersPhotosArray);
  };

  var onButtonClickRandom = function () {
    buttonFilterPopular.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.add('img-filters__button--active');
    var newPhotosArray = [];

    while (newPhotosArray.length < 10) {
      var randomNumber = Math.ceil(Math.random() * (window.usersPhotosArray.length - 1));
      var newElement = window.usersPhotosArray[randomNumber];

      var found = false;

      for (var i = 0; i < newPhotosArray.length; i++) {
        if (newPhotosArray[i].url === newElement.url) {
          found = true;
          break;
        }
      }

      if (!found) {
        newPhotosArray[newPhotosArray.length] = newElement;
      }
    }

    renderingTimeDelay(newPhotosArray);
  };

  var onButtonClickDiscussed = function () {
    buttonFilterPopular.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    var getRank = function (wizard) {
      var rank = 0;
      rank = wizard.comments.length;
      return rank;
    };

    renderingTimeDelay(window.usersPhotosArray.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.usersPhotosArray.indexOf(left) - window.usersPhotosArray.indexOf(right);
      }
      return rankDiff;
    })
    );
  };

  buttonFilterPopular.addEventListener('click', onButtonClickPopular);
  buttonFilterRandom.addEventListener('click', onButtonClickRandom);
  buttonFilterDiscussed.addEventListener('click', onButtonClickDiscussed);
})();
