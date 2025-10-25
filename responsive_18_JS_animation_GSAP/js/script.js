document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".animated-box");
  
    // Trigger GSAP animation on box click
    box.addEventListener("click", () => {
      gsap.to(".animated-box", {
        x: "300px", // Move horizontally
        y: "150px", // Move vertically
        rotation: 360, // Rotate 360 degrees
        scale: 1.5, // Scale up
        duration: 2, // Animation duration in seconds
        ease: "power2.out", // Smooth easing
        onComplete: () => {
          // Reset the box position and scale after animation completes
          gsap.to(".animated-box", {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    });
  });
  