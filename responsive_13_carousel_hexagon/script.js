document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    let isDragging = false;
    let startX, currentRotation = 0;
  
    // Handle mouse and touch events
    const startDrag = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches[0].clientX;
      carousel.style.animationPlayState = "paused"; // Pause auto-rotation
    };
  
    const moveDrag = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches[0].clientX;
      const deltaX = currentX - startX;
      carousel.style.transform = `rotateY(${currentRotation + deltaX / 2}deg)`;
    };
  
    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const deltaX = currentX - startX;
      currentRotation += deltaX / 2; // Save rotation
      carousel.style.animationPlayState = "running"; // Resume auto-rotation
    };
  
    // Event listeners for mouse and touch
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
  });
  