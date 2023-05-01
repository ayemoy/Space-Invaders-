const menuIcon = document.querySelector(".hamburger-menu");

const navbar=document.querySelector('.navbar');



menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navbar.classList.toggle("change");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    menuIcon.classList.remove("active");
    navbar.classList.remove("change");
})
)

