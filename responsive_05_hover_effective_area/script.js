const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
    const mask = container.querySelector('.mask');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X within the container
        const y = e.clientY - rect.top;  // Mouse Y within the container

        // Dynamically update the clip-path to reveal the hovered area
        mask.style.clipPath = `circle(50px at ${x}px ${y}px)`; // 50px radius circle
    });

    container.addEventListener('mouseleave', () => {
        mask.style.clipPath = `circle(0% at 50% 50%)`; // Reset to fully cover the image
    });
});
