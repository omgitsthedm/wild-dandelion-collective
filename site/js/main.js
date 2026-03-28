/* ==========================================================================
   The Wild Dandelion Collective — main.js
   Mobile menu, scroll reveal, year auto-fill, header scroll state
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Reduced motion check ---------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("open");

      if (!isOpen) {
        const firstLink = mobileNav.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("open");
        menuToggle.focus();
      }
    });

    /* Close menu when clicking a link */
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("open");
      });
    });
  }

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".site-header");

  if (header) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            if (window.scrollY > 20) {
              header.classList.add("scrolled");
            } else {
              header.classList.remove("scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  if (!prefersReducedMotion) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      /* Fallback: show everything */
      reveals.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  /* ---------- Year auto-fill ---------- */
  var yearEls = document.querySelectorAll(".js-year");
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });
})();
