/* ===================================================
   Transparent 1.0 — Main JS
   Scroll reveal, navbar state, box hover effects
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------- Box cursor-tracking glow ---------- */
  const boxes = document.querySelectorAll('.info-box');

  boxes.forEach((box) => {
    // Inject glow element
    const glow = document.createElement('div');
    glow.classList.add('box-glow');
    box.appendChild(glow);

    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      glow.style.opacity = '1';
    });

    box.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  });

});
