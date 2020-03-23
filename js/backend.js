'use strict';
(function () {
  var URL = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  };

  var errorsList = {
    '400': 'Ошибка 400: Не запрос',
    '403': 'Ошибка 403: Доступ запрещен',
    '404': 'Ошибка 404: Страница не найдена',
    '500': 'Ошибка 500: Внутренняя ошибка сервера',
    '502': 'Ошибка 502: Плохой шлюз',
    '503': 'Ошибка 503: Сервис недоступен'
  };

  var getServerResponse = function (xhr, successHandler, errorHandler) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      window.data = xhr.response;
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        switch (xhr.status) {
          case StatusCode.BAD_REQUEST:
            errorHandler(errorsList[xhr.status]);
            break;
          case StatusCode.FORBIDDEN:
            errorHandler(errorsList[xhr.status]);
            break;
          case StatusCode.NOT_FOUND:
            errorHandler(errorsList[xhr.status]);
            break;
          case StatusCode.INTERNAL_SERVER_ERROR:
            errorHandler(errorsList[xhr.status]);
            break;
          case StatusCode.BAD_GATEWAY:
            errorHandler(errorsList[xhr.status]);
            break;
          case StatusCode.SERVICE_UNAVAILABLE:
            errorHandler(errorsList[xhr.status]);
            break;
          default:
            errorHandler('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var loadData = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, successHandler, errorHandler);
    xhr.open('GET', URL.GET);
    xhr.send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, successHandler, errorHandler);
    xhr.open('POST', URL.POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };

})();
