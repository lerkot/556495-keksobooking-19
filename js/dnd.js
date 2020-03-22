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

      var x = mainPin.offsetLeft - shift.x;
      var y = mainPin.offsetTop - shift.y;

      var leftLocation = checkMapSizes((MIN_X - Math.round(window.utils.MAIN_PIN_WIDTH / 2)), (MAX_X - Math.round(window.utils.MAIN_PIN_WIDTH / 2)), x);
      var topLocation = checkMapSizes((MIN_Y - window.utils.MAIN_PIN_HEIGHT), (MAX_Y - window.utils.MAIN_PIN_HEIGHT), y);

      mainPin.style.top = topLocation + 'px';
      mainPin.style.left = leftLocation + 'px';

      window.form.set(mainPin);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      window.form.set(mainPin);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  });


})();
