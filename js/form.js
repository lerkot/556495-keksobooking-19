'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var forms = document.querySelectorAll('form');
  var buttonSubmit = adForm.querySelector('.ad-form__submit');
  var descField = adForm.querySelector('textarea');

  var getMainPinAdr = function (pin) {
    var x = Math.round(pin.offsetLeft + window.utils.MAIN_PIN_WIDTH / 2);
    var y = Math.round(pin.offsetTop + window.utils.MAIN_PIN_HEIGHT / 2);
    address.value = x + ', ' + y;
  };

  getMainPinAdr(mainPin);

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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(adForm));
    window.map.disablePage();
  });


  window.form = {
    makeFormInactive: makeFormInactive,
    makeFormActive: makeFormActive,
    getAddress: getMainPinAdr
  };

})();
