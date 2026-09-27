/* Tarh & Afarinesh — V2 ARCHITECTURAL MEDIA HANDOFF
   Shared engine for every "list + media preview" interface (Projects, Expertise, Awards,
   About/People). THE FRAME STAYS. THE VIEW CHANGES. — one continuous two-layer stage that is
   never replaced by an instant background-image swap.

   Imperative DOM, not React state: continuous transform/opacity/clip-path never touches
   setState, so a fast hover sweep never triggers a re-render storm.

   Event-driven only: mount() attaches nothing ongoing. show() runs one CSS transition per
   call, cleaned up via transitionend + a timeout fallback (no permanent loop, no rAF/IO
   dependency — both are unreliable in this preview environment per the rest of the V2 runtime).

   Interruption: a call to show() while a previous transition is still in flight finalizes that
   transition INSTANTLY (jumps it to its end state) before starting the new one — the latest
   request always wins, nothing queues, nothing fights.

   API:
     const h = TA_MEDIA_HANDOFF.mount(stageEl, { intensity: "high"|"medium"|"low"|"calm" });
     h.show({ src, pos, size, repeat, index });   // index optional — drives reveal direction
     h.destroy();
*/
(function () {
  var PRESETS = {
    high:   { scale: 1.025, dur: 620, reg: true  },
    medium: { scale: 1.02,  dur: 560, reg: true  },
    low:    { scale: 1.015, dur: 520, reg: true  },
    /* calm currently backs the About/People portrait stage only — verticals must never visibly
       zoom, so this preset stays at scale 1 (no zoom at all), unlike the other three. */
    calm:   { scale: 1,     dur: 480, reg: false }
  };
  var EASE = "cubic-bezier(.22,.61,.16,1)";

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function makeLayer(z) {
    var d = document.createElement("div");
    var s = d.style;
    s.position = "absolute"; s.inset = "0";
    s.backgroundSize = "cover"; s.backgroundPosition = "50% 50%"; s.backgroundRepeat = "no-repeat";
    s.zIndex = String(z); s.opacity = "0"; s.willChange = "opacity,transform,clip-path";
    return d;
  }

  function paint(el, d) {
    el.style.backgroundImage = d && d.src ? "url(\"" + d.src + "\")" : "none";
    el.style.backgroundPosition = (d && d.pos) || "50% 50%";
    el.style.backgroundSize = (d && d.size) || "cover";
    el.style.backgroundRepeat = (d && d.repeat) || "no-repeat";
  }

  function mount(stage, opts) {
    if (!stage) return { show: function () {}, destroy: function () {} };
    opts = opts || {};
    var preset = PRESETS[opts.intensity] || PRESETS.medium;

    if (getComputedStyle(stage).position === "static") stage.style.position = "relative";
    stage.style.overflow = "hidden";

    var A = makeLayer(1), B = makeLayer(2);
    var before = opts.before && opts.before.parentNode === stage ? opts.before : null;
    stage.insertBefore(A, before); stage.insertBefore(B, before);
    var reg = null;
    if (preset.reg) {
      reg = document.createElement("div");
      reg.setAttribute("aria-hidden", "true");
      var rs = reg.style;
      rs.position = "absolute"; rs.left = "0"; rs.right = "0"; rs.height = "2px";
      rs.zIndex = "3"; rs.pointerEvents = "none"; rs.background = "var(--turq)"; rs.opacity = "0";
      stage.insertBefore(reg, before);
    }

    var front = A, back = B, curKey = null, curIndex = null, gen = 0;
    var inFlight = false, timers = [];

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function after(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

    function finalizeInstant() {
      clearTimers();
      back.style.transition = "none";
      back.style.opacity = "1"; back.style.transform = "none"; back.style.clipPath = "none";
      front.style.transition = "none"; front.style.opacity = "0"; front.style.transform = "none";
      if (reg) { reg.style.transition = "none"; reg.style.opacity = "0"; }
      var t = front; front = back; back = t;
      inFlight = false;
    }

    function show(data) {
      if (!data || !data.src || stage.isConnected === false) return;
      var key = data.src + "|" + (data.pos || "");
      if (key === curKey) { if (data.index != null) curIndex = data.index; return; }
      var dir = (data.index != null && curIndex != null) ? (data.index >= curIndex ? 1 : -1) : 1;
      gen++;
      var myGen = gen;

      if (curKey == null) {
        paint(front, data);
        front.style.transition = "none"; front.style.opacity = "1"; front.style.transform = "none"; front.style.clipPath = "none";
        curKey = key; if (data.index != null) curIndex = data.index;
        return;
      }

      if (inFlight) finalizeInstant();

      var img = new Image();
      img.onload = proceed;
      img.onerror = function () { /* keep current visible — no blank frame, no broken state */ };
      img.src = data.src;

      function proceed() {
        if (myGen !== gen) return; // superseded by a newer request while the image was loading
        curKey = key; if (data.index != null) curIndex = data.index;
        inFlight = true;

        if (reducedMotion()) {
          paint(back, data);
          back.style.transition = "none"; back.style.opacity = "1"; back.style.transform = "none"; back.style.clipPath = "none";
          front.style.transition = "none"; front.style.opacity = "0";
          var t0 = front; front = back; back = t0;
          inFlight = false;
          return;
        }

        paint(back, data);
        var dur = preset.dur, ease = EASE;
        var openFrom = dir > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)";

        back.style.transition = "none";
        back.style.clipPath = openFrom;
        back.style.transform = "scale(" + preset.scale + ")";
        back.style.opacity = "0";
        front.style.transition = "none";

        if (reg) {
          reg.style.transition = "none";
          reg.style.top = dir > 0 ? "100%" : "0%";
          reg.style.opacity = "0";
        }

        // force layout before enabling transitions so the browser animates FROM the state just set
        void back.offsetHeight;

        requestTick(function () {
          back.style.transition = "clip-path " + dur + "ms " + ease + ",transform " + dur + "ms " + ease + ",opacity " + (dur * 0.7) + "ms " + ease;
          back.style.clipPath = "inset(0 0 0 0)";
          back.style.transform = "scale(1)";
          back.style.opacity = "1";

          front.style.transition = "opacity " + (dur * 0.6) + "ms " + ease + ",transform " + dur + "ms " + ease;
          front.style.opacity = "0";
          front.style.transform = "scale(0.985)";

          if (reg) {
            reg.style.transition = "top " + dur + "ms " + ease;
            reg.style.opacity = "1";
            reg.style.top = "0%";
            after(Math.round(dur * 0.55), function () {
              if (myGen !== gen) return;
              reg.style.transition = "opacity " + Math.round(dur * 0.4) + "ms " + ease;
              reg.style.opacity = "0";
            });
          }
        });

        var done = false;
        function finish() {
          if (done || myGen !== gen) return;
          done = true;
          front.style.transition = "none"; front.style.opacity = "0"; front.style.transform = "none";
          back.style.transition = "none";
          var t = front; front = back; back = t;
          inFlight = false;
        }
        back.addEventListener("transitionend", finish, { once: true });
        after(dur + 90, finish); // fallback — transitionend can be missed if the layer is re-touched mid-flight
      }
    }

    function requestTick(fn) {
      // rAF is unreliable in this preview environment (per the rest of the V2 runtime) — a short
      // timeout still yields one paint before the transition properties are applied.
      after(1, fn);
    }

    function destroy() {
      clearTimers();
      if (A.parentNode) A.parentNode.removeChild(A);
      if (B.parentNode) B.parentNode.removeChild(B);
      if (reg && reg.parentNode) reg.parentNode.removeChild(reg);
    }

    return { show: show, destroy: destroy };
  }

  window.TA_MEDIA_HANDOFF = { mount: mount };
})();
