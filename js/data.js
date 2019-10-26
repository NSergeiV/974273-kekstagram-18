'use strict';

// Модуль формирование данных глобальной видимости
(function () {
  window.usersPhotos = [];
  window.commentsToPhotos = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  window.namesAvatars = ['Артем', 'Василий', 'Николай', 'Александор', 'Олег', 'Тимофовей'];
  window.bigPicture = document.querySelector('.big-picture');
  window.bigPictureCloseButton = window.bigPicture.querySelector('.big-picture__cancel');
  window.galleryPhotos = document.querySelector('.pictures');

  var KEY_ESC = 27;
  var KEY_ENTER = 13;

  window.KEY_ESC = KEY_ESC;
  window.KEY_ENTER = KEY_ENTER;

  window.randomCase = function (max, min) {
    var math = Math.floor(Math.random() * (max - min) + min);
    return math;
  };

  // Модуль закрытия попапа сообщений с сервера
  (function () {
    window.closePopapInform = function (main, board) {
      var onEscClose = function (evt) {
        if (evt.keyCode === window.KEY_ESC) {
          onBlockSuccessClose();
        }
      };

      var onButtonClick = function (evt) {
        var elem = evt.target;
        if (elem.matches('button[type="button"]')) {
          onBlockSuccessClose();
        }
      };

      var onMouseDownPage = function (evt) {
        var elem = evt.target;
        if (elem.matches('section')) {
          onBlockSuccessClose();
        }
      };

      var onBlockSuccessClose = function () {
        main.removeChild(board);
        document.addEventListener('click', onButtonClick);
        document.removeEventListener('mousedown', onMouseDownPage);
        document.removeEventListener('keydown', onEscClose);
      };

      document.addEventListener('click', onButtonClick);
      document.addEventListener('mousedown', onMouseDownPage);
      document.addEventListener('keydown', onEscClose);
    };
  })();
  // Конец модуля сообщений

  // Модуль открытия и закрытия попап сообщений об ошибки загрузки данных
  window.errorHandler = function (errorMessage) {
    var blockMain = document.querySelector('main');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    templateError.querySelector('.error__title').textContent = errorMessage;
    blockMain.appendChild(templateError.cloneNode(true));
    var elementTemplateError = document.querySelector('.error');

    window.closePopapInform(blockMain, elementTemplateError);
  };
})();

// Модуль открытия и закрытия попап об удачной отправке файла на сервер
(function () {

  window.successfulSubmission = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var blockMain = document.querySelector('main');
    blockMain.appendChild(templateSuccess.cloneNode(true));
    var elementTemplateSuccess = document.querySelector('.success');

    window.closePopapInform(blockMain, elementTemplateSuccess);
  };
})();
// Конец модуля удачной отправки
