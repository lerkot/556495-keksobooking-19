'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var getPin = function (i) {
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
      price: getRandomInteger(5, 100),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(2, 4),
      guests: getRandomInteger(1, 100),
      checkin: TIMES[getRandomInteger(0, TIMES.length - 1)],
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

var getPins = function (count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(getPin(i + 1));
  }
  return result;
};

var pins = getPins(8);

var mapInActive = document.querySelector('.map--faded');
mapInActive.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
  pinElement.style.left = (pin.location.x - 25) + 'px';
  pinElement.style.top = (pin.location.y - 70) + 'px';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);
