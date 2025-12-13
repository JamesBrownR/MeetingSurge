document.addEventListener('DOMContentLoaded', () => {
  let activeSlider = null;
  let sliderRect = null;

  const sliders = document.querySelectorAll('[data-ba-slider]');

  sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-slider-handle');
    const afterImage = slider.querySelector('.ba-image-after');

    // Initial position
    setPosition(slider, handle, afterImage, 50);

    handle.addEventListener('pointerdown', e => {
      activeSlider = { slider, handle, afterImage };
      sliderRect = slider.getBoundingClientRect();
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    slider.addEventListener('click', e => {
      if (e.target.closest('.ba-slider-handle')) return;
      sliderRect = slider.getBoundingClientRect();
      updateFromClientX(e.clientX);
    });
  });

  document.addEventListener('pointermove', e => {
    if (!activeSlider) return;
    updateFromClientX(e.clientX);
  });

  document.addEventListener('pointerup', () => {
    activeSlider = null;
    sliderRect = null;
  });

  function updateFromClientX(clientX) {
    const { slider, handle, afterImage } = activeSlider;

    let x = clientX - sliderRect.left;
    x = Math.max(0, Math.min(x, sliderRect.width));

    const percent = (x / sliderRect.width) * 100;
    setPosition(slider, handle, afterImage, percent);
  }

  function setPosition(slider, handle, afterImage, percent) {
    slider.style.setProperty('--ba-percent', `${percent}%`);
    handle.style.transform = `translateX(${percent}%)`;
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  }
});
