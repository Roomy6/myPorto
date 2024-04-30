// Thanks GPT :D (kinda)

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const homeButtons = document.querySelectorAll('.home .btn-box a');
    const socialsLink = document.querySelector('.socials-link');
    const socialLinks = document.querySelector('.social-links');

    // Event listener for opening/closing social links
    socialsLink.addEventListener('click', function(e) {
        e.preventDefault();
        socialLinks.classList.toggle('show');
    }); 

    // Function to toggle active class on sections based on scroll position
    function toggleActiveSection() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop - (window.innerHeight / 2) && scrollPos < sectionTop + sectionHeight) {
                section.classList.add('active');
                updateActiveNav(section.id);
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Function to scroll to section when nav link is clicked
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        scrollToTarget(targetSection);
    }

    // Function to scroll to target section with smooth scrolling
    function scrollToTarget(targetSection) {
        const navbarHeight = document.querySelector('.header').offsetHeight; // Get height of navbar
        const targetOffset = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight; // Calculate offset with navbar height
        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });
    }


    // Function to update active link in navbar
    function updateActiveNav(activeId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Add event listeners for tab links
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].addEventListener('click', function(event) {
            const tabName = tabContents[i].id;
            opentab(tabName, event);
        });
    }

    // Add event listeners for navigation links
    window.addEventListener('scroll', toggleActiveSection);
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    homeButtons.forEach(button => {
        button.addEventListener('click', scrollToSection);
    });

    // Show Home section by default
    sections[0].classList.add('active');
    updateActiveNav(sections[0].id);
});


function initComparison() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.parentElement.appendChild(slider);
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            clicked = 0;
        }

        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}
