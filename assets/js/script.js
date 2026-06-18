/* =========================
   COMPONENT LOADER
========================= */

function loadComponent(id, file) {
    const target = document.getElementById(id);

    if (!target) {
        console.error(`Missing placeholder: ${id}`);
        return;
    }

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .then(data => {
            target.innerHTML = data;

            // Re-bind events AFTER navbar loads
            initNavbarInteractions();
            highlightActiveLink()
            initDropdowns()
        })
        .catch(error => {
            console.error("Component load error:", error);
        });
}

/* =========================
   NAVBAR INTERACTIONS
========================= */

function highlightActiveLink() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

     // TOP NAVBAR LINKS (underline)
    document.querySelectorAll(".nav-left a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active-link");
        }

    });
    

    document.querySelectorAll(".dropdown-menu a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });
}

function initNavbarInteractions() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown-toggle");

    dropdowns.forEach(toggle => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();

            const menu = toggle.nextElementSibling;
            menu.classList.toggle("active");
        });
    });
}

/* =========================
   STICKY NAVBAR ON SCROLL
========================= */

window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");

    elements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

/* =========================
   INIT COMPONENTS (IMPORTANT)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    // Load components safely AFTER DOM is ready
    loadComponent("navbar-placeholder", "components/navbar.html");
    loadComponent("footer-placeholder", "components/footer.html");


let slides = document.querySelectorAll(".slide");
let current = 0;

const progressBar = document.querySelector(".progress-bar");
const slider = document.querySelector(".hero-slider");

const SLIDE_TIME = 5000;

function showSlide(index) {
    slides.forEach((s, i) => {
        s.classList.remove("active");
        if (i === index) s.classList.add("active");
    });

    // restart progress bar
    if (progressBar) {
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";

        setTimeout(() => {
            progressBar.style.transition = `width ${SLIDE_TIME}ms linear`;
            progressBar.style.width = "100%";
        }, 50);
    }
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

let interval = setInterval(nextSlide, SLIDE_TIME);

slider.addEventListener("mouseenter", () => {
    clearInterval(interval);
    if (progressBar) progressBar.style.animationPlayState = "paused";
});

slider.addEventListener("mouseleave", () => {
    interval = setInterval(nextSlide, SLIDE_TIME);
});

showSlide(0);


});
