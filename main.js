/**
 * North Florida Locksmith — main.js
 * ====================================
 * Two functions only:
 *  1. Mobile Navbar Hamburger Toggle
 *  2. Sticky Bottom Call Button (show/hide on scroll)
 *
 * Loaded with defer — runs after HTML is parsed.
 * No libraries, no external dependencies, no inline scripts.
 */

(function () {
  'use strict';

  /* ===========================================================
     FUNCTION 1: Mobile Navbar Hamburger Toggle
     - Opens/closes the mobile menu
     - Toggles aria-expanded on the hamburger button
     - Locks body scroll when menu is open
     - Closes on Escape key
     - Closes on click outside the nav
     - Handles inline mobile dropdown expand/collapse
     Also handles: header is-scrolled class (scroll > 60px)
  =========================================================== */
  function initMobileNav() {
    var hamburgerBtn = document.querySelector('.hamburger-btn');
    var mobileNav    = document.getElementById('mobile-menu');
    var body         = document.body;

    if (!hamburgerBtn || !mobileNav) return;

    /**
     * Open the mobile navigation menu.
     */
    function openMenu() {
      var scrollY = window.scrollY || window.pageYOffset;
      body.style.top = '-' + scrollY + 'px';
      mobileNav.classList.add('is-open');
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      body.classList.add('nav-open');
    }

    /**
     * Close the mobile navigation menu.
     */
    function closeMenu() {
      var scrollY = parseInt(body.style.top || '0', 10) * -1;
      body.classList.remove('nav-open');
      body.style.top = '';
      mobileNav.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      window.scrollTo(0, scrollY);
    }

    /**
     * Toggle the mobile navigation menu open or closed.
     */
    function toggleMenu() {
      if (mobileNav.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    /* Toggle on hamburger button click */
    hamburgerBtn.addEventListener('click', toggleMenu);

    /* Close on Escape key press */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });

    /* Close when clicking outside the nav and hamburger */
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

    /* Mobile dropdown toggles — expand inline, no hover required */
    var dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    dropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var dropdown = toggle.closest('.mobile-dropdown');
        if (!dropdown) return;

        var isOpen = dropdown.classList.contains('is-open');

        /* Close all other open dropdowns first */
        document.querySelectorAll('.mobile-dropdown.is-open').forEach(function (openDropdown) {
          if (openDropdown !== dropdown) {
            openDropdown.classList.remove('is-open');
            var otherToggle = openDropdown.querySelector('.mobile-dropdown-toggle');
            if (otherToggle) {
              otherToggle.setAttribute('aria-expanded', 'false');
            }
          }
        });

        /* Toggle this dropdown */
        dropdown.classList.toggle('is-open', !isOpen);
        toggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    });
  }


  /* ===========================================================
     FUNCTION 2: Sticky Bottom Call Button
     - Shows the button when scrollY > 300px
     - Hides the button when scrollY < 300px
     - Uses passive scroll listener for performance
     Also handles: header is-scrolled class (scrollY > 60px)
  =========================================================== */
  function initStickyCallButton() {
    var siteHeader = document.querySelector('.site-header');

    /**
     * Update UI based on current scroll position.
     */
    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset;

      /* Header shadow: add is-scrolled class after 60px */
      if (siteHeader) {
        if (scrollY > 60) {
          siteHeader.classList.add('is-scrolled');
        } else {
          siteHeader.classList.remove('is-scrolled');
        }
      }
    }

    /* Set correct initial state on page load */
    onScroll();

    /* Passive listener for scroll performance */
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* ===========================================================
     Initialize both functions after DOM is ready
  =========================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileNav();
      initStickyCallButton();
    });
  } else {
    /* DOM already parsed (defer ensures this path is taken) */
    initMobileNav();
    initStickyCallButton();
  }

})();
