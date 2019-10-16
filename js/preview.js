'use strict';

// модуль для отрисовки увеличенного изображения из галереи.
(function () {
  var bigFoto = function (big) {
    window.bigPicture.classList.remove('hidden');

    var elementFoto = big.url;
    var elementPictureLikes = big.likes;

    var bigPictureImg = window.bigPicture.querySelector('.big-picture__img');
    var bigImg = bigPictureImg.querySelector('img');
    var bigPictureLikesCount = window.bigPicture.querySelector('.likes-count');
    var bigPictureSocialCommentCount = window.bigPicture.querySelector('.social__comment-count');
    var bigPictureComments = window.bigPicture.querySelector('.comments-count');
    var bigPictureSocialComments = window.bigPicture.querySelector('.social__comments');
    var socialCommentItemBigPicture = document.querySelector('.social__comment');
    var socialCommentItemPicture = socialCommentItemBigPicture.querySelector('.social__picture');
    var socialCommentItemText = socialCommentItemBigPicture.querySelector('.social__text');
    var allCommentBigPucture = bigPictureSocialComments.querySelectorAll('li');
    var socialHeaderBigPicture = window.bigPicture.querySelector('.social__header');
    var descriptionBigPicture = socialHeaderBigPicture.querySelector('.social__caption');
    var buttonCommentsLoader = window.bigPicture.querySelector('.comments-loader');
    bigPictureSocialComments.removeChild(allCommentBigPucture[0]);
    bigPictureSocialComments.removeChild(allCommentBigPucture[1]);

    descriptionBigPicture.textContent = big.description;
    bigImg.src = elementFoto;
    bigPictureLikesCount.textContent = elementPictureLikes;
    bigPictureComments.textContent = big.comments.length;
    bigPictureSocialCommentCount.classList.add('visually-hidden');
    buttonCommentsLoader.classList.add('visually-hidden');

    for (var e = 0; e < big.comments.length; e++) {
      socialCommentItemPicture.src = big.comments[e].avatar;
      socialCommentItemText.textContent = big.comments[e].message;

      var wizardElement = socialCommentItemBigPicture.cloneNode(true);
      bigPictureSocialComments.appendChild(wizardElement);
    }
  };

  // Обработчик события клика по фотографии и вывод ее в большой формат

  var closeBigUserPgotoFocusEsc = function (evt) {
    if (evt.keyCode === window.KEY_ESC) {
      closeBigUserPgoto();
    }
  };

  var openBigUserPgoto = function (evt) {
    var clicFoto = evt.target.closest('a');
    var elements = window.galleryPhotos.querySelectorAll('.picture');
    for (var b = 0; b < elements.length; b++) {
      var element = elements[b];
      if (clicFoto === element) {
        var elementFotoUrl = element.querySelector('.picture__img').src;
        var re = /\/[0-9]?[0-9]/g;
        var elementMatch = elementFotoUrl.match(re);
        var cloneUrl = elementFotoUrl.replace(elementFotoUrl, 'photos' + elementMatch[0] + '.jpg');
        for (var c = 0; c < window.usersPhotos.length; c++) {
          if (cloneUrl === window.usersPhotos[c].url) {
            var infoUserPhoto = window.usersPhotos[c];
          }
        }
        bigFoto(infoUserPhoto);
      }
    }

    document.addEventListener('keydown', closeBigUserPgotoFocusEsc);
  };

  var closeBigUserPgoto = function () {
    window.bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', closeBigUserPgotoFocusEsc);
  };

  window.galleryPhotos.addEventListener('click', openBigUserPgoto);
  window.bigPictureCloseButton.addEventListener('click', closeBigUserPgoto);
})();
