'use strict';
window.mainOffer = (function () {
  var TYPES = ['flat', 'house', 'bungalo'];
  var TIMES = ['12', '13', '14'];
  var ROOM_NUMBERS = ['1', '2', '100'];
  var GUEST_CAPACITY = ['0', '3', '3'];
  var HOUSE_PRICES = ['1000', '10000', '0'];
  // При изменении времени заезда устанавливаю время выезда
  var selectCheckin = document.querySelector('#time');
  var selectCheckout = document.querySelector('#timeout');
  var housingType = document.querySelector('#type');
  var housingPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields(selectCheckin, TIMES, selectCheckout, TIMES, syncValues);
  window.synchronizeFields(roomNumber, ROOM_NUMBERS, capacity, GUEST_CAPACITY, syncValues);
  window.synchronizeFields(housingType, TYPES, housingPrice, HOUSE_PRICES, syncValueWithMin);
  function setAddress(x, y) {
    var address = document.querySelector('#address');
    address.value = 'x: ' + x + ', y: ' + y;
  }
  return {
    setAddress: setAddress
  };
})();
