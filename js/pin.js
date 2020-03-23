'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // Функция, получающая конкретный пин
  var getPin = function (pin, i) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
    pinElement.style.left = (pin.location.x - window.utils.PIN_HEIGHT / 2) + 'px';
    pinElement.style.top = (pin.location.y - window.utils.PIN_WIDTH) + 'px';
    pinElement.setAttribute('data-id', i);

    pinElement.addEventListener('click', function (evt) {
      var id = evt.currentTarget.getAttribute('data-id');
      window.map.renderCard(window.data[id]);
    });

    return pinElement;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    get: getPin,
    remove: removePins
  };
})();
