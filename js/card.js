'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var removeEmptyElements = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var getFeatures = function (features, featuresList) {
    removeEmptyElements(featuresList);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + features[i];
      fragment.append(featureItem);
    }

    return fragment;
  };

  var getPhotos = function (photos, photosList) {
    removeEmptyElements(photosList);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = photos[i];
      photoItem.alt = 'Фотография жилья';
      photoItem.style.width = '45px';
      photoItem.style.height = '40px';
      fragment.append(photoItem);
    }

    return fragment;
  };

  var getCard = function (cardDetails) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardClose = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__title').textContent = cardDetails.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardDetails.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardDetails.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.utils.houseType[cardDetails.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = cardDetails.offer.rooms + ' комнаты для ' + cardDetails.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardDetails.offer.checkin + ',' + ' выезд до ' + cardDetails.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = cardDetails.offer.description;
    cardElement.querySelector('.popup__avatar').src = cardDetails.author.avatar;


    var featuresList = cardElement.querySelector('.popup__features');
    var photosList = cardElement.querySelector('.popup__photos');

    var features = getFeatures(cardDetails.offer.features, featuresList);

    featuresList.append(features);

    getPhotos(cardDetails.offer.photos, photosList);

    var photos = getPhotos(cardDetails.offer.photos, photosList);
    photosList.append(photos);


    cardClose.addEventListener('click', function () {
      cardElement.remove();
    });

    cardClose.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        cardElement.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        cardElement.remove();
      }
    });

    return cardElement;
  };

  var removeCard = function () {
    var popupCard = document.querySelector('.map__card.popup');
    if (popupCard) {
      popupCard.remove();
    }
  };

  window.card = {
    get: getCard,
    remove: removeCard
  };
})();
