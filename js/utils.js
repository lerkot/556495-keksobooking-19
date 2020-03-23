'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var PIN_HEIGHT = 50;
  var MAIN_PIN_HEIGHT = 87;
  var MAIN_PIN_WIDTH = 65;
  var PIN_WIDTH = 70;
  var houseType = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    houseType: houseType
  };
})();
