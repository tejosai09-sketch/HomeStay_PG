const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    menuBtn.textContent =
        navMenu.classList.contains("active")
        ? "✕"
        : "☰";

});