'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var LEFT_BUTTON = '0';

var houseType = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TYPES = Object.keys(houseType);
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

// Функция, которая получает данные для одного пина
var createPin = function (i) {
  var prefix = i < 10 ? '0' : '';
  var x = getRandomInteger(0, 1200);
  var y = getRandomInteger(130, 630);

  return {
    author: {
      avatar: 'img/avatars/user' + prefix + i + '.png'
    },
    offer: {
      title: 'Some title ' + i,
      address: x + ', ' + y,
      price: getRandomInteger(5, 50000),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 3),
      checkin: CHECKIN[getRandomInteger(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomInteger(0, CHECKOUT.length - 1)],
      features: FEATURES.slice(0, getRandomInteger(0, FEATURES.length)),
      description: 'Some description ' + i,
      photos: PHOTOS.slice(0, getRandomInteger(0, PHOTOS.length))
    },

    location: {
      x: x,
      y: y
    }
  };
};

// Функция, получающая список элементов
var createPins = function (count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(createPin(i + 1));
  }
  return result;
};


var mapInActive = document.querySelector('.map--faded');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция, получающая конкретный пин
var getPin = function (pin, i) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
  pinElement.style.left = (pin.location.x - 25) + 'px';
  pinElement.style.top = (pin.location.y - 70) + 'px';
  pinElement.setAttribute('data-id', i);

  pinElement.addEventListener('click', function (evt) {
    var id = evt.currentTarget.getAttribute('data-id');
    renderCard(pins[id]);
  });


  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      var id = evt.currentTarget.getAttribute('data-id');
      renderCard(pins[id]);
    }

  });

  return pinElement;
};


// Функция, отрисовывающая пины
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getPin(pins[i], i));
  }
  mapPins.appendChild(fragment);
};

var pins = createPins(8);

// Находим блок, куда будем вставлять наши карточки
var cardsContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Находим шаблон, который мы будем копировать
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Добавляем отображение типа жилья: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
var getHouseType = function (type) {
  var houseName = '';
  if (type === 'flat') {
    houseName = 'Квартира';
  } else if (type === 'bungalo') {
    houseName = 'Бунгало';
  } else if (type === 'house') {
    houseName = 'Дом';
  } else if (type === 'palace') {
    houseName = 'Дворец';
  }
  return houseName;
};


var removeEmptyElements = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var getFeatures = function (features, featuresList) {
  removeEmptyElements(featuresList);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + features[i];
    fragment.append(featureItem);
  }

  return fragment;
};

var getPhotos = function (photos, photosList) {
  removeEmptyElements(photosList);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = photos[i];
    photoItem.alt = 'Фотография жилья';
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    fragment.append(photoItem);
  }

  return fragment;
};


// Функция для получения данных карточки
var getCard = function (cardDetails) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardClose = cardElement.querySelector('.popup__close');
  cardElement.querySelector('.popup__title').textContent = cardDetails.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardDetails.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardDetails.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getHouseType(cardDetails.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = cardDetails.offer.rooms + ' комнаты для ' + cardDetails.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardDetails.offer.checkin + ',' + ' выезд до' + cardDetails.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = cardDetails.offer.description;
  cardElement.querySelector('.popup__avatar').src = cardDetails.author.avatar;

  var featuresList = cardElement.querySelector('.popup__features');
  var photosList = cardElement.querySelector('.popup__photos');

  var features = getFeatures(cardDetails.offer.features, featuresList);
  featuresList.append(features);

  getPhotos(cardDetails.offer.photos, photosList);

  var photos = getPhotos(cardDetails.offer.photos, photosList);
  photosList.append(photos);


  cardClose.addEventListener('click', function () {
    cardElement.remove();
  });

  cardClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      cardElement.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      cardElement.remove();
    }
  });

  return cardElement;
};

var removeCard = function () {
  var popupCard = document.querySelector('.map__card.popup');
  if (popupCard) {
    popupCard.remove();
  }
};


// Функция отрисовки карточки
var renderCard = function (card) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCard(card));
  removeCard();
  cardsContainer.insertBefore(fragment, mapFiltersContainer);
};


// Добавляем функцию, которая делает все input и select неактивными в исходном состоянии
var inputs = document.querySelectorAll('input');
var selects = document.querySelectorAll('select');
var forms = document.querySelectorAll('form');
var adForm = document.querySelector('.ad-form');
var descField = adForm.querySelector('textarea');
var buttonSubmit = adForm.querySelector('.ad-form__submit');
var adFormDisabled = document.querySelector('.ad-form--disabled');
var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');

// делает селекты, формы, инпуты неактивными
var makeFormInactive = function () {
  buttonSubmit.setAttribute('disabled', '');

  for (var k = 0; k < forms.length; k++) {
    forms[k].setAttribute('disabled', '');
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('disabled', '');
  }
  for (var j = 0; j < selects.length; j++) {
    selects[j].setAttribute('disabled', '');
  }
  descField.setAttribute('disabled', '');

};

makeFormInactive();


// Делаем input и select активными
var makeFormActive = function () {
  buttonSubmit.removeAttribute('disabled', '');

  for (var k = 0; k < forms.length; k++) {
    forms[k].removeAttribute('disabled', '');
  }
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute('disabled', '');
  }

  for (var j = 0; j < selects.length; j++) {
    selects[j].removeAttribute('disabled', '');
  }

  descField.removeAttribute('disabled', '');
};

// функция активации страницы
var activatePage = function () {
  makeFormActive(adFormDisabled);
  makeFormActive(mapFilters);
  mapInActive.classList.remove('map--faded');
  adFormDisabled.classList.remove('ad-form--disabled');
  renderPins(pins);
};

// Проверяем, что нажата левая кнопка мыши и активируем страницу
var checkMouseButton = function (evt) {
  if (typeof evt === 'object') {
    switch (evt.mainPin) {
      case LEFT_BUTTON:
        activatePage();
    }
  }
};

checkMouseButton();

// Вешаем обработчик на главный пин и активируем страницу при нажатии левой кнопки мыши
mainPin.addEventListener('mousedown', function () {
  activatePage();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

// Валидация
var adRoomsQuantity = adForm.querySelector('#room_number');
var adGuestsQuantity = adForm.querySelector('#capacity');

// Меняем количество гостей по умолчанию
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
var MIN_DESC_LENGTH = 30;
var titleInput = adForm.querySelector('#title');
titleInput.setAttribute('required', '');
titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');

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
  if (target.value.length < MIN_DESC_LENGTH) {
    target.setCustomValidity('Заголовок должен состоять минимум из ' + MIN_DESC_LENGTH + ' символов');
  } else {
    target.setCustomValidity('');
  }
});


// Валидация полей «Тип жилья» и Цена за ночь
var priceInput = adForm.querySelector('#price');
priceInput.setAttribute('required', '');
priceInput.setAttribute('max', '1000000');
priceInput.setAttribute('min', '0');
var accomodationType = adForm.querySelector('#type');
var minPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var priceHandler = function () {
  var min = parseInt(priceInput.min, 10);
  var max = parseInt(priceInput.max, 10);
  if (priceInput.value < min) {
    priceInput.setCustomValidity('Минимальная стоимость - ' + min);
  } else if (priceInput.value > max) {
    priceInput.setCustomValidity('Максимальная стоимость - ' + max);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Укажите стоимость');
  } else {
    priceInput.setCustomValidity('');
  }
};

var showMinPrice = function () {
  priceInput.min = minPrice[accomodationType.value];
  priceInput.placeholder = minPrice[accomodationType.value];
};

var accomodationTypeHandler = function () {
  priceHandler();
  showMinPrice();
};

priceInput.addEventListener('change', accomodationTypeHandler);
accomodationType.addEventListener('change', accomodationTypeHandler);

// Валидация поля «Адрес» (с координатами пока не работала)
var address = adForm.querySelector('#address');
address.setAttribute('required', '');
address.setAttribute('readonly', '');
address.value = mainPin.style.left + ' ,' + mainPin.style.top;


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
