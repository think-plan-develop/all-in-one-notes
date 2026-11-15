(function () {
  var storageKey = 'all-in-one-notes:black-background';
  var style = document.createElement('style');
  style.textContent =
    'html.global-black-background, html.global-black-background body {' +
    'background: #000 !important;' +
    '}' +
    '.global-theme-header {' +
    'position: relative;' +
    '}' +
    '.global-background-toggle {' +
    'position: absolute;' +
    'top: 8px;' +
    'right: 12px;' +
    'z-index: 2147483647;' +
    'display: inline-flex;' +
    'align-items: center;' +
    'justify-content: center;' +
    'width: 36px;' +
    'height: 36px;' +
    'padding: 8px;' +
    'border: 1px solid rgba(148, 163, 184, .65);' +
    'border-radius: 10px;' +
    'background: #fff;' +
    'color: #111827;' +
    'font: 600 13px/1.2 system-ui, sans-serif;' +
    'box-shadow: 0 3px 10px rgba(0, 0, 0, .2);' +
    'cursor: pointer;' +
    '}' +
    '.global-theme-toggle-slot .global-background-toggle {' +
    'position: static;' +
    '}' +
    '.global-background-toggle-icon {' +
    'font-size: 16px;' +
    'line-height: 1;' +
    '}' +
    '.global-background-toggle-fallback {' +
    'position: fixed;' +
    'top: 16px;' +
    'right: 16px;' +
    '}' +
    '.global-background-toggle:focus-visible {' +
    'outline: 3px solid #60a5fa;' +
    'outline-offset: 3px;' +
    '}';
  document.head.appendChild(style);

  var button = null;
  if (window.self === window.top) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'global-background-toggle';
    button.innerHTML = '<span class="global-background-toggle-icon" aria-hidden="true"></span>';
    var slot = document.querySelector('.global-theme-toggle-slot');
    var header = document.querySelector('.topbar, header, .header, .header-section, .page-header, .hdr');
    if (slot) {
      slot.appendChild(button);
    } else if (header) {
      if (window.getComputedStyle(header).position === 'static') {
        header.classList.add('global-theme-header');
      }
      header.appendChild(button);
    } else {
      button.classList.add('global-background-toggle-fallback');
      document.body.appendChild(button);
    }
  }

  function applyBackground(isBlack) {
    document.documentElement.classList.toggle('global-black-background', isBlack);
    if (button) {
      button.querySelector('.global-background-toggle-icon').textContent = isBlack ? '\u2600' : '\u263E';
      button.setAttribute('aria-label', isBlack ? 'Restore background' : 'Black background');
      button.setAttribute('aria-pressed', String(isBlack));
    }
  }

  function readPreference() {
    try {
      return window.localStorage.getItem(storageKey) === 'true';
    } catch (error) {
      console.error('Unable to read the saved background preference.', error);
      return false;
    }
  }

  function savePreference(isBlack) {
    try {
      window.localStorage.setItem(storageKey, String(isBlack));
    } catch (error) {
      console.error('Unable to save the background preference.', error);
    }
  }

  applyBackground(readPreference());

  if (button) {
    button.addEventListener('click', function () {
      var isBlack = !document.documentElement.classList.contains('global-black-background');
      applyBackground(isBlack);
      savePreference(isBlack);
    });
  }

  window.addEventListener('storage', function (event) {
    if (event.key === storageKey) {
      applyBackground(event.newValue === 'true');
    }
  });
})();
