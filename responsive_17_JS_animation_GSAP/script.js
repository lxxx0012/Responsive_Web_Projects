// GSAP Animation
document.addEventListener("DOMContentLoaded", () => {
    gsap.to(".box", {
      x: "100vw", // Moves the box horizontally
      y: "0", // Moves the box vertically
      rotation: 360, // Rotates the box 360 degrees
      duration: 3, // Animation duration (seconds)
      repeat: -1, // Repeat infinitely
      yoyo: true, // Reverse back to original state
      ease: "power1.inOut" // Smooth easing
    });
  });
  