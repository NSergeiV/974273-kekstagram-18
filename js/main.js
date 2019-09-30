'use strict';

var usersPhotos = [];
var commentsToPhotos = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var namesAvatars = ['Артем', 'Василий', 'Николай', 'Александор', 'Олег', 'Тимофовей'];

var randomCase = function (max, min) {
  var math = Math.floor(Math.random() * (max - min) + min);
  return math;
};

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
    usersPhotos[c] = {
      url: 'photos/' + numReserve[c] + '.jpg',
      description: 'описание фотографии',
      likes: randomCase(200, 15),
      comments: []
    };
    usersPhotos[c].comments.length = randomCase(6, 1);

    for (var b = 0; b < usersPhotos[c].comments.length; b++) {
      usersPhotos[c].comments[b] = {
        avatar: 'img/avatar-' + randomCase(6, 1) + '.svg',
        message: commentsToPhotos[randomCase(6, 1)],
        name: namesAvatars[randomCase(6, 1)]
      };
    }
  }
};

fillUsers();

var creatingCopies = function () {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var galleryPhotos = document.querySelector('.pictures');

  for (var d = 0; d < usersPhotos.length; d++) {
    template.querySelector('.picture__img').src = usersPhotos[d].url;
    template.querySelector('.picture__likes').textContent = usersPhotos[d].likes;
    template.querySelector('.picture__comments').textContent = usersPhotos[d].comments.length;

    var wizardElement = template.cloneNode(true);

    fragment.appendChild(wizardElement);
  }

  galleryPhotos.appendChild(fragment);
};

creatingCopies();
