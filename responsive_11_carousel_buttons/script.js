// Select elements
const track = document.querySelector('.carousel-track');
const leftButton = document.querySelector('.carousel-button.left');
const rightButton = document.querySelector('.carousel-button.right');
const items = document.querySelectorAll('.carousel-item');

// Initialize variables
let currentIndex = 0; // Tracks the current slide index

// Function to update the carousel position
function updateCarousel() {
    const itemWidth = items[0].clientWidth; // Get the width of a single item
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`; // Shift the track
}
// Move carousel to the next image
rightButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++; // Increment the index
        updateCarousel(); // Update the carousel position
    }
});

// Move carousel to the previous image
leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Decrement the index
        updateCarousel(); // Update the carousel position
    }
});


