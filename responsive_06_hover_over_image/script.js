const container = document.querySelector('.image-container'); // Select container
const mask = container.querySelector('.mask'); // Select red overlay mask

// Create a 2D canvas
const canvas = document.createElement('canvas');
canvas.width = mask.offsetWidth;
canvas.height = mask.offsetHeight;
const ctx = canvas.getContext('2d');

// Initialize the canvas to be fully red
ctx.fillStyle = 'rgba(255, 0, 0, 1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
mask.appendChild(canvas); // Add the canvas to the mask

// Listen for mouse movement and remove red in hovered areas
container.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position relative to canvas
    const y = e.clientY - rect.top; // Y position relative to canvas

    // Remove red by "erasing" a circular area at the cursor
    ctx.globalCompositeOperation = 'destination-out'; // This removes red in hovered areas
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, false); // Circle with 30px radius
    ctx.fill();
});
