$(document).ready(function (document, window, setTimeout) {
  /**
   * Strings
   */
  var _opacity_ = 'opacity';
  var _lazybeforeunveil_ = 'lazybeforeunveil';

  /**
   * SVG For Everybody
   */
  svg4everybody();

  /**
   * Animation on lazyloaded
   */
  $(document)
    .on(_lazybeforeunveil_, function(e) {
      $(e.target).css(_opacity_, 0);
    })
    .on('lazyloaded', function(e) {
      var $target = $(e.target);

      $target.animateCSS('fadeIn', {
        duration: 750,
        clear: true,
        start: function(options) {
          // unset opacity if complete callback doesn't work
          setTimeout(function() {
            options.complete();
          }, options.duration + 15);
        },
        complete: function() {
          $target.css('opacity', '');
        }
      });
    });

  /**
   * LazySizes Init
   */
  lazySizes.init();

  /**
   * Scroll to block
   */
  // Scroll to selector
  function scrollToSelector(selector) {
    if (!selector) return false;

    $('html,body')
      .stop()
      .animate(
        {
          scrollTop: getOffset(selector)
        },
        {
          duration: 1100,
          easing: 'swing',
          step: function(now, fx) {
            var newDest = getOffset(selector);

            if (fx.end !== newDest) fx.end = newDest;
          },
          complete: function() {
            if (history.pushState) {
              history.pushState(null, null, selector);
            } else {
              location.hash = selector;
            }
          }
        }
      );
  }

  // Gets current offsetTop
  function getOffset(selector) {
    var offset = $(selector).offset();

    return offset ? offset.top : 0;
  }

  if (location.hash) {
    // Disable default anchor scroll
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 0);

    // Animate anchor scroll when page loaded
    setTimeout(function() {
      scrollToSelector(location.hash);
    }, 250);
  }

  $('a.scroll-to').click(function() {
    var $this = $(this);
    var href = $this.attr('href');
    var parts = href.split('#');
    var selector = parts[1] ? '#' + parts[1] : '';

    if (!selector) return false;

    // disable animate scroll for links that lead to other pages
    if (parts[0]) return;

    scrollToSelector(selector);

    return false;
  });
  /* Scroll to block: End */

  /* Back to top button: Start */
  var navButton = $('#top-button'),
    screenHeight = $(window).height(),
    topShow = screenHeight, // hidden before (screenHeight or Number), px
    navSpeed = 1200; // speed, ms

  function scrollCalc() {
    var scrollOut = $(window).scrollTop();

    if (
      scrollOut > topShow &&
      (navButton.attr('class') == '' || navButton.attr('class') == undefined)
    )
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up')
        .attr('title', 'Наверх');
    if (scrollOut < topShow && navButton.attr('class') == 'up')
      navButton.fadeOut().removeClass('up down');
    if (scrollOut > topShow && navButton.attr('class') == 'down')
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up');
  }

  $(window).bind('scroll', scrollCalc);
  var lastPos = 0;

  navButton.bind('click', function() {
    scrollOut = $(window).scrollTop();

    if (navButton.attr('class') == 'up') {
      lastPos = scrollOut;
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: 0
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('up')
            .addClass('down')
            .attr('title', 'Back');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
    if (navButton.attr('class') == 'down') {
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: lastPos
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('down')
            .addClass('up')
            .attr('title', 'Top');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
  });
  /* Back to top button: End */
}.bind(null, document, window, setTimeout));
