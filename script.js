// slider: show slides, dots, prev/next, click right/left to navigate
document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.slider-images img'));
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const sliderImagesEl = document.querySelector('.slider-images');
  if (!images.length || !dotsContainer) return;

  // create dots if count mismatch
  if (dotsContainer.children.length !== images.length) {
    dotsContainer.innerHTML = images.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('');
  }
  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

  let current = images.findIndex(img => img.classList.contains('active'));
  if (current === -1) current = 0;

  function showSlide(idx) {
    idx = (idx + images.length) % images.length;
    images.forEach((img, i) => img.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  // dots click
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  // arrows
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(current + 1); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(current - 1); });

  // keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showSlide(current + 1);
    if (e.key === 'ArrowLeft') showSlide(current - 1);
  });

  // click image area: right half -> next, left half -> prev
  if (sliderImagesEl) {
    sliderImagesEl.addEventListener('click', (e) => {
      const rect = sliderImagesEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x > rect.width / 2) showSlide(current + 1);
      else showSlide(current - 1);
    });
  }

  // ensure initial state
  showSlide(current);
});