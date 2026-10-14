// Shared by every page: hamburger menu and footer dates.
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
