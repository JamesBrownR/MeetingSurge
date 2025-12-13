document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-ba-slider]');
  let active = null;
  let rect = null;
  let rafId = null;

  sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-slider-handle');
    const afterImage = slider.querySelector('.ba-image-after');

    setPosition(slider, handle, afterImage, 50);

    slider.addEventListener('pointerdown', e => {
      active = { slider, handle, afterImage };
      rect = slider.getBoundingClientRect();
      slider.setPointerCapture(e.pointerId);
      updateFromEvent(e);
    });

    slider.addEventListener('click', e => {
      if (e.target.closest('.ba-slider-handle')) return;
      rect = slider.getBoundingClientRect();
      updateFromEvent(e);
    });
  });

  document.addEventListener('pointermove', e => {
    if (!active) return;
    updateFromEvent(e);
  });

  document.addEventListener('pointerup', () => {
    active = null;
    rect = null;
    cancelAnimationFrame(rafId);
  });

  function updateFromEvent(e) {
    if (!rect) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;

    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      setPosition(
        active.slider,
        active.handle,
        active.afterImage,
        percent
      );
      rafId = null;
    });
  }

  function setPosition(slider, handle, afterImage, percent) {
    handle.style.left = `${percent}%`;
    afterImage.style.transform = `scaleX(${percent / 100})`;
  }
});
