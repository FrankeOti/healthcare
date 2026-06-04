/* ===============================
   GLOBAL INIT
=================================*/
document.addEventListener("DOMContentLoaded", () => {

    console.log("JS loaded");
    
    initNavbarScroll();
    initActiveLinks();
    initDropdowns();
    initMobileMenu();
    initHeroSlider(); // only runs if slider exists

});


/* ===============================
   NAVBAR SCROLL SHRINK
=================================*/
function initNavbarScroll() {

    window.addEventListener("scroll", () => {

        const navbar = document.querySelector(".navbar");

        if (!navbar) {
            console.log("Navbar not found");
            return;
        }

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


/* ===============================
   ACTIVE LINK HIGHLIGHT
   (GitHub Pages safe)
=================================*/
function initActiveLinks() {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    console.log("Current page:", currentPage);

    document.querySelectorAll(".nav-left a").forEach(link => {

        const href = link.getAttribute("href");

        console.log("Checking:", href);

        if (href === currentPage) {
            link.classList.add("active-link");
            console.log("ACTIVE:", href);
        }

    });

}


/* ===============================
   DROPDOWN TOGGLE (MOBILE SAFE)
=================================*/
function initDropdowns() {

    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach(toggle => {

        toggle.addEventListener("click", (e) => {

            e.preventDefault();

            const menu = toggle.nextElementSibling;

            if (!menu) return;

            menu.classList.toggle("active");

        });

    });

}


/* ===============================
   MOBILE HAMBURGER MENU
=================================*/
function initMobileMenu() {

    const hamburger = document.querySelector(".hamburger");
    const navLeft = document.querySelector(".nav-left");

    if (!hamburger || !navLeft) return;

    hamburger.addEventListener("click", () => {

        navLeft.classList.toggle("mobile-active");

        hamburger.classList.toggle("open");

    });

}


/* ===============================
   HERO SLIDER (OPTIONAL)
   Runs only if slider exists
=================================*/
function initHeroSlider() {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length) return;

    let current = 0;

    function showSlide(index) {

        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }

    }

    function nextSlide() {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);

    }

    setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            current = index;
            showSlide(current);

        });

    });

}

