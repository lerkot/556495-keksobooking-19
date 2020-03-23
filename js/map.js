'use strict';
(function () {
  var MAX_PINS_AMOUNT = 5;
  var adForm = document.querySelector('.ad-form');
  var mapInActive = document.querySelector('.map--faded');
  var mapPins = document.querySelector('.map__pins');
  var cardsContainer = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var adFormDisabled = document.querySelector('.ad-form--disabled');
  var mapFilters = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var isActive = false;


  // Функция, отрисовывающая пины
  var successHandler = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PINS_AMOUNT; i++) {
      fragment.appendChild(window.pin.get(window.data[i], i));
    }
    mapPins.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderCard = function (card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.get(card));
    window.card.remove();
    cardsContainer.insertBefore(fragment, mapFiltersContainer);
  };

  // функция активации страницы
  var activatePage = function () {
    window.form.makeFormActive(adFormDisabled);
    window.form.makeFormActive(mapFilters);
    mapInActive.classList.remove('map--faded');
    adFormDisabled.classList.remove('ad-form--disabled');
    window.backend.loadData(successHandler, errorHandler);
  };

  // функция дезактивации страницы
  var disablePage = function () {
    adForm.reset();
    window.form.makeFormInactive(adFormDisabled);
    window.form.makeFormInactive(mapFilters);
    mapInActive.classList.add('map--faded');
    adFormDisabled.classList.add('ad-form--disabled');
    window.pin.remove();
    window.card.remove();
    window.form.getAddress(mainPin);
  };


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
    if (evt.key === window.utils.ENTER_KEY) {
      isActive = true;
      activatePage();
    }
  });


  window.map = {
    renderCard: renderCard,
    disablePage: disablePage
  };
})();
