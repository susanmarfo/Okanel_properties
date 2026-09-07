/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header')
    }
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER POPULAR ===============*/
var swiper = new Swiper(".popular__container", {

    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: true,
    slidesPreview: 'auto',
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== VALUE ACCORDION ===============*/
const toggleItem = (item) => {
    const accordionContent = item.querySelector('.value__accordion-content')

    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open');
    }
}

const accordionItems = document.querySelectorAll('.value__accordion-item')
accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.value__accordion-header');
    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open')
        toggleItem(item)

        if (openItem && openItem !==item) {
            toggleItem(openItem);
        }
    });
});
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link'); // Change 'add' to 'remove'
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUP() {
    const scrollUp = document.getElementById('scroll-up');

    if (window.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUP);

const scrollUpButton = document.getElementById('scroll-up');
scrollUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/*=============== DARK LIGHT THEME ===============*/

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const toggleTheme = () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
    localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun');
};

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', toggleTheme);

/*=============== APPOINTMENT BOOKING ===============*/
const appointmentForm = document.getElementById('appointment-form');
const appointmentService = document.getElementById('appointment-service');
const appointmentConfirmation = document.getElementById('appointment-confirmation');
const appointmentDate = appointmentForm.querySelector('input[type="date"]');
const appointmentCalendarButton = document.getElementById('appointment-calendar-button');
const consultantEmail = 'Nelsonic45@yahoo.com';

appointmentDate.min = new Date().toISOString().split('T')[0];

appointmentDate.addEventListener('keydown', (event) => {
    event.preventDefault();
});

appointmentDate.addEventListener('beforeinput', (event) => {
    event.preventDefault();
});

appointmentDate.addEventListener('click', () => {
    if (typeof appointmentDate.showPicker === 'function') {
        appointmentDate.showPicker();
    }
});

appointmentCalendarButton.addEventListener('click', () => {
    appointmentDate.focus();
    if (typeof appointmentDate.showPicker === 'function') {
        appointmentDate.showPicker();
    }
});

appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const serviceName = appointmentService.options[appointmentService.selectedIndex].text;
    const appointmentDetails = new Date(`${formData.get('date')}T${formData.get('time')}`);

    if (appointmentDetails.getDay() === 0 || appointmentDetails.getDay() === 6) {
        appointmentConfirmation.textContent = 'Please choose a weekday from Monday to Friday.';
        appointmentConfirmation.classList.add('appointment__confirmation--visible');
        return;
    }

    const appointmentHour = appointmentDetails.getHours();
    if (appointmentHour < 7 || appointmentHour > 18 || (appointmentHour === 18 && appointmentDetails.getMinutes() > 0)) {
        appointmentConfirmation.textContent = 'Please choose a time between 7:00 AM and 6:00 PM.';
        appointmentConfirmation.classList.add('appointment__confirmation--visible');
        return;
    }

    const formattedDate = appointmentDetails.toLocaleDateString(undefined, {
        dateStyle: 'long'
    });
    const formattedTime = appointmentDetails.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit'
    });

    const emailSubject = encodeURIComponent(`Appointment request: ${serviceName}`);
    const emailBody = encodeURIComponent([
        `Service: ${serviceName}`,
        `Date: ${formattedDate}`,
        `Time: ${formattedTime}`,
        `Client: ${formData.get('name')}`,
        `Client email: ${formData.get('email')}`,
        `Project details: ${formData.get('details') || 'None provided'}`
    ].join('\n'));

    window.location.href = `mailto:${consultantEmail}?subject=${emailSubject}&body=${emailBody}`;
    appointmentConfirmation.textContent = `Your appointment request is ready to send to ${consultantEmail}.`;
    appointmentConfirmation.classList.add('appointment__confirmation--visible');
    appointmentForm.reset();
    appointmentDate.min = new Date().toISOString().split('T')[0];
});

document.querySelectorAll('.popup-enabled').forEach((element)=>{
    element.addEventListener('click', (event)=>{
        event.preventDefault();
        console.log(event.target);
        alert('Buttons and links aren\'t functional.' + event.target)
    })
})