document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add 'visible' class when in viewport
        }
      });
    });
  
    const sections = document.querySelectorAll('.content'); // Target all content sections
    sections.forEach((section) => observer.observe(section)); // Observe each section
  });
  