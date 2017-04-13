'use strict';
window.offers = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
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
  var getRandom = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };
// Возвращает рандомный элемет массива
  var getRandomArrayElement = function (arr) {
    return arr[getRandom(0, arr.length)];
  };
  // Возвращаем массив удобст(FEATURES) квартиры, в рандомном количестве
  function getRandomFeatures(arr) {
    var rand = getRandom(0, arr.length + 1);
    var feat = [];
    var cur = 0;
    while (cur < rand) {
      var f = getRandomArrayElement(arr);
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
    var x = getRandom(MIN_X, MAX_X + 1);
    var y = getRandom(MIN_Y, MAX_Y + 1);
    arr.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: x + ', ' + y,
        price: getRandom(MIN_PRICE, MAX_PRICE + 1),
        type: getRandomArrayElement(TYPES),
        rooms: getRandom(1, MAX_ROOM_COUNT + 1),
        guests: getRandom(1, MAX_GUEST_COUNT + 1),
        checkin: getRandomArrayElement(TIMES),
        checkout: getRandomArrayElement(TIMES),
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
  return {
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    getRandom: getRandom,
    getRandomArrayElement: getRandomArrayElement,
    data: arr
  };
})();
