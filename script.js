
    /*banner to appear and dissapear*/
    document.addEventListener('scroll', function() {
    const header = document.querySelector('.header-main');
    const bannerHeight = document.querySelector('#banner').offsetHeight;

    if (window.scrollY > bannerHeight * 0.7) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }}
);

/* === Smooth Scrolling Function === */
function smoothScroll(target) {
    const headerHeight = document.querySelector('.header-main')?.offsetHeight || 0;
    const element = document.querySelector(target);

    if (element) {
        window.scrollTo({
            top: element.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

/* === Apply Smooth Scrolling to All Internal Links === */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = this.getAttribute("href");

        if (target && target !== "#") {
            e.preventDefault();
            smoothScroll(target);
        }
    });
});


// Flyout menu links
document.querySelectorAll('#flyout-panel a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Check if the link is an internal section (starts with #)
        if (href.startsWith("#")) {
            e.preventDefault(); // Only prevent default for internal links
            smoothScroll(href);
        }

        // Close the flyout panel
        closeFlyout();
    });
});


    /*Menu Button expand*/
    const menuButton = document.getElementById("menu-button");
    const flyoutPanel = document.getElementById("flyout-panel");

    // Toggle the panel when the menu button is clicked
    menuButton.onclick = function () {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            closeFlyout();
        } else {
            flyoutPanel.classList.remove("flyout-panel-hidden");
            menuButton.setAttribute("aria-expanded", "true");
        }
    };

    // Close the panel when a link inside it is clicked
    const navLinks = flyoutPanel.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", closeFlyout);
    });

    function closeFlyout() {
        flyoutPanel.classList.add("flyout-panel-hidden");
        menuButton.setAttribute("aria-expanded", "false");
    }


    


    /*For the photo gallery slide*/
    let currentSlideIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function changeSlide(direction) {
        const slides = document.querySelectorAll('.gallery-slide');
        
        // Hide current slide
        slides[currentSlideIndex].classList.remove('active');
        slides[currentSlideIndex].style.display = "none";
        
        // Update index
        currentSlideIndex += direction;

        // Wrap around if the index is out of bounds
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }

        // Show new slide
        slides[currentSlideIndex].classList.add('active');
        slides[currentSlideIndex].style.display = "block";
    }

    // Initialize first slide
    document.addEventListener("DOMContentLoaded", () => {
        const slides = document.querySelectorAll('.gallery-slide');
        slides.forEach((slide, index) => {
            if (index !== 0) slide.style.display = "none"; // Hide all except first
        });

        // Add touch event listeners for swipe detection
        const gallery = document.querySelector(".gallery-container");
        
        gallery.addEventListener("touchstart", (event) => {
            touchStartX = event.touches[0].clientX; // Get initial touch position
        });

        gallery.addEventListener("touchend", (event) => {
            touchEndX = event.changedTouches[0].clientX; // Get touch end position
            
            let swipeDistance = touchEndX - touchStartX;
            
            // Detect swipe direction
            if (swipeDistance > 50) {
                changeSlide(-1); // Swipe right → Previous
            } else if (swipeDistance < -50) {
                changeSlide(1); // Swipe left → Next
            }
        });
    });