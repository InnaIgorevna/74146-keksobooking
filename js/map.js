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


// Возвращает рандомное целое число oт min до max
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
// Возвращает рандомный элемет массива
function getRandomArrayElement(arr) {
  return arr[getRandom(0, arr.length)];
}
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
// Возвращает массив объектов объявления о сдачи квартиры
function createOffers() {
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
  return arr;
}
// Возращаем <div class"pin"></div> c внутренними данными
function createPin(x, y, src, id) {
  var pin = document.createElement('div');
  var pinWidth = 56;
  var pinHeight = 75;
  pin.className = 'pin';
  pin.style = 'left:' + (x + pinWidth / 2) + 'px; top:' + (y + pinHeight) + 'px';
  pin.innerHTML = '<img src="' + src + '" class="rounded" tabindex="0">';
  pin.setAttribute('data-id', id);
  return pin;
}
// Мы пробегаем по массиву с объявлениями квартиры, получаем pin с нужными данными. Накапливаем во фрагменте(буфере) пины,
// а потом их всех добавляем на карту
function showPins(offers) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i].location.x, offers[i].location.y, offers[i].author.avatar, i));
  }
  pinMap.appendChild(fragment);
}
// Возвращает строчку в правельном склонении
function getGuestRoomString(guests, rooms) {
  var guestsString;
  var roomsString;
  var dict = {
    guest: {
      single: 'гостя',
      plural: 'гостей'
    },
    room: {
      single: 'комнате',
      plural: 'комнатах'
    }
  };
  if (guests === 1) {
    guestsString = dict.guest.single;
  } else {
    guestsString = dict.guest.plural;
  }
  if (rooms === 1) {
    roomsString = dict.room.single;
  } else {
    roomsString = dict.room.plural;
  }
  return 'Для ' + guests + ' ' + guestsString + ' в ' + rooms + ' ' + roomsString;
}
// Возвращает наименование типа на русском языке
function getLodgeTypeName(typeLodge) {
  var dict = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return dict[typeLodge];
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
  showDialog();
}
var offers = createOffers();
var pinMap = document.querySelector('.tokyo');
var activePin;
function activatePin(elem) {
  // Проверяем если у нас есть активированый пин - деактивируем его
  if (activePin) {
    deactivatePin();
  }
  // Новому pin ставим класс pin--active
  elem.classList.add('pin--active');
  activePin = elem;
  // Отображаем левый блок с информацией объявления выбранного pin
  showLodgeInfo(offers[activePin.getAttribute('data-id')]);
}
pinMap.addEventListener('click', function (evt) {
  // Отслеживаем клик на блок .pin или на блок у родителя которого есть класс pin
  if (evt.target.classList.contains('pin') || evt.target.parentNode.classList.contains('pin')) {
    if (evt.target.classList.contains('pin')) {
      activatePin(evt.target);
    } else {
      activatePin(evt.target.parentNode);
    }
  }
});
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
dialogClose.addEventListener('click', function () {
  hideDialog();
});
function deactivatePin() {
  activePin.classList.remove('pin--active');
}
// Закрываем блок dialog
function hideDialog() {
  document.querySelector('.dialog').classList.add('hidden');
  deactivatePin();
}
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
// Показываем блок dialog, добавляем обработчик событий на нажатие Esc
function showDialog() {
  document.querySelector('.dialog').classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      hideDialog();
    }
  });
}
// добавляем обработчик событий на крестик диалога нажатие ENTER
dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    hideDialog();
  }
});
// добавляем обработчик событий на карту.Если нажат ENTER на картинке пина - активируем пин
pinMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE && evt.target.parentNode.classList.contains('pin')) {
    activatePin(evt.target.parentNode);
  }
});
showPins(offers);
// Активируем первый пин
activatePin(document.querySelector('.pin[data-id="0"]'));
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

