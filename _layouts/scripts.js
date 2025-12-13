/* ========================================
   BEFORE/AFTER SLIDER JAVASCRIPT
   Add this to your main JS file or include as separate script
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all sliders on the page
  const sliders = document.querySelectorAll('[data-ba-slider]');
  
  sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-slider-handle');
    const afterImage = slider.querySelector('.ba-image-after');
    let isDragging = false;

    // Set initial position (50%)
    updateSliderPosition(50);

    // Mouse Events
    handle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDragging);

    // Touch Events (for mobile)
    handle.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', stopDragging);

    // Click anywhere on slider to move handle
    slider.addEventListener('click', onSliderClick);

    function startDragging(e) {
      isDragging = true;
      e.preventDefault();
    }

    function stopDragging() {
      isDragging = false;
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      updateSlider(e.clientX);
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    }

    function onSliderClick(e) {
      // Don't trigger if clicking on handle
      if (e.target.closest('.ba-slider-handle')) return;
      updateSlider(e.clientX);
    }

    function updateSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      
      // Clamp between 0 and width
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      
      // Convert to percentage
      const percentage = (offsetX / rect.width) * 100;
      updateSliderPosition(percentage);
    }

    function updateSliderPosition(percentage) {
      // Update handle position
      handle.style.left = percentage + '%';
      
      // Update after image clip
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  });
});
