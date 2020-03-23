'use strict';
(function () {
  var MAX_PINS_AMOUNT = 5;
  var mapInActive = document.querySelector('.map--faded');
  var mapPins = document.querySelector('.map__pins');
  var cardsContainer = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var forms = document.querySelectorAll('form');
  var adForm = document.querySelector('.ad-form');
  var descField = adForm.querySelector('textarea');
  var buttonSubmit = adForm.querySelector('.ad-form__submit');
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
    window.backend.loadData(successHandler, errorHandler);
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
    renderCard: renderCard
  };
})();
