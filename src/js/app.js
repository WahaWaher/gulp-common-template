$(document).ready(
  function (document, window, setTimeout) {
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
      this.wDrawer = new WDrawer(this, { width: 300 });
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
