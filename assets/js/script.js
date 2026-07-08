/* =========================
   COMPONENT LOADER
========================= */

function loadComponent(id, file) {

    const target = document.getElementById(id);

    if (!target) {
        console.error(`Missing placeholder: ${id}`);
        return Promise.resolve();
    }

    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .then(data => {
            target.innerHTML = data;

            initNavbarInteractions();
            highlightActiveLink();
            initDropdowns();
        })
        .catch(error => {
            console.error(error);
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



document.addEventListener("DOMContentLoaded", () => {

    // Load components safely AFTER DOM is ready
    Promise.all([
        loadComponent("navbar-placeholder", "components/navbar.html"),
        loadComponent("footer-placeholder", "components/footer.html")
    ]).then(() => {

        highlightActiveLink();

    });

});


const badge = document.getElementById("statusBadge");

const now = new Date();

const day = now.getDay();      // 0 = Sunday
const hour = now.getHours();
const minute = now.getMinutes();

const currentTime = hour * 60 + minute;

// Opening schedule
const schedule = {

    0: [8*60,18*60],              // Sunday

    1: [8*60,19*60],             // Monday

    2: [8*60,19*60],             // Tuesday

    3: [8*60,19*60],             // Wednesday

    4: [8*60,19*60],             // Thursday

    5: [8*60,19*60],             // Friday

    6: [8*60,18*60]              // Saturday


};

const hours = schedule[day];

if(hours && currentTime >= hours[0] && currentTime < hours[1]){

    badge.textContent = "Open Now";

    badge.classList.add("open");

}else{

    badge.textContent = "Closed";

    badge.classList.add("closed");

}