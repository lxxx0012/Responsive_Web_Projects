document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  let isDragging = false;
  let startX, currentRotation = 0;

  // Function to start dragging
  const startDrag = (e) => {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX; // Support mouse and touch
    carousel.style.animationPlayState = "paused"; // Pause auto-rotation
  };

  // Function to handle dragging
  const onDrag = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX; // Support mouse and touch
    const deltaX = currentX - startX; // Calculate movement
    carousel.style.transform = `rotateY(${currentRotation + deltaX / 2}deg)`;
  };

  // Function to stop dragging
  const stopDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = currentX - startX;
    currentRotation += deltaX / 2; // Update the current rotation
    carousel.style.animationPlayState = "running"; // Resume auto-rotation
  };

  // Event listeners for mouse
  carousel.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);

  // Event listeners for touch
  carousel.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", stopDrag);
});
