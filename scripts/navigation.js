const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
});
