// Define image file names
const images = ["an image.png", "A warrior.png", "Taurus goddess.png"];
const imageFolder = "images/";

// Select the container
const container = document.getElementById("imageContainer");

// Dynamically create placeholders for lazy-loaded images
images.forEach(image => {
  const imgElement = document.createElement("img");
  imgElement.src = `${imageFolder}placeholder.jpg`; // Use a placeholder
  imgElement.dataset.src = `${imageFolder}${image}`; // Actual image path
  imgElement.alt = "Lazy Loaded Image";
  imgElement.classList.add("lazy-load", "placeholder");
  container.appendChild(imgElement);
});

// Lazy load images using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('.lazy-load[data-src]');

  lazyImages.forEach(image => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('placeholder');
          observer.unobserve(img);
        }
      });
    });
    observer.observe(image);
  });
});
