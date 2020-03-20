'use strict';
(function () {
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

  var pins = createPins(8);

  window.data = {
    pins: pins
  };

})();
