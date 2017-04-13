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
    window.showLodgeInfo(window.offers.data[window.pin.getActivePin().getAttribute('data-id')]);
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
})();
