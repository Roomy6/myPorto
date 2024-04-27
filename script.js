document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const homeButtons = document.querySelectorAll('.home .btn-box a');
    const socialsLink = document.querySelector('.socials-link');
    const socialLinks = document.querySelector('.social-links');
    var tabLinks = document.getElementsByClassName("tabLinks");
    var tabContents = document.getElementsByClassName("tabContents");

    function opentab(tabName, event) {
        for (let tabLink of tabLinks) {
            tabLink.classList.remove("activeLink");
        }
    
        for (let tabContent of tabContents) {
            tabContent.classList.remove("activeTab");
        }
    
        const targetTabLink = event.currentTarget;
        const targetTabContent = document.getElementById(tabName);
    
        targetTabContent.classList.add("activeTab");
        targetTabLink.classList.add("activeLink");
    }    

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
        const targetOffset = targetSection.offsetTop - navbarHeight; // Calculate offset with navbar height
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Align the top of the target element at the top of the visible area of the scrollable ancestor
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
