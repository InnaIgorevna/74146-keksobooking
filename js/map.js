'use strict';

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

var OFFER_COUNT = 8;
var MAX_GUEST_COUNT = 8;
var MAX_ROOM_COUNT = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
// Возвращает рандомное целое число oт min до max
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
// Возвращает рандомный элемет массива
function getRandomArrayElement(arr) {
  return arr[getRandom(0, arr.length - 1)];
}
// Возвращаем массив удобст(FEATURES) квартиры, в рандомном количестве
function getRandomFeatures() {
  var rand = getRandom(0, FEATURES.length);
  var feat = [];
  var cur = 0;
  while (cur < rand) {
    var f = getRandomArrayElement(FEATURES);
    if (feat.indexOf(f) === -1) {
      feat.push(f);
      cur++;
    }
  }
  return feat;
}
// Возвращает массив объектов объявления о сдачи квартиры
function createOffers() {
  var arr = [];
  for (var i = 0; i < OFFER_COUNT; i++) {
    var x = getRandom(MIN_X, MAX_X);
    var y = getRandom(MIN_Y, MAX_Y);
    arr.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: x + ', ' + y,
        price: getRandom(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayElement(TYPES),
        rooms: getRandom(1, MAX_ROOM_COUNT),
        guests: getRandom(1, MAX_GUEST_COUNT),
        checkin: getRandomArrayElement(TIMES),
        checkout: getRandomArrayElement(TIMES),
        features: getRandomFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  return arr;
}
// Возращаем <div class"pin"></div> c внутренними данными
function createPin(x, y, src) {
  var pin = document.createElement('div');
  var pinWidth = 56;
  var pinHeight = 75;
  pin.className = 'pin';
  pin.style = 'left:' + (x + pinWidth / 2) + 'px; top:' + (y + pinHeight) + 'px';
  pin.innerHTML = '<img src="' + src + '" class="rounded" width="40" height="40">';
  return pin;
}
// Мы пробегаем по массиву с объявлениями квартиры, получаем pin с нужными данными. Накапливаем во фрагменте(буфере) пины,
// а потом их всех добавляем на карту
function showPins(offers) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i].location.x, offers[i].location.y, offers[i].author.avatar));
  }
  pinMap.appendChild(fragment);
}
// Возвращает строчку в правельном склонении
function getGuestRoomString(guests, rooms) {
  var guestsString;
  var roomsString;
  if (guests === 1) {
    guestsString = 'гостя';
  } else {
    guestsString = 'гостей';
  }
  if (rooms === 1) {
    roomsString = 'комнате';
  } else {
    roomsString = 'комнатах';
  }
  return 'Для ' + guests + ' ' + guestsString + ' в ' + rooms + ' ' + roomsString;
}
// Возвращает наименование типа на русском языке
function getLodgeTypeName(typeLodge) {
  var nameLodge = '';
  switch (typeLodge) {
    case 'flat':
      nameLodge = 'Квартира';
      break;
    case 'house':
      nameLodge = 'Дом';
      break;
    case 'bungalo':
      nameLodge = 'Бунгало';
      break;
    default:
      nameLodge = 'Неизвестный тип';
  }
  return nameLodge;
}
// Возвращает блок информации о квартире с заполнеными данными
function getLodgeInfoDialog(lodge) {
  var lodgeInfoElement = document.querySelector('#lodge-template').content.cloneNode(true);
  lodgeInfoElement.querySelector('.lodge__title').textContent = lodge.offer.title;
  lodgeInfoElement.querySelector('.lodge__address').textContent = lodge.offer.address;
  lodgeInfoElement.querySelector('.lodge__price').textContent = lodge.offer.price + '₽/ночь';
  lodgeInfoElement.querySelector('.lodge__type').textContent = getLodgeTypeName(lodge.offer.type);
  lodgeInfoElement.querySelector('.lodge__rooms-and-guests').textContent = getGuestRoomString(lodge.offer.guests, lodge.offer.rooms);
  lodgeInfoElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
  for (var i = 0; i < lodge.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + lodge.offer.features[i];
    lodgeInfoElement.querySelector('.lodge__features').appendChild(span);
  }
  lodgeInfoElement.querySelector('.lodge__description').textContent = lodge.offer.description;
  return lodgeInfoElement;
}
// Показываем блок информации о квартире
function showLodgeInfo(lodge) {
  var offerDialog = document.querySelector('#offer-dialog');
  offerDialog.removeChild(offerDialog.querySelector('.dialog__panel'));
  offerDialog.appendChild(getLodgeInfoDialog(lodge));
  offerDialog.querySelector('.dialog__title img').src = lodge.author.avatar;
}

var offers = createOffers();
showPins(offers);
showLodgeInfo(offers[0]);
