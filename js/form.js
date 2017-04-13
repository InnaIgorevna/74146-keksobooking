'use strict';
(function () {
  // При изменении времени заезда устанавливаю время выезда
  var selectCheckin = document.querySelector('#time');
  var selectCheckout = document.querySelector('#timeout');
  var housingType = document.querySelector('#type');
  var housingPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  selectCheckin.addEventListener('change', function () {
    selectCheckout.value = selectCheckin.value;
  });
  housingType.addEventListener('change', setMinPrice);
  roomNumber.addEventListener('change', setGuestCapacity);
// При выборе квартиры устанавливаю минимальную цену в зависимости от выбора жилья
  function setMinPrice() {
    var minPrice = {
      flat: 1000,
      house: 10000,
      bungalo: 0
    };
    housingPrice.setAttribute('min', minPrice[housingType.value]);
  }
// Сравниваю количество комнат с количеством гостей
  function setGuestCapacity() {
    if (roomNumber.value === '1') {
      capacity.value = 0;
    } else {
      capacity.value = 3;
    }
  }
})();
