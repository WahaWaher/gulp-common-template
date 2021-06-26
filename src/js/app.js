$(document).ready(
  function (document, window, setTimeout) {
    // /**
    //  * Fancybox: basic options
    //  * doc: https://fancyapps.com/fancybox/3/docs/#options
    //  */
    //  $.extend(true, $.fancybox.defaults, {
    //   idleTime: 5,
    //   // animationEffect: 'material',
    //   animationDuration: 250,
    //   transitionEffect: 'circular',
    //   transitionDuration: 450,
    //   lang: 'ru',
    //   i18n: {
    //     ru: {
    //       CLOSE: 'Закрыть',
    //       NEXT: 'Далее',
    //       PREV: 'Назад',
    //       ERROR:
    //         'Не удалось загрузить содержимое.<br>Пожалуйста, попробуйте позже.',
    //       PLAY_START: 'Запустить слайд-шоу',
    //       PLAY_STOP: 'Остановить слайд-шоу',
    //       FULL_SCREEN: 'На весь экран',
    //       THUMBS: 'Миниатюры',
    //       DOWNLOAD: 'Скачать',
    //       SHARE: 'Поделиться',
    //       ZOOM: 'Масштаб'
    //     }
    //   }
    // });

    // /**
    //  * OWL: SliderDefault
    //  */
    // var $sliderDefault = $('[data-slider-default]');

    // $sliderDefault.each(function (i, slider) {
    //   var $slider = $(slider);
    //   var options = $.extend(
    //     true,
    //     {},
    //     {
    //       // Default options...
    //       items: 1,
    //       nav: false,
    //       dots: false,
    //       lazyLoad: true,
    //       lazyLoadEager: 1,
    //       smartSpeed: 450
    //     },
    //     $slider.data('owl')
    //   );

    //   // OWL Init: Lazy or not
    //   if ($slider.hasClass('lazyload')) {
    //     $slider.get(0).owlOptions = options;
    //     $slider.css('display', 'block');
    //   } else {
    //     $slider.owlCarousel(options);
    //   }
    // });

    // // OWL: Lazysizes
    // $(document).on('lazybeforeunveil', function (e) {
    //   var $element = $(e.target);
    //   var isOwl = $element.hasClass('owl-carousel');

    //   if (isOwl) $element.owlCarousel(e.target.owlOptions || {});
    // });

    /**
     * Masked Input
     */
    $('[data-mask]').each(function () {
      var $el = $(this);
      var mask = $el.data('mask');

      if (mask === 'phone') {
        $el.mask('+7 (999) 999-99-99');
      }
    });

    /**
     * AppDrawer
     */
    var $drawers = $('[data-drawer]');

    // Init drawers
    $drawers.each(function () {
      this.wDrawer = new WDrawer(this, { width: 300, page: '.app' });
    });

    // Bind drawer toggle buttons
    $('[data-drawer-toggle]').each(function () {
      var $drawerToggler = $(this);
      var drawerID = $drawerToggler.data('drawer-toggle');
      var $targetDrawer = $drawers.filter('[data-drawer="' + drawerID + '"]');
      var targetDrawer = $targetDrawer.get(0);

      targetDrawer.addEventListener('wdrawer.open', function () {
        $drawerToggler.addClass('is-active');
      });

      targetDrawer.addEventListener('wdrawer.close', function () {
        $drawerToggler.removeClass('is-active');
      });

      $drawerToggler.on('click', function () {
        targetDrawer.wDrawer.switch();
      });
    });

    /**
     * LazySizes
     */
    lazySizes.init();
  }.bind(null, document, window, setTimeout)
);
