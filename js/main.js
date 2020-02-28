'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];

TYPES[0] = 'Дворец';
TYPES[1] = 'Квартира';
TYPES[2] = 'Дом';
TYPES[3] = 'Бунгало';

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
  var randomPhotosLength = getRandomInteger(0, PHOTOS.length - 1);
  return {
    author: {
      avatar: 'img/avatars/user' + prefix + i + '.png'
    },
    offer: {
      title: 'Some title ' + i,
      address: x + ', ' + y,
      price: getRandomInteger(5, 50000),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: CHECKIN[getRandomInteger(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomInteger(0, CHECKOUT.length - 1)],
      features: FEATURES[getRandomInteger(0, FEATURES.length - 1)],
      description: 'Some description ' + i,
      photos: PHOTOS.slice(0, randomPhotosLength)
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
mapInActive.classList.remove('map--faded');
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

renderPins(pins);

// Находим блок, куда будем вставлять наши карточки
var cardsContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Находим шаблон, который мы будем копировать
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


var getCard = function (cardDatum) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = cardDatum.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardDatum.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardDatum.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = cardDatum.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = cardDatum.offer.rooms + ' комнаты для ' + cardDatum.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardDatum.offer.checkin + ',' + ' выезд до' + cardDatum.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = cardDatum.offer.features;
  cardElement.querySelector('.popup__description').textContent = cardDatum.offer.description;
  cardElement.querySelector('.popup__avatar').src = cardDatum.author.avatar;

  cardsContainer.insertBefore(cardElement, mapFiltersContainer);

  return cardElement;
};

getCard(pins[0]);
