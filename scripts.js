/* BEFORE/AFTER SLIDER - OPTIMIZED */
document.addEventListener('DOMContentLoaded', () => {

  // Wait for the window to finish loading
  window.addEventListener('load', () => {
    // Wait an additional 3 seconds (3000ms) to clear LCP paint time
    setTimeout(() => {
      const logo = document.getElementById('logo');
      if (logo) {
        logo.classList.add('is-animating');
      }
    }, 3000);
  });
  
  document.querySelectorAll('[data-ba-slider]').forEach(slider => {
    const handle = slider.querySelector('.ba-slider-handle');
    const afterImage = slider.querySelector('.ba-image-after');
    let isDragging = false;
    let animationFrameId = null;
    let currentPosition = 50;

    const updatePosition = (pct) => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Batch DOM writes in a single animation frame
      animationFrameId = requestAnimationFrame(() => {
        handle.style.left = pct + '%';
        afterImage.style.clipPath = `inset(0 0 0 ${pct}%)`;
        currentPosition = pct;
      });
    };

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPosition = (offsetX / rect.width) * 100;
      
      // Only update if position changed significantly (reduces unnecessary reflows)
      if (Math.abs(newPosition - currentPosition) > 0.1) {
        updatePosition(newPosition);
      }
    };

    // Initial position
    updatePosition(50);

    // Mouse events
    handle.addEventListener('mousedown', (e) => { 
      isDragging = true; 
      e.preventDefault(); 
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => { 
      isDragging = true; 
      e.preventDefault(); 
    }, { passive: false });

    // End dragging
    const stopDragging = () => {
      isDragging = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    // Move events
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    // Click to position
    slider.addEventListener('click', (e) => {
      if (!e.target.closest('.ba-slider-handle')) {
        updateSlider(e.clientX);
      }
    });
  });
});
