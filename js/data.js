'use strict';
(function () {
  window.ESC_KEY_CODE = 27;
  window.ENTER_KEY_CODE = 13;
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от мор',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  // Возвращает рандомное целое число oт min до max
  window.getRandom = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };
// Возвращает рандомный элемет массива
  window.getRandomArrayElement = function (arr) {
    return arr[window.getRandom(0, arr.length)];
  };
  // Возвращаем массив удобст(FEATURES) квартиры, в рандомном количестве
  function getRandomFeatures(arr) {
    var rand = window.getRandom(0, arr.length + 1);
    var feat = [];
    var cur = 0;
    while (cur < rand) {
      var f = window.getRandomArrayElement(arr);
      if (feat.indexOf(f) === -1) {
        feat.push(f);
        cur++;
      }
    }
    return feat;
  }
  // массив объектов объявления о сдачи квартиры
  var OFFER_COUNT = 8;
  var MAX_GUEST_COUNT = 8;
  var MAX_ROOM_COUNT = 5;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var arr = [];
  for (var i = 0; i < OFFER_COUNT; i++) {
    var x = window.getRandom(MIN_X, MAX_X + 1);
    var y = window.getRandom(MIN_Y, MAX_Y + 1);
    arr.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: x + ', ' + y,
        price: window.getRandom(MIN_PRICE, MAX_PRICE + 1),
        type: window.getRandomArrayElement(TYPES),
        rooms: window.getRandom(1, MAX_ROOM_COUNT + 1),
        guests: window.getRandom(1, MAX_GUEST_COUNT + 1),
        checkin: window.getRandomArrayElement(TIMES),
        checkout: window.getRandomArrayElement(TIMES),
        features: getRandomFeatures(FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  window.offers = arr;
})();
