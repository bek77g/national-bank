$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    autoHeight: true,
  });
  // Go to the next item
  $('.owl-next').click(function () {
    owl.trigger('next.owl.carousel');
  });
  // Go to the previous item
  $('.owl-prev').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
  });

  //tabs

  //------------
  $('.catalog__caption').each(function (i) {
    var storage = localStorage.getItem('tab' + i);
    if (storage) {
      $(this)
        .find('li')
        .removeClass('catalog__item-active')
        .eq(storage)
        .addClass('catalog__item-active')
        .closest('div.catalog__tabs')
        .find('div.catalog__content')
        .removeClass('catalog__content-active')
        .eq(storage)
        .addClass('catalog__content-active');
    }
  });

  $('.catalog__caption').on(
    'click',
    'li:not(.catalog__item-active)',
    function () {
      $(this)
        .addClass('catalog__item-active')
        .siblings()
        .removeClass('catalog__item-active')
        .closest('div.catalog__tabs')
        .find('div.catalog__content')
        .removeClass('catalog__content-active')
        .eq($(this).index())
        .addClass('catalog__content-active');
      var ulIndex = $('ul.catalog__caption').index(
        $(this).parents('ul.catalog__caption')
      );
      localStorage.removeItem('tab' + ulIndex);
      localStorage.setItem('tab' + ulIndex, $(this).index());
    }
  );
  //----------

  //переходы

  $('.catalog__front-more').each(function (item) {
    $(this).on('click', function (event) {
      event.preventDefault();
      $('.catalog__front').eq(item).addClass('catalog__front-active');
      $('.catalog__back').eq(item).addClass('catalog__back-active');
    });
  });
  $('.catalog__backoff').each(function (item) {
    $(this).on('click', function (event) {
      event.preventDefault();
      $('.catalog__front').eq(item).removeClass('catalog__front-active');
      $('.catalog__back').eq(item).removeClass('catalog__back-active');
    });
  });

  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      'zoom',
      'share',
      'slideShow',
      'fullScreen',
      'download',
      'thumbs',
      'close',
    ],
    loop: true,
  });

  var map;

  DG.then(function () {
    map = DG.map('map', {
      center: [42.8771584, 74.58175],
      zoom: 13,
    });
    var myIcon = DG.icon({
      iconUrl: 'https://image.flaticon.com/icons/png/128/1673/1673188.png',
      iconRetinaUrl: 'my-icon@2x.png',
      iconSize: [50, 50],
    });
    var marker = DG.marker([42.8771584, 74.58175], { icon: myIcon })
      .addTo(map)
      .bindPopup('Вы кликнули по мне!');
    marker.bindLabel('БАНК', { static: true });
  });

  $('#tel, #telIN').inputmask('+\\9\\96 (999)-99-99-99');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 500) {
      $('.gotop').fadeIn('slow');
    } else {
      $('.gotop').fadeOut('slow');
    }
  });

  //==================
  $('.header__btn, .home__btn').on('click', function () {
    $('.overlay, #consultation').fadeIn();
    $('#order').fadeOut();
  });
  $('.modal__close, .overlay__uppage').on('click', function () {
    $('.overlay, #consultation, #order, #thanks, #orderthank').fadeOut();
  });
  $('.catalog__btn').each(function (item) {
    $(this).on('click', function () {
      $('.overlay, #order').fadeIn();
      $('.order-sub').text($('h3.catalog__front-title').eq(item).text());
    });
  });
  $('.modal__btn, .consalt__form-btn').on('click', function (event) {
    event.preventDefault();
    $('.overlay, #thanks').fadeIn(1);
    $('#consultation, #order, #orderthank').fadeOut(1);
  });
  $('.order__btn').on('click', function () {
    $('.overlay, #orderthank').fadeIn(1);
    $('#consultation, #order, #thanks').fadeOut(1);
  });
  $('overlay').on('click', function (e) {
    if (e.target.className === 'overlay') {
      $('.overlay, #orderthank').fadeIn(1);
      $('.overlay, #consultation, #order, #thanks, #orderthank').fadeOut(1);
    }
  });
});
