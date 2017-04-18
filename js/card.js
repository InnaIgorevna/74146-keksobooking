'use strict';
window.card = (function () {
  // Возвращает строчку в правильном склонении
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
  }
// Закрываем блок dialog
  function hideDialog() {
    document.querySelector('.dialog').classList.add('hidden');
    window.pin.deactivatePin();
  }
  var openDialog = function () {
    document.querySelector('.dialog').classList.remove('hidden');
  };
// Показываем блок dialog, добавляем обработчик событий на нажатие Esc
  function showDialog(lodge) {
    var dialog = document.querySelector('.dialog');
    var dialogClose = dialog.querySelector('.dialog__close');
    showLodgeInfo(lodge);
    window.showCard(dialog, openDialog, hideDialog, dialogClose);
  }
  return {
    showDialog: showDialog,
    hideDialog: hideDialog
  };
})();
