/* =========================================
   1. FORCE SCROLL TO TOP & REMOVE HASH
   ========================================= */
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
}

window.scrollTo(0, 0);


/* =========================================
   2. GENERAL FADE-IN ANIMATION
   ========================================= */
const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => generalObserver.observe(el));


/* =========================================
   3. STAGGERED ANIMATION (Skills)
   ========================================= */
const skillsSection = document.querySelector('#skills');
const skillBoxes = document.querySelectorAll('.skill-box');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            skillBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.add('pop-up');
                }, index * 200); 
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}


/* =========================================
   4. IMAGE LIGHTBOX (POPUP) LOGIC
   ========================================= */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementsByClassName("close")[0];

// Detect clicks on ANY link that points to an image
document.addEventListener('click', function(e) {
    const target = e.target.closest('a'); // Find the closest anchor tag
    
    if (target) {
        const href = target.getAttribute('href');
        
        // Check if the link is an image (jpg, jpeg, png)
        if (href && href.match(/\.(jpeg|jpg|png)$/i)) {
            e.preventDefault(); // STOP it from opening in a new tab
            modal.style.display = "block";
            modalImg.src = href; // Show the image in the modal
        }
    }
});

// Close when clicking the 'X'
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close when clicking outside the image (on the dark background)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}