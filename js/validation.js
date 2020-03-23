'use strict';
(function () {
  var TITLE_MIN_LENGHT = 30;
  var TITLE_MAX_LENGHT = 100;
  var MAX_PRICE = 1000000;
  var MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adRoomsQuantity = adForm.querySelector('#room_number');
  var adGuestsQuantity = adForm.querySelector('#capacity');
  var options = adGuestsQuantity.options;

  options[2].selected = true;
  var roomOrGuestHandler = function () {
    if (adRoomsQuantity.value === '1' && adGuestsQuantity.value !== '1') {
      adGuestsQuantity.setCustomValidity('«для 1 гостя»');
    } else if (adRoomsQuantity.value === '2' && (adGuestsQuantity.value < 1 || adGuestsQuantity.value > 2)) {
      adGuestsQuantity.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
    } else if (adRoomsQuantity.value === '3' && (adGuestsQuantity.value < 1 || adGuestsQuantity.value > 3)) {
      adGuestsQuantity.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (adRoomsQuantity.value === '100' && adGuestsQuantity.value !== '0') {
      adGuestsQuantity.setCustomValidity('«не для гостей»');
    } else {
      adGuestsQuantity.setCustomValidity('');
    }
  };

  adRoomsQuantity.addEventListener('change', roomOrGuestHandler);
  adGuestsQuantity.addEventListener('change', roomOrGuestHandler);


  // Валидация поля «Заголовок объявления»
  var titleInput = adForm.querySelector('#title');
  titleInput.setAttribute('required', '');
  titleInput.setAttribute('minlength', TITLE_MIN_LENGHT);
  titleInput.setAttribute('maxlength', TITLE_MAX_LENGHT);

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Длина заголовка не должна превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Добавьте заголовок');
    } else {
      titleInput.setCustomValidity('');
    }
  });


  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < TITLE_MIN_LENGHT) {
      target.setCustomValidity('Заголовок должен состоять минимум из ' + TITLE_MIN_LENGHT + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });


  // Валидация полей «Тип жилья» и Цена за ночь
  var priceInput = adForm.querySelector('#price');
  priceInput.setAttribute('required', '');
  priceInput.setAttribute('max', MAX_PRICE);
  priceInput.setAttribute('placeholder', MIN_PRICE.flat);
  var accomodationType = adForm.querySelector('#type');

  var priceHandler = function (evt) {
    priceInput.setAttribute('min', MIN_PRICE[evt.target.value]);
  };

  var showMinPrice = function () {
    priceInput.min = MIN_PRICE[accomodationType.value];
    priceInput.placeholder = MIN_PRICE[accomodationType.value];
  };

  var accomodationTypeHandler = function (evt) {
    priceHandler(evt);
    showMinPrice();
  };

  priceInput.addEventListener('change', accomodationTypeHandler);
  accomodationType.addEventListener('change', accomodationTypeHandler);

  // Валидация поля «Адрес»
  var address = adForm.querySelector('#address');
  address.setAttribute('required', '');
  address.setAttribute('readonly', '');

  // Валидация полей «Время заезда» и «Время выезда»
  var checkinTime = adForm.querySelector('#timein');
  var checkoutTime = adForm.querySelector('#timeout');
  var timeHandler = function (evt) {
    if (evt.target === checkinTime) {
      checkoutTime.value = checkinTime.value;
    } else if (evt.target === checkoutTime) {
      checkinTime.value = checkoutTime.value;
    }
  };

  checkinTime.addEventListener('change', timeHandler);
  checkoutTime.addEventListener('change', timeHandler);


  // Валидация полей «Ваша фотография» и «Фотография жилья»
  var uploadAvatar = adForm.querySelector('#avatar');
  var uploadPhotos = adForm.querySelector('#images');
  uploadAvatar.setAttribute('accept', 'image/png, image/jpeg');
  uploadPhotos.setAttribute('accept', 'image/png, image/jpeg');

})();
