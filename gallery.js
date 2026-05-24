/**
 * LUMINA Gallery — gallery.js
 * Handles: filtering, lightbox open/close/navigate, CSS image filters
 */

(function () {
  "use strict";

  /* ── DATA ─────────────────────────────────── */
  const items = Array.from(document.querySelectorAll(".gallery-item"));

  // Build a flat array of visible (non-hidden) items for lightbox navigation
  let visibleItems = [...items];

  /* ── FILTER ───────────────────────────────── */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const countEl    = document.getElementById("visible-count");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hidden", !match);
      });

      visibleItems = items.filter((i) => !i.classList.contains("hidden"));
      countEl.textContent = visibleItems.length;
    });
  });

  /* ── LIGHTBOX ELEMENTS ────────────────────── */
  const lightbox = document.getElementById("lightbox");
  const backdrop = document.getElementById("lb-backdrop");
  const lbImg    = document.getElementById("lb-img");
  const lbTitle  = document.getElementById("lb-title");
  const lbCat    = document.getElementById("lb-cat");
  const lbCounter= document.getElementById("lb-counter");
  const lbLoader = document.getElementById("lb-loader");
  const lbClose  = document.getElementById("lb-close");
  const lbPrev   = document.getElementById("lb-prev");
  const lbNext   = document.getElementById("lb-next");

  let currentIndex = 0;
  let currentFilter = "none";

  /* ── OPEN LIGHTBOX ────────────────────────── */
  function openLightbox(item) {
    const indexInVisible = visibleItems.indexOf(item);
    if (indexInVisible === -1) return;
    currentIndex = indexInVisible;
    renderLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  /* ── RENDER IMAGE ─────────────────────────── */
  function renderLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;

    const img     = item.querySelector("img");
    const title   = item.querySelector(".item-title").textContent;
    const cat     = item.querySelector(".item-cat").textContent;
    const src     = img.src.replace(/w=\d+/, "w=1400"); // request larger image

    // Show loader
    lbLoader.classList.add("active");
    lbImg.classList.add("loading");

    const tmpImg = new Image();
    tmpImg.onload = () => {
      lbImg.src    = src;
      lbImg.alt    = title;
      lbImg.style.filter = currentFilter === "none" ? "" : currentFilter;
      lbImg.classList.remove("loading");
      lbLoader.classList.remove("active");
    };
    tmpImg.onerror = () => {
      lbImg.src = img.src;
      lbImg.classList.remove("loading");
      lbLoader.classList.remove("active");
    };
    tmpImg.src = src;

    lbTitle.textContent   = title;
    lbCat.textContent     = cat;
    lbCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
  }

  /* ── NAVIGATE ─────────────────────────────── */
  function navigate(dir) {
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    renderLightbox();
  }

  lbPrev.addEventListener("click", (e) => { e.stopPropagation(); navigate(-1); });
  lbNext.addEventListener("click", (e) => { e.stopPropagation(); navigate(+1); });

  /* ── CLOSE LIGHTBOX ───────────────────────── */
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    // Reset filter UI
    resetFilterPills();
    currentFilter = "none";
    lbImg.style.filter = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  /* ── KEYBOARD NAVIGATION ──────────────────── */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(+1);
    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   navigate(-1);
    if (e.key === "Escape") closeLightbox();
  });

  /* ── OPEN VIA ZOOM BUTTON OR ITEM CLICK ───── */
  items.forEach((item) => {
    const zoomBtn = item.querySelector(".zoom-btn");
    zoomBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(item);
    });
    item.addEventListener("click", () => openLightbox(item));
  });

  /* ── IMAGE FILTERS ────────────────────────── */
  const filterPills = document.querySelectorAll(".filter-pill");

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.cssFilter;
      lbImg.style.filter = currentFilter === "none" ? "" : currentFilter;
    });
  });

  function resetFilterPills() {
    filterPills.forEach((p) => p.classList.remove("active"));
    filterPills[0]?.classList.add("active");
  }

  /* ── TOUCH / SWIPE ────────────────────────── */
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? +1 : -1);
  }, { passive: true });

})();
