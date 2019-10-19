'use strict';

// Модуль редактирования фотографии
(function () {
  var popapImgUploadOverlay = document.querySelector('.img-upload__overlay');
  var popapImgUploadPreview = popapImgUploadOverlay.querySelector('.img-upload__preview');
  var ingBigPopap = popapImgUploadPreview.querySelector('img');
  var buttonTransformEfftctImage = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var fotosEffect = document.querySelector('.img-upload__effects');
  var blockListFotosEffect = fotosEffect.querySelector('.effects__list');
  var bigPicture = document.querySelector('.img-upload__wrapper');
  var iconPercentBigPicture = bigPicture.querySelector('.img-upload__scale');
  var buttonRegulationEffectMinus = iconPercentBigPicture.querySelector('.scale__control--smaller');
  var buttonRegulationEffectPlus = iconPercentBigPicture.querySelector('.scale__control--bigger');
  var numberIconPercentBigPicture = iconPercentBigPicture.querySelector('input[name="scale"]');
  var iconSliderBigPicture = bigPicture.querySelector('.img-upload__effect-level');

  var filterName;
  var scaleFoto = 1;

  iconPercentBigPicture.classList.add('hidden');
  iconSliderBigPicture.classList.add('hidden');
  numberIconPercentBigPicture.value = '100%';

  var buttonTransformEffectImagePosition = function () {
    iconPercentBigPicture.classList.remove('hidden');
    iconSliderBigPicture.classList.remove('hidden');
    buttonTransformEfftctImage.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    numberIconPercentBigPicture.value = '100%';
    ingBigPopap.style.transform = 'scale(' + 1 + ')';
  };

  var clickFotoEffectFirst = function () {
    iconPercentBigPicture.classList.add('hidden');
    iconSliderBigPicture.classList.add('hidden');
  };

  // ----- Выбираем эффект для фотки

  var onClickFotoEffect = function (evt) {
    var elem = evt.target;
    if (elem.matches('input[id="effect-none"]')) {
      clickFotoEffectFirst();
      popapImgUploadPreview.style.filter = null;
    }

    if (elem.matches('input[id="effect-chrome"]')) {
      buttonTransformEffectImagePosition();
      popapImgUploadPreview.style.filter = 'grayscale(' + 1 + ')';
      filterName = 'grayscale';
    }

    if (elem.matches('input[id="effect-sepia"]')) {
      buttonTransformEffectImagePosition();
      popapImgUploadPreview.style.filter = 'sepia(' + 1 + ')';
      filterName = 'sepia';
    }

    if (elem.matches('input[id="effect-marvin"]')) {
      buttonTransformEffectImagePosition();
      popapImgUploadPreview.style.filter = 'invert(' + 100 + '%)';
      filterName = 'invert';
    }

    if (elem.matches('input[id="effect-phobos"]')) {
      buttonTransformEffectImagePosition();
      popapImgUploadPreview.style.filter = 'blur(' + 3 + 'px)';
      filterName = 'blur';
    }

    if (elem.matches('input[id="effect-heat"]')) {
      buttonTransformEffectImagePosition();
      popapImgUploadPreview.style.filter = 'brightness(' + 3 + ')';
      filterName = 'brightness';
    }
  };

  blockListFotosEffect.addEventListener('click', onClickFotoEffect);

  // ---- Конец выбора эффекта для фотки

  // ---- Выбор масштба масштаба фотки с интервалом 25

  var onScaleDown = function () {

    if (scaleFoto <= 0.25) {
      buttonRegulationEffectMinus.removeEventListener('mouseup', onScaleDown);
    } else {
      buttonRegulationEffectPlus.addEventListener('mouseup', onScaleAdd);
      ingBigPopap.style.transform = 'scale(' + (scaleFoto - 0.25) + ')';
      scaleFoto = scaleFoto - 0.25;
      numberIconPercentBigPicture.value = (scaleFoto * 100) + '%';
    }
  };

  var onScaleAdd = function () {
    if (scaleFoto > 0.75) {
      buttonRegulationEffectPlus.removeEventListener('mouseup', onScaleAdd);
    } else {
      buttonRegulationEffectMinus.addEventListener('mouseup', onScaleDown);
      ingBigPopap.style.transform = 'scale(' + (scaleFoto + 0.25) + ')';
      scaleFoto = scaleFoto + 0.25;
      numberIconPercentBigPicture.value = (scaleFoto * 100) + '%';
    }
  };

  buttonRegulationEffectMinus.addEventListener('mouseup', onScaleDown);
  buttonRegulationEffectPlus.addEventListener('mouseup', onScaleAdd);

  // --- Конец выбора масштба фотки

  // --- Захват и перетаскивание слайдера

  buttonTransformEfftctImage.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var coordLevelLine = {
      start: Math.floor(effectLevelLine.getBoundingClientRect().left),
      end: Math.floor(effectLevelLine.getBoundingClientRect().left) + 453
    };
    var startCoords = {
      x: (evt.clientX - evt.offsetX) + 9,
      set: evt.offsetX + 9
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var offsetCoord = {
        x: moveEvt.clientX
      };

      if (offsetCoord.x <= coordLevelLine.end) {
        if (coordLevelLine.start <= offsetCoord.x) {
          var shift = {
            x: startCoords.x - offsetCoord.x
          };

          startCoords.x = moveEvt.clientX;

          buttonTransformEfftctImage.style.left = (buttonTransformEfftctImage.offsetLeft - shift.x) + 'px';
          effectLevelDepth.style.width = Math.floor((buttonTransformEfftctImage.offsetLeft - shift.x) / (453 / 100)) + '%';
          var percentEffectFoto = Math.floor((buttonTransformEfftctImage.offsetLeft - shift.x) / (453 / 100));

          if (filterName === 'grayscale') {
            popapImgUploadPreview.style.filter = 'grayscale(' + ((1 / 100) * (percentEffectFoto)) + ')';
          }
          if (filterName === 'sepia') {
            popapImgUploadPreview.style.filter = 'sepia(' + ((1 / 100) * (percentEffectFoto)) + ')';
          }
          if (filterName === 'invert') {
            popapImgUploadPreview.style.filter = 'invert(' + percentEffectFoto + '%)';
          }
          if (filterName === 'blur') {
            popapImgUploadPreview.style.filter = 'blur(' + ((3 / 100) * (percentEffectFoto)) + 'px)';
          }
          if (filterName === 'brightness') {
            popapImgUploadPreview.style.filter = 'brightness(' + (3 - ((2 / 100) * (100 - percentEffectFoto))) + ')';
          }
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      buttonTransformEfftctImage.removeEventListener('mousemove', onMouseMove);
      buttonTransformEfftctImage.removeEventListener('mouseup', onMouseUp);
    };

    buttonTransformEfftctImage.addEventListener('mousemove', onMouseMove);
    buttonTransformEfftctImage.addEventListener('mouseup', onMouseUp);
  });

  // ---- Конец захвата и перетаскивания слайдера

})();
