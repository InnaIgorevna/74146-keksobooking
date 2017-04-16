'use strict';
(function () {
  // Мы пробегаем по массиву с объявлениями квартиры, получаем pin с нужными данными. Накапливаем во фрагменте(буфере) пины,
// а потом их всех добавляем на карту
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.offers.data.length; i++) {
    fragment.appendChild(window.pin.createPin(window.offers.data[i].location.x, window.offers.data[i].location.y, window.offers.data[i].author.avatar, i));
  }
  pinMap.appendChild(fragment);
  // Активируем первый пин
  window.pin.activatePin(document.querySelector('.pin[data-id="0"]'));
  function activatePinAndShowInfo(pin) {
    window.pin.activatePin(pin);
    // Отображаем левый блок с информацией объявления выбранного pin
    window.card.showLodgeInfo(window.offers.data[window.pin.getActivePin().getAttribute('data-id')]);
  }
  // добавляем обработчик событий на карту.Если нажат ENTER на картинке пина - активируем пин
  pinMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.offers.ENTER_KEY_CODE && evt.target.parentNode.classList.contains('pin')) {
      activatePinAndShowInfo(evt.target.parentNode);
    }
  });
  var map = document.querySelector('.tokyo');
  map.addEventListener('click', function (evt) {
    // Отслеживаем клик на блок .pin или на блок у родителя которого есть класс pin
    if (evt.target.classList.contains('pin') || evt.target.parentNode.classList.contains('pin')) {
      if (evt.target.classList.contains('pin')) {
        activatePinAndShowInfo(evt.target);
      } else {
        activatePinAndShowInfo(evt.target.parentNode);
      }
    }
  });
  var mainPinWidth = 74;
  var mainPinHeight = 94;
  var mainPin = document.querySelector('.pin__main');
  mainPin.addEventListener('mousedown', function (evt) {
    window.card.hideDialog();
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var y = mainPin.offsetTop - shift.y;
      var x = mainPin.offsetLeft - shift.x;
      var mainPinPikeX = x + mainPinWidth / 2;
      var mainPinPikeY = y + mainPinHeight;
      var maxMapX = 1200;
      var maxMapY = 665;
      if (mainPinPikeX > 0 && mainPinPikeX < maxMapX) {
        mainPin.style.left = x + 'px';
      }
      if (mainPinPikeY > 0 && mainPinPikeY < maxMapY) {
        mainPin.style.top = y + 'px';
      }
      window.mainOffer.setAddress(mainPinPikeX, mainPinPikeY);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
