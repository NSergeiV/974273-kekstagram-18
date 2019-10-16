'use strict';

// Модуль редактирования фотографии
(function () {
  var buttonTransformEfftctImage = document.querySelector('.effect-level__pin');

  var onButtonTransformEffectImagePosition = function () {
    buttonTransformEfftctImage.style.left = '100%';
  };

  buttonTransformEfftctImage.addEventListener('mouseup', onButtonTransformEffectImagePosition);
})();
