'use strict';
window.pin = (function () {
// Возращаем <div class"pin"></div> c внутренними данными
  var createPin = function (x, y, src, id) {
    var pin = document.createElement('div');
    var pinWidth = 56;
    var pinHeight = 75;
    pin.className = 'pin';
    pin.style = 'left:' + (x + pinWidth / 2) + 'px; top:' + (y + pinHeight) + 'px';
    pin.innerHTML = '<img src="' + src + '" class="rounded" tabindex="0">';
    pin.setAttribute('data-id', id);
    return pin;
  };
  var getActivePin = function () {
    return document.querySelector('.pin--active');
  };
  var activatePin = function (elem) {
    // деактивируем активный пин
    deactivatePin();
    // Новому pin ставим класс pin--active
    elem.classList.add('pin--active');
  };
  var deactivatePin = function () {
    if (getActivePin()) {
      getActivePin().classList.remove('pin--active');
    }
  };
  return {
    createPin: createPin,
    getActivePin: getActivePin,
    activatePin: activatePin,
    deactivatePin: deactivatePin
  };
})();
