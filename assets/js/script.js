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
        })
        .catch(error => {
            console.error("Component load error:", error);
        });
}

/* =========================
   NAVBAR INTERACTIONS
========================= */

function initNavbarInteractions() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }
}

/* =========================
   STICKY NAVBAR ON SCROLL
========================= */

window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
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

});