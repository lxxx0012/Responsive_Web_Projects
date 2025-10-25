const containers = document.querySelectorAll('.image-container'); // Select all image containers

containers.forEach((container, index) => {
    const mask = container.querySelector('.mask'); // Select the mask for this container

    // Create a canvas for the red overlay
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth; // Match container width
    canvas.height = container.offsetHeight; // Match container height
    const ctx = canvas.getContext('2d');

    // Fill the canvas with red
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    mask.appendChild(canvas); // Append the canvas to the mask

    // Add hover behavior to reveal the image
    container.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect(); // Get canvas position
        const x = e.clientX - rect.left; // Mouse X position within canvas
        const y = e.clientY - rect.top; // Mouse Y position within canvas

        // Erase the red overlay in a circular area
        ctx.globalCompositeOperation = 'destination-out'; // This removes red
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2, false); // Erase a 30px radius circle
        ctx.fill();
    });

    // Debugging the initialization of each canvas
    console.log(`Canvas initialized for container ${index + 1}`);
});
