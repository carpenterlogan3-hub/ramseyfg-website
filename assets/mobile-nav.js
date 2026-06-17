/* Ramsey Financial Group — mobile navigation
 * Progressive enhancement for the existing .nav-toggle hamburger.
 * Reads each page's own .nav-links + .nav-cta (so links/paths stay correct
 * per page), builds an accessible drop panel, and wires toggle / link-close /
 * outside-click / Esc / focus management. Active only below the existing
 * 1020px breakpoint; the desktop nav is untouched.
 */
(function () {
  'use strict';

  function init() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var toggle = nav.querySelector('.nav-toggle');
    var links = nav.querySelector('.nav-links');
    if (!toggle || !links) return;
    if (nav.querySelector('.rfg-mnav-panel')) return; // guard against double init

    injectStyles();

    // Build the panel from the page's existing links + CTA.
    var panel = document.createElement('div');
    panel.className = 'rfg-mnav-panel';
    panel.id = 'rfg-mobile-menu';

    var list = document.createElement('ul');
    list.className = 'rfg-mnav-list';
    links.querySelectorAll('a').forEach(function (a) {
      var li = document.createElement('li');
      var clone = a.cloneNode(true);
      clone.className = 'rfg-mnav-link';
      li.appendChild(clone);
      list.appendChild(li);
    });
    panel.appendChild(list);

    var cta = nav.querySelector('.nav-cta');
    if (cta) {
      var ctaClone = cta.cloneNode(true);
      ctaClone.classList.add('rfg-mnav-cta');
      panel.appendChild(ctaClone);
    }

    nav.appendChild(panel);

    // Accessibility wiring on the toggle button.
    toggle.setAttribute('aria-controls', panel.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function focusable() {
      return panel.querySelectorAll('a[href], button:not([disabled])');
    }

    function open() {
      panel.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.addEventListener('keydown', onKeydown);
      document.addEventListener('click', onDocClick, true);
      var first = focusable()[0];
      if (first) first.focus();
    }

    function close(returnFocus) {
      panel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('click', onDocClick, true);
      if (returnFocus) toggle.focus();
    }

    function isOpen() {
      return panel.classList.contains('is-open');
    }

    function onKeydown(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        close(true);
        return;
      }
      if (e.key === 'Tab') {
        var items = focusable();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function onDocClick(e) {
      if (!nav.contains(e.target)) close(false);
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen()) close(false); else open();
    });

    // Link clicks: close the menu, and smooth-scroll for same-page anchors
    // (cloned links don't carry the page's existing scroll handler).
    panel.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link || !panel.contains(link)) return;
      var href = link.getAttribute('href') || '';
      close(false);
      if (href.charAt(0) === '#' && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navH = nav.offsetHeight;
          window.scrollTo({
            top: target.offsetTop - navH - 8,
            behavior: reduceMotion ? 'auto' : 'smooth'
          });
        }
      }
    });

    // If the viewport grows past the breakpoint while open, reset cleanly.
    window.matchMedia('(min-width: 1021px)').addEventListener('change', function (ev) {
      if (ev.matches && isOpen()) close(false);
    });
  }

  function injectStyles() {
    if (document.getElementById('rfg-mnav-styles')) return;
    var css =
      '.rfg-mnav-panel{display:none;position:absolute;top:100%;left:0;right:0;' +
      'background:var(--bone);border-top:1px solid var(--rule);' +
      'box-shadow:0 14px 28px rgba(15,26,20,.14);max-height:calc(100vh - 100%);' +
      'overflow-y:auto;-webkit-overflow-scrolling:touch;padding:8px 0 18px;}' +
      '.rfg-mnav-list{list-style:none;margin:0;padding:0;}' +
      '.rfg-mnav-link{display:block;padding:14px 24px;min-height:24px;' +
      'font-family:var(--sans);font-size:15px;font-weight:500;color:var(--ink);' +
      'text-decoration:none;border-bottom:1px solid var(--rule);}' +
      '.rfg-mnav-link:hover,.rfg-mnav-link:focus{color:var(--forest);' +
      'background:var(--bone-soft);outline:none;}' +
      '.rfg-mnav-link::after{display:none;}' +
      '.rfg-mnav-cta{display:block;margin:16px 24px 4px;padding:14px 20px;' +
      'text-align:center;font-family:var(--sans);font-size:14px;font-weight:500;' +
      'color:var(--forest);border:1px solid var(--forest);text-decoration:none;}' +
      '.rfg-mnav-cta:hover,.rfg-mnav-cta:focus{background:var(--forest);' +
      'color:var(--bone);outline:none;}' +
      '.nav-toggle.is-open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}' +
      '.nav-toggle.is-open span:nth-child(2){opacity:0;}' +
      '.nav-toggle.is-open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}' +
      '@media (max-width:1020px){.rfg-mnav-panel.is-open{display:block;}}' +
      '@media (min-width:1021px){.rfg-mnav-panel{display:none!important;}}' +
      '@media (prefers-reduced-motion:no-preference){' +
      '.nav-toggle span{transition:transform .2s ease,opacity .2s ease;}}';
    var style = document.createElement('style');
    style.id = 'rfg-mnav-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
