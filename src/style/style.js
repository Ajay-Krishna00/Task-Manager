const cursor = document.querySelector(".custom-cursor");
const button = document.querySelector(".custom-cursor-button");

// Track mouse movement within the button
button.addEventListener("mousemove", (e) => {
  // Position the custom cursor
  const rect = button.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  cursor.style.left = `${offsetX}px`;
  cursor.style.top = `${offsetY}px`;
});
