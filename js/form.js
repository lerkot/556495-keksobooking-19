'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');

  var getMainPinAdr = function (pin) {
    var x = Math.round(pin.offsetLeft + window.utils.MAIN_PIN_WIDTH / 2);
    var y = Math.round(pin.offsetTop + window.utils.MAIN_PIN_HEIGHT / 2);
    address.value = x + ', ' + y;
  };

  getMainPinAdr(mainPin);


})();
