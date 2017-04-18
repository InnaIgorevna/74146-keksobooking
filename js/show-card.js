'use strict';
window.showCard = (function (elem, showFunc, closeFunc, closeElem) {
  showFunc();
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.offers.ESC_KEY_CODE) {
      closeFunc();
    }
  });
  // добавляем обработчик событий на крестик диалога нажатие ENTER
  closeElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.offers.ENTER_KEY_CODE) {
      closeFunc();
    }
  });
  // Обработчик событий на клик по крестику
  closeElem.addEventListener('click', function () {
    closeFunc();
  });
});
