document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    let isDragging = false;
    let startX, currentRotation = 0;
  
    // Start dragging
    const startDrag = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches[0].clientX;
      carousel.style.animationPlayState = "paused"; // Pause auto-rotation
    };
  
    // Handle dragging
    const onDrag = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches[0].clientX;
      const deltaX = currentX - startX;
      carousel.style.transform = `rotateY(${currentRotation + deltaX / 2}deg)`;
    };
  
    // Stop dragging
    const stopDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const deltaX = currentX - startX;
      currentRotation += deltaX / 2; // Save the rotation
      carousel.style.animationPlayState = "running"; // Resume auto-rotation
    };
  
    // Event listeners for mouse and touch
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  });
  