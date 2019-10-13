'use strict';

// Отображение похожих объявлений и фотографий других пользователей

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

// Показ фотографии в увеличенном виде (превью)

var bigFoto = function () {
  var bigPicture = document.querySelector('.big-picture');
  // bigPicture.classList.remove('hidden');

  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigImg = bigPictureImg.querySelector('img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureComments = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var socialCommentItemBigPicture = document.querySelector('.social__comment');
  var socialCommentItemPicture = socialCommentItemBigPicture.querySelector('.social__picture');
  var socialCommentItemText = socialCommentItemBigPicture.querySelector('.social__text');
  var allCommentBigPucture = bigPictureSocialComments.querySelectorAll('li');
  var socialHeaderBigPicture = bigPicture.querySelector('.social__header');
  var descriptionBigPicture = socialHeaderBigPicture.querySelector('.social__caption');
  var buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
  bigPictureSocialComments.removeChild(allCommentBigPucture[0]);
  bigPictureSocialComments.removeChild(allCommentBigPucture[1]);

  descriptionBigPicture.textContent = usersPhotos[0].description;
  bigImg.src = usersPhotos[0].url;
  bigPictureLikesCount.textContent = usersPhotos[0].likes;
  bigPictureComments.textContent = usersPhotos[0].comments.length;
  bigPictureSocialCommentCount.classList.add('visually-hidden');
  buttonCommentsLoader.classList.add('visually-hidden');

  for (var e = 0; e < usersPhotos[0].comments.length; e++) {
    socialCommentItemPicture.src = usersPhotos[0].comments[e].avatar;
    socialCommentItemText.textContent = usersPhotos[0].comments[e].message;

    var wizardElement = socialCommentItemBigPicture.cloneNode(true);
    bigPictureSocialComments.appendChild(wizardElement);
  }
};

bigFoto();

// Загрузка и закрытие попапа изображения

var iconFotoDownload = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var imageEditingFormButtonClose = document.querySelector('#upload-cancel');
var buttonTransformEfftctImage = document.querySelector('.effect-level__pin');
var hashTagsFoImage = document.querySelector('input[name="hashtags"]');

var KEY_ESC = 27;
var KEY_ENTER = 13;

var onImageEditingFormCloseEsc = function (evt) {
  if (evt.keyCode === KEY_ESC) {
    if (hashTagsFoImage !== document.activeElement) {
      onImageEditingFormClose();
    }
  }
};

var onImageEditingFormOpen = function () {
  imageEditingForm.classList.remove('hidden');
  document.addEventListener('keydown', onImageEditingFormCloseEsc);
};

var onImageEditingFormClose = function () {
  imageEditingForm.classList.add('hidden');
  document.removeEventListener('keydown', onImageEditingFormCloseEsc);
  document.querySelector('input[name="filename"]').value = null;
};

var onHashTagsFoImageFocusNotSubmit = function (evt) {
  if (hashTagsFoImage === document.activeElement) {
    if (evt.keyCode === KEY_ENTER) {
      evt.preventDefault();
    }
  }
};

iconFotoDownload.addEventListener('change', onImageEditingFormOpen);
imageEditingFormButtonClose.addEventListener('click', onImageEditingFormClose);

// Валидация формы отправки хеш-тегов к фотографии

document.addEventListener('keydown', onHashTagsFoImageFocusNotSubmit, false);
hashTagsFoImage.addEventListener('input', function (evt) {
  var input = evt.target;
  // var arr1 = input.value.split('');
  var arr2 = input.value.split('#');

  // Перебираем и ищим заданный элемент
  var countingSymbols = function (symbol) {
    return input.value.match(symbol);
  };

  // Создаем массив и разделяем на хеш-теги для проверки валидации
  var shortArrayHashtags = function (shortHashTag) {

    var re = shortHashTag;
    var option = true;

    for (var b = 1; b < arr2.length; b++) {
      var elem = arr2[b];
      if (!elem.match(re)) {
        option = false;
      }
    }
    return option;
  };

  var spaceInHashtags = function (space) {
    var re = space;
    var option = true;
    for (var b = 1; b < arr2.length; b++) {
      var elem = arr2[b];
      if (re.test(elem)) {
        option = false;
      }
    }
    return option;
  };
  // Проверяет в массиве каждый хеш-тег на максимальное количество символов
  var longArrayHashtags = function (longHashTag) {
    var value = true;
    for (var b = 1; b < arr2.length; b++) {
      var elem = arr2[b].replace(/\s/g, '');
      var arrSplit = elem.split('');
      if (longHashTag < arrSplit.length) {
        value = false;
      }
    }
    return value;
  };

  // Это поиск похожих хеш-тегов
  var cloneArrayHashtags = function () {
    var option = true;
    for (var c = 1; c < arr2.length; c++) {
      var re = /(\w+)\s/;
      var element1 = arr2[c].replace(re, '$1');
      for (var d = c + 1; d < arr2.length; d++) {
        var ree = /(\w+)\s?/;
        var element2 = arr2[d].replace(ree, '$1');
        if (element1.toLowerCase() === element2.toLowerCase()) {
          option = false;
        }
      }
    }

    return option;
  };

  if (!input.value.match(/^#\w+/g)) {
    input.setCustomValidity('В начале хеш-тега должна стаять - # или не хватает символа');
  } else {
    if (countingSymbols(/#/g).length === 1) {
      if (!input.value.match(/^#/g)) {
        input.setCustomValidity('В начале хеш-тега должно стаять - #');
      } else if (!input.value.match(/^#\w+/g)) {
        input.setCustomValidity('Хеш-тег меньше двух символов');
      } else if (input.value.match(/\w+\s\w+/g)) {
        input.setCustomValidity('Хеш-тег не может содержать пробелов');
      } else if (countingSymbols(/\w/g).length > 20) {
        input.setCustomValidity('Хеш-тег не может быть длиннее 20 символов.');
      } else {
        input.setCustomValidity('');
      }
    } else {
      if (input.value.match(/##/g)) {
        input.setCustomValidity('Разделите ##');
      } else if (input.value.match(/\w+#/g)) {
        input.setCustomValidity('Хеш-теги не разделены пробелами');
      } else if (countingSymbols(/#/g).length > 5) {
        input.setCustomValidity('Хеш-тегов не может быть больше пяти.');
      } else if (shortArrayHashtags(/(\w+)/g) === false) {
        input.setCustomValidity('Хеш-тег не может состоять из одной #');
      } else if (spaceInHashtags(/(\s\w)(?:\s$)?/g) === false) {
        input.setCustomValidity('Хеш-тег пробел');
      } else if (longArrayHashtags(19) === false) {
        input.setCustomValidity('Хеш-тег не может состоять больше 20 символов.');
      } else if (cloneArrayHashtags() === false) {
        input.setCustomValidity('У Вас одинаковые хеш-теги.');
      } else {
        input.setCustomValidity('');
      }
    }
  }
});

// Изменение уровня эффекта фотографии

var onButtonTransformEffectImagePosition = function () {
  buttonTransformEfftctImage.style.left = '100%';
};

buttonTransformEfftctImage.addEventListener('mouseup', onButtonTransformEffectImagePosition);
