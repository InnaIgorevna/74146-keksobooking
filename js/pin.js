'use strict';
(function () {
// Возращаем <div class"pin"></div> c внутренними данными
  window.createPin = function (x, y, src, id) {
    var pin = document.createElement('div');
    var pinWidth = 56;
    var pinHeight = 75;
    pin.className = 'pin';
    pin.style = 'left:' + (x + pinWidth / 2) + 'px; top:' + (y + pinHeight) + 'px';
    pin.innerHTML = '<img src="' + src + '" class="rounded" tabindex="0">';
    pin.setAttribute('data-id', id);
    return pin;
  };
  window.getActivePin = function () {
    return document.querySelector('.pin--active');
  };
  window.activatePin = function (elem) {
    // деактивируем активный пин
    window.deactivatePin();
    // Новому pin ставим класс pin--active
    elem.classList.add('pin--active');
  };
  window.deactivatePin = function () {
    if (window.getActivePin()) {
      window.getActivePin().classList.remove('pin--active');
    }
  };
})();
