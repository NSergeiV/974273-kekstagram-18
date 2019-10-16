'use strict';

// Модуль валидации формы редактирования фото.
(function () {
  window.hashTagsFoImage.addEventListener('input', function (evt) {
    var input = evt.target;
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
          input.setCustomValidity('В хеш-теге пробел недопустим.');
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

  // Валидация поля комментарии к фотографии
  window.commentFoImage.addEventListener('input', function (evt) {
    var input = evt.target;
    var lengthComment = input.value.split('');
    if (lengthComment.length > 140) {
      input.setCustomValidity('Комментарии не может состоять больше 140 символов.');
    } else {
      input.setCustomValidity('');
    }
  });
})();
