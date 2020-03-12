'use strict';
// var ESC_KEY = 'Escape';
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
var getPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
  pinElement.style.left = (pin.location.x - 25) + 'px';
  pinElement.style.top = (pin.location.y - 70) + 'px';

  return pinElement;
};


// Функция, отрисовывающая пины
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var pins = createPins(8);

/*
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

*/

/*
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

  return cardElement;
};

// Функция отрисовки карточки
var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCard(pins[0]));
  cardsContainer.insertBefore(fragment, mapFiltersContainer);
};

renderCard(pins[0]);

*/

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
    switch (evt.button) {
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


var adRoomsQuantity = adForm.querySelector('#room_number');
var adGuestsQuantity = adForm.querySelector('#capacity');

// Меняем количество гостей по умолчанию
var options = adGuestsQuantity.options;
options[2].selected = true;


var roomOrGuestHandler = function () {
  if (adRoomsQuantity.value === '1') {
    adGuestsQuantity.setCustomValidity('«для 1 гостя»');
  } else if (adRoomsQuantity.value === '2') {
    adGuestsQuantity.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
  } else if (adRoomsQuantity.value === '3') {
    adGuestsQuantity.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (adRoomsQuantity.value === '100') {
    adGuestsQuantity.setCustomValidity('«не для гостей»');
  }
};

adRoomsQuantity.addEventListener('change', roomOrGuestHandler);
adGuestsQuantity.addEventListener('change', roomOrGuestHandler);
