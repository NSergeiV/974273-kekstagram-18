'use strict';
// Модуль загрузки файла и открытия, закрытия формы редоктирования фото.
(function () {
  var iconFotoDownload = document.querySelector('#upload-file');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var imageEditingFormButtonClose = document.querySelector('#upload-cancel');
  var hashTagsFoImage = document.querySelector('input[name="hashtags"]');
  var commentFoImage = document.querySelector('textarea[name="description"]');

  window.hashTagsFoImage = hashTagsFoImage;
  window.commentFoImage = commentFoImage;

  var onImageEditingFormCloseEsc = function (evt) {
    if (evt.keyCode === window.KEY_ESC) {
      if (hashTagsFoImage !== document.activeElement) {
        if (commentFoImage !== document.activeElement) {
          onImageEditingFormClose();
        }
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
      if (evt.keyCode === window.KEY_ENTER) {
        evt.preventDefault();
      }
    }
  };

  iconFotoDownload.addEventListener('change', onImageEditingFormOpen);
  imageEditingFormButtonClose.addEventListener('click', onImageEditingFormClose);
  document.addEventListener('keydown', onHashTagsFoImageFocusNotSubmit, false);
})();
