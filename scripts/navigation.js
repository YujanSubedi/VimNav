window.website_mode = window.website_mode || "navigation";

function updateStatusBar() {
  let floatingBar = document.getElementById("Status_Bar");

  // Create a floatingBar on left bottom
  if (!floatingBar) {
    floatingBar = document.createElement("div");
    floatingBar.id = "Status_Bar";
    document.body.appendChild(floatingBar);
    floatingBar.style.position = "fixed";
    floatingBar.style.bottom = "0";
    floatingBar.style.left = "0";
    floatingBar.style.width = "2em";
    floatingBar.style.textAlign = "center";
    floatingBar.style.padding = "0 0";
    floatingBar.style.fontSize = "0.8em";
    floatingBar.style.zIndex = "1000"; // Ensure it stays above other content
  }

  // Navigation mode color
  if (window.website_mode === "navigation") {
    floatingBar.textContent = "N";
    floatingBar.style.color = "#7c7e93";
    floatingBar.style.backgroundColor = "#2e303e";
    // Insert mode color
  } else if (window.website_mode === "insert") {
    floatingBar.textContent = "I";
    floatingBar.style.color = "#acaee3";
    floatingBar.style.backgroundColor = "#096750";
  }
}

// Initialize the status bar
updateStatusBar();

// Toggle mode with Escape and "i" key
document.addEventListener("keydown", (event) => {
  if (window.website_mode == "insert" && event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    window.website_mode = "navigation";
    console.log(`Mode switched to: ${window.website_mode}`);
    updateStatusBar();
  } else if (window.website_mode === "navigation" && event.key === "i") {
    event.preventDefault();
    event.stopPropagation();
    window.website_mode = "insert";
    console.log(`Mode switched to: ${window.website_mode}`);
    updateStatusBar();
  }
});

// Allow scrolling in "navigation" mode
document.addEventListener("keydown", (event) => {
  if (window.website_mode !== "navigation") return;

  const key = event.key;
  const blockedKeys = ["h", "j", "k", "l", "H", "L", "g", "G", "x", "o", "O", "f", "F", "i", "y"];

  if (blockedKeys.includes(key)) {
    event.preventDefault();
    event.stopPropagation();

    switch (key) {
      case "h":
        window.scrollBy({ left: -130, top: 0, behavior: "smooth" }); // Smooth scroll left
        break;
      case "j":
        window.scrollBy({ left: 0, top: 130, behavior: "smooth" }); // Smooth scroll down
        break;
      case "k":
        window.scrollBy({ left: 0, top: -130, behavior: "smooth" }); // Smooth scroll up
        break;
      case "l":
        window.scrollBy({ left: 130, top: 0, behavior: "smooth" }); // Smooth scroll right
        break;
      case "g":
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Smooth scroll to top
        break;
      case "G":
        window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: "smooth" }); // Smooth scroll to bottom
        break;
      case "f":
        // showLinkHints(); // Trigger link hints
        break;
      case "x":
        // window.close(); // Close current tab
        break;
    }
  }
});
