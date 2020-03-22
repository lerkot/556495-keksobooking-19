'use strict';
(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;

  var checkMapSizes = function (min, max, current) {
    if (current < min) {
      return min;
    } else if (current > max) {
      return max;
    }

    return current;
  };

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var X = mainPin.offsetLeft - shift.x;
      var Y = mainPin.offsetTop - shift.y;

      var leftLocation = checkMapSizes((MIN_X - Math.round(window.utils.MAIN_PIN_WIDTH / 2)), (MAX_X - Math.round(window.utils.MAIN_PIN_WIDTH / 2)), X);
      var topLocation = checkMapSizes((MIN_Y - window.utils.MAIN_PIN_HEIGHT), (MAX_Y - window.utils.MAIN_PIN_HEIGHT), Y);

      mainPin.style.top = topLocation + 'px';
      mainPin.style.left = leftLocation + 'px';

      var setMainPinCurrentAdr = function () {
        var x = leftLocation + Math.round(window.utils.MAIN_PIN_WIDTH / 2);
        var y = topLocation + Math.round(window.utils.MAIN_PIN_HEIGHT);
        document.querySelector('#address').value = x + ', ' + y;
      };

      setMainPinCurrentAdr(mainPin);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  });


})();
