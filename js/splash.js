(function() {
  let splashActive = false;

  function createSplash() {
    let el = document.getElementById('splashOverlay');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'splashOverlay';
    el.className = 'splash-overlay hidden';
    el.innerHTML =
      '<div class="splash-logo">&#9889;</div>' +
      '<div class="splash-name">LogicSpark</div>' +
      '<div class="splash-credit">Developed by ARJUN M</div>' +
      '<div class="splash-spinner"></div>';
    document.body.appendChild(el);
    return el;
  }

  function showSplash(durationMs, onDone) {
    if (splashActive) return;
    splashActive = true;
    const el = createSplash();
    el.classList.remove('hidden', 'fade-out');
    void el.offsetWidth;
    const FADE = 400;
    setTimeout(function() {
      el.classList.add('fade-out');
      setTimeout(function() {
        el.classList.add('hidden');
        el.classList.remove('fade-out');
        splashActive = false;
        if (typeof onDone === 'function') onDone();
      }, FADE);
    }, Math.max(0, durationMs));
  }

  function splashGo(url, durationMs) {
    showSplash(durationMs, function() {
      window.location.href = url;
    });
  }

  window.showSplash = showSplash;
  window.splashGo = splashGo;
  window.splashActive = function() { return splashActive; };
})();