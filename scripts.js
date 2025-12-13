/* BEFORE/AFTER SLIDER */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ba-slider]').forEach(slider => {
    const handle = slider.querySelector('.ba-slider-handle');
    const afterImage = slider.querySelector('.ba-image-after');
    let isDragging = false;

    const updatePosition = (pct) => {
      handle.style.left = pct + '%';
      afterImage.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      updatePosition((offsetX / rect.width) * 100);
    };

    updatePosition(50); // Initial position

    handle.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
    handle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);
    document.addEventListener('mousemove', (e) => isDragging && updateSlider(e.clientX));
    document.addEventListener('touchmove', (e) => isDragging && updateSlider(e.touches[0].clientX));
    slider.addEventListener('click', (e) => !e.target.closest('.ba-slider-handle') && updateSlider(e.clientX));
  });
});
