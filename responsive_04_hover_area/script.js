const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
    const mask = container.querySelector('.mask');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // Calculate mouse X position
        const y = e.clientY - rect.top;  // Calculate mouse Y position

        // Create the circle at the cursor position
        mask.style.clipPath = `circle(50px at ${x}px ${y}px)`; // Radius: 50px
    });

    // Reset the clip-path when the mouse leaves the container
    container.addEventListener('mouseleave', () => {
        mask.style.clipPath = `circle(0% at 50% 50%)`; // Reset to fully covered
    });
});
