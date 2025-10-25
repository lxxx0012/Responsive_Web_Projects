// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".animated-box");
  
    // Animate the box using GSAP
    gsap.to(box, {
      x: "100vw",       // Move horizontally across the full width of the viewport
      y: "100vh",       // Move vertically across the full height of the viewport
      rotation: 1440,    // Rotate 4 full spins (360 * 4)
      duration: 6,      // Animation duration in seconds
      repeat: -1,       // Infinite loop
      ease: "power1.inOut", // Smooth easing effect
      yoyo: true        // Reverse the animation after each cycle
    });
  });
  