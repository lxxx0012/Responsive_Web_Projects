const track = document.querySelector('.carousel-track');
let index = 0;

function moveCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    track.appendChild(items[0]); // Move the first image to the end
    track.style.transition = 'none'; // Disable animation for smooth looping
    track.style.transform = 'translateX(0)'; // Reset the position
}

// Trigger the carousel to reset images at specific intervals
setInterval(moveCarousel, 3000); // Change images every 3 seconds