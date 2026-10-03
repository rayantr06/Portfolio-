// Small enhancements for the public static page; no application or account code.
(() => {
  const page = document.querySelector('[data-portfolio-page]');
  if (!page) return;
  const links = [...document.querySelectorAll('[data-section-link]')];
  const sections = [...document.querySelectorAll('[data-section]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scrollFrame = 0;
  let pointerFrame = 0;
  function updateSection() {
    scrollFrame = 0;
    const threshold = window.innerHeight * .3;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    for (const link of links) {
      if (link.dataset.sectionLink === current?.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateSection);
  }, { passive: true });
  window.addEventListener('resize', updateSection, { passive: true });
  window.addEventListener('pointermove', event => {
    if (reduceMotion.matches || event.pointerType !== 'mouse' || pointerFrame) return;
    const { clientX, clientY } = event;
    pointerFrame = requestAnimationFrame(() => {
      page.style.setProperty('--spot-x', `${clientX}px`);
      page.style.setProperty('--spot-y', `${clientY}px`);
      pointerFrame = 0;
    });
  }, { passive: true });
  updateSection();
})();
