/* Shared helpers for all funnel pages. Reads window.FUNNEL_CONFIG. */
(function () {
  var C = window.FUNNEL_CONFIG || {};

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function waLink(text) {
    return "https://wa.me/" + (C.whatsappNumber || "") + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  // Brand in header/footer
  document.querySelectorAll("[data-brand]").forEach(function (el) {
    if (C.logoUrl) {
      el.innerHTML = '<img src="' + esc(C.logoUrl) + '" alt="' + esc(C.brandName) + '">';
    } else {
      el.innerHTML =
        '<span class="brand-mark" aria-hidden="true">10x</span>' +
        '<span class="brand-name">' + esc(C.brandName) +
        '<span class="brand-sub">WhatsApp API + Automation for Shops</span></span>';
    }
  });

  // Simple text bindings: <span data-cfg="priceBasic"></span>
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = C[el.getAttribute("data-cfg")];
    if (v != null) el.textContent = v;
  });

  // Phone / WhatsApp links
  document.querySelectorAll("[data-call]").forEach(function (a) { a.href = "tel:+91" + C.phone; });
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa") || "नमस्कार, मला WhatsApp API बद्दल माहिती हवी आहे.");
    a.target = "_blank"; a.rel = "noopener";
  });

  // Testimonials — only real ones from config. Hidden when empty.
  document.querySelectorAll("[data-testimonials]").forEach(function (sec) {
    var list = C.testimonials || [];
    if (!list.length) { sec.classList.add("hidden"); return; }
    var box = sec.querySelector(".testis");
    box.innerHTML = list.map(function (t) {
      return '<figure class="testi"><blockquote style="margin:0">“' + esc(t.quote) + '”</blockquote>' +
        '<figcaption class="who">' + (t.photo ? '<img src="' + esc(t.photo) + '" alt="">' : "") +
        '<span><b>' + esc(t.name) + '</b><small>' + esc(t.business) + (t.city ? ", " + esc(t.city) : "") +
        '</small></span></figcaption></figure>';
    }).join("");
  });

  // Meta Pixel (optional)
  // Pixel base code is inline in each page's <head>. This is only a fallback if it was removed.
  if (C.metaPixelId && !window.fbq) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", C.metaPixelId);
    window.fbq("track", "PageView");
  }

  window.FUNNEL = { C: C, esc: esc, waLink: waLink,
    track: function (ev, data) { if (window.fbq) window.fbq("track", ev, data || {}); },
    trackCustom: function (ev, data) { if (window.fbq) window.fbq("trackCustom", ev, data || {}); } };
})();
