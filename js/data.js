'use strict';

// Модуль формирование данных
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
})();
