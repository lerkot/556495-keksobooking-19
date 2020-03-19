'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var PIN_HEIGHT = 50;
var MAIN_PIN_HEIGHT = 156;
var MAIN_PIN_WIDTH = 156;
var PIN_WIDTH = 70;
var TITLE_MIN_LENGHT = 30;
var TITLE_MAX_LENGHT = 100;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

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
  pinElement.style.left = (pin.location.x - PIN_HEIGHT / 2) + 'px';
  pinElement.style.top = (pin.location.y - PIN_WIDTH) + 'px';
  pinElement.setAttribute('data-id', i);

  pinElement.addEventListener('click', function (evt) {
    var id = evt.currentTarget.getAttribute('data-id');
    renderCard(pins[id]);
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


var isActive = false;

mainPin.addEventListener('mousedown', function (evt) {
  if (isActive) {
    return;
  }

  if (evt.which === 1) {
    isActive = true;
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (isActive) {
    return;
  }
  if (evt.key === ENTER_KEY) {
    isActive = true;
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
priceInput.setAttribute('placeholder', MIN_PRICE);
var accomodationType = adForm.querySelector('#type');

var minPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var priceHandler = function (evt) {
  priceInput.setAttribute('min', minPrice[evt.target.value]);
};

var showMinPrice = function () {
  priceInput.min = minPrice[accomodationType.value];
  priceInput.placeholder = minPrice[accomodationType.value];
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
var getMainPinAdr = function (pin) {
  var x = pin.offsetLeft + MAIN_PIN_WIDTH / 2;
  var y = pin.offsetTop + MAIN_PIN_HEIGHT;
  address.value = x + ', ' + y;
};

getMainPinAdr(mainPin);


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
