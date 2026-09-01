/* LogicSpark - Live Particle Background
 * Glowing drifting particles rendered on a fixed canvas.
 * Visible ONLY in dark theme when enabled (default: on).
 * Controlled from Settings via localStorage key "logicspark_particles".
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'logicspark_particles';
  var LINK_DIST = 110;
  var LINK_ALPHA = 0.14;

  var canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var running = false;
  var raf = null;
  var DPR = Math.max(1, window.devicePixelRatio || 1);

  function particlesOn() {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  }

  function darkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    spawn();
  }

  function spawn() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var count = Math.max(30, Math.min(160, Math.round(w * h / 14000)));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(0.05 + Math.random() * 0.25),
        o: 0.25 + Math.random() * 0.45,
        hue: 255 + Math.random() * 70,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  function frame(t) {
    if (!running) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    var i, j, p, dx, dy, d2;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
      if (p.x < -8) { p.x = w + 8; }
      else if (p.x > w + 8) { p.x = -8; }

      var tw = p.o * (0.6 + 0.4 * Math.sin(t / 1000 * 1.6 + p.tw));
      ctx.beginPath();
      ctx.globalAlpha = Math.max(0.05, tw);
      ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 70%, 1)';
      ctx.shadowColor = 'hsla(' + p.hue + ', 90%, 62%, 1)';
      ctx.shadowBlur = 9;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    for (i = 0; i < particles.length; i++) {
      for (j = i + 1; j < particles.length; j++) {
        dx = particles[i].x - particles[j].x;
        dy = particles[i].y - particles[j].y;
        d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          var a = (1 - Math.sqrt(d2) / LINK_DIST) * LINK_ALPHA;
          ctx.strokeStyle = 'hsla(265, 85%, 70%, ' + a.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(frame);
  }

  function sync() {
    var shouldRun = particlesOn() && darkMode() && !reduceMotion() && !document.hidden;
    if (shouldRun === running) {
      canvas.style.display = shouldRun ? 'block' : 'none';
      if (shouldRun && particles.length === 0) spawn();
      return;
    }
    running = shouldRun;
    canvas.style.display = shouldRun ? 'block' : 'none';
    if (running) {
      resize();
      raf = requestAnimationFrame(frame);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', sync);

  var observer = new MutationObserver(sync);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  window.LogicSparkParticles = { refresh: sync, isOn: particlesOn };

  sync();
})();