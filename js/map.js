'use strict';
(function () {
  var MAX_START_OFFERS = 3;
  var getOffersURL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var filteredOffers = [];
  function onLoadError(response) {
    var tokyoMap = document.querySelector('.tokyo');
    var errorPopup = document.createElement('div');
    errorPopup.className = 'response-error-text';
    errorPopup.innerText = 'Ошибка! ' + response;
    tokyoMap.appendChild(errorPopup);
  }
  function onLoadSuccess(response) {
    filteredOffers = response || [];
    updateOffers(response.slice(0, MAX_START_OFFERS));
    setMapEventListeners();
    var housingTypeElem = document.getElementById('housing_type');
    var guestRoomNumberElem = document.getElementById('housing_room-number');
    var housingGuestsNumberElem = document.getElementById('housing_guests-number');
    var housingPriceElem = document.getElementById('housing_price');
    var housingFeaturesElem = document.getElementById('housing_features');
    housingTypeElem.addEventListener('change', showFilteredOffers);
    guestRoomNumberElem.addEventListener('change', showFilteredOffers);
    housingGuestsNumberElem.addEventListener('change', showFilteredOffers);
    housingPriceElem.addEventListener('change', showFilteredOffers);
    housingFeaturesElem.addEventListener('change', showFilteredOffers);
    function showFilteredOffers() {
      filteredOffers = filterOffers(response);
      updateOffers(filteredOffers);
    }
    function filterOffers(offerList) {
      return offerList.filter(HousingTypeFilter)
        .filter(RoomNumberFilter)
        .filter(GuestsNumberFilter)
        .filter(HousingPriceFilter)
        .filter(HousingFeaturesFilter);
    }
    function HousingTypeFilter(offer) {
      return (housingTypeElem.value === 'any') || (housingTypeElem.value === offer.offer.type);
    }
    function RoomNumberFilter(offer) {
      return (guestRoomNumberElem.value === 'any') || (+guestRoomNumberElem.value === offer.offer.rooms);
    }
    function GuestsNumberFilter(offer) {
      return (housingGuestsNumberElem.value === 'any') || (+housingGuestsNumberElem.value === offer.offer.guests);
    }
    function HousingPriceFilter(offer) {
      var priceDict = {
        low: 10000,
        high: 50000
      };
      if (housingPriceElem.value === 'low') {
        return offer.offer.price < priceDict.low;
      }
      if (housingPriceElem.value === 'high') {
        return offer.offer.price > priceDict.high;
      }
      return offer.offer.price >= priceDict.low && offer.offer.price <= priceDict.high;
    }
    function HousingFeaturesFilter(offer) {
      var housingFeaturesArray = Array.prototype.slice.call(housingFeaturesElem.querySelectorAll('.feature>input[type="checkbox"]:checked'));
      if (!housingFeaturesArray.length) {
        return true;
      }
      var currentFeatures = housingFeaturesArray.filter(function (f) {
        return offer.offer.features.indexOf(f.value) !== -1;
      });
      return currentFeatures.length === housingFeaturesArray.length;
    }
  }
  function setMapEventListeners() {
    // добавляем обработчик событий на карту.Если нажат ENTER на картинке пина - активируем пин
    var pinMap = document.querySelector('.tokyo__pin-map');
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
  }
  function activatePinAndShowInfo(pin) {
    if (!pin.classList.contains('pin__main')) {
      window.pin.activatePin(pin);
      // Отображаем левый блок с информацией объявления выбранного pin
      window.card.showDialog(filteredOffers[window.pin.getActivePin().getAttribute('data-id')]);
    }
  }
  function clearOffers() {
    window.card.hideDialog();
    window.pin.deactivatePin();
    var pinMap = document.querySelector('.tokyo__pin-map');
    var offerPins = pinMap.querySelectorAll('.pin:not(.pin__main)');
    offerPins.forEach(function (pin) {
      pinMap.removeChild(pin);
    });
  }
  function updateOffers(pins) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin, i) {
      fragment.appendChild(window.pin.createPin(pin.location.x, pin.location.y, pin.author.avatar, i));
    });
    clearOffers();
    pinMap.appendChild(fragment);
    // Активируем первый пин
    if (pins.length > 0) {
      activatePinAndShowInfo(document.querySelector('.pin[data-id="0"]'));
    }
  }
  window.load(getOffersURL, onLoadSuccess, onLoadError);
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
