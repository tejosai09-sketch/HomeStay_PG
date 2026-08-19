// ========================================
// Mobile Navigation
// ========================================

const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {

    // Open / close menu
    menuBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        navMenu.classList.toggle("active");

        menuBtn.textContent =
            navMenu.classList.contains("active")
                ? "✕"
                : "☰";

    });


    // Close when clicking outside
    document.addEventListener("click", function (e) {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            navMenu.classList.remove("active");
            menuBtn.textContent = "☰";

        }

    });


    // Close after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuBtn.textContent = "☰";

        });

    });


    // Close with Escape key
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            navMenu.classList.remove("active");
            menuBtn.textContent = "☰";

        }

    });

}
// ================================
// Weekly Food Menu
// ================================

const weeklyMenu = {

    sun: {

        breakfast: [
            "Upma or Poha"

        ],

        lunch: [
            "Chicken Dum Biryani",
            "Paneer Dum Biryani"

        ],

        dinner: [
            "Chutney", "Rice", "Sambar", "Curd", "Papad"

        ]

    },

    mon: {

        breakfast: [
            "Idly", "Sambar", "Chutney"
        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Sambar", "Curd"
        ],

        dinner: [
            "Chapati", "Rice", "Sambar", "Curd"
        ]

    },

    tue: {

        breakfast: [
            "Bonda or Punugulu"
        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Rasam", "Curd"

        ],

        dinner: [
            "Rice", "Tomato / Soya chunks Curry", "Egg or Banana"
        ]

    },

    wed: {

        breakfast: [
            "Dosa",
            "Sambar",
            "Chutney"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Chutney", "Curd"
        ],

        dinner: [
            "Bagara Rice",
            "Chicken Curry",
            "Mushroom Curry"
        ]

    },

    thu: {

        breakfast: [
            "Pulihora or Tamota Rice"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Rasam", "Curd"
        ],

        dinner: [
            "Idly",
            "Dosa or Vada"

        ]

    },

    fri: {

        breakfast: [
            "Puri",
            "Aloo Curry"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Chutney", "Curd"
        ],

        dinner: [
            "Egg Fried Rice",
            "Veg Fried Rice"
        ]

    },

    sat: {

        breakfast: [
            "Uthapam",
            "Chutney"

        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Rasam", "Curd"

        ],

        dinner: [
            "Chapati", "Rice", "Sambar", "Curd", "Sweet"
        ]

    }

};


// Elements

const breakfastMenu = document.getElementById("breakfastMenu");
const lunchMenu = document.getElementById("lunchMenu");
const dinnerMenu = document.getElementById("dinnerMenu");

const buttons = document.querySelectorAll(".day-btn");


// Function to display menu

function loadMenu(day) {

    breakfastMenu.innerHTML = "";
    lunchMenu.innerHTML = "";
    dinnerMenu.innerHTML = "";

    weeklyMenu[day].breakfast.forEach(item => {

        breakfastMenu.innerHTML += `<li>${item}</li>`;

    });

    weeklyMenu[day].lunch.forEach(item => {

        lunchMenu.innerHTML += `<li>${item}</li>`;

    });

    weeklyMenu[day].dinner.forEach(item => {

        dinnerMenu.innerHTML += `<li>${item}</li>`;

    });

}


// Click Event

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        loadMenu(button.dataset.day);

    });

});


// Default Menu

loadMenu("sun");
// ========================================
// Schedule a Visit → WhatsApp
// ========================================

const visitForm = document.getElementById("visitForm");
const visitSubmit = document.getElementById("visitSubmit");
const formMessage = document.getElementById("formMessage");

if (visitForm) {

    visitForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("visitorName").value.trim();
        const phone = document.getElementById("visitorPhone").value.trim();
        const sharing = document.getElementById("sharingType").value.trim();

        if (!name || !phone) {
            formMessage.textContent = "Please enter your name and phone number.";
            return;
        }

        // Change button while sending
        visitSubmit.disabled = true;
        visitSubmit.textContent = "Sending...";

        formMessage.textContent = "";

        try {

            const response = await fetch("/api/send-whatsapp", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    date: "Not specified",
                    time: "Not specified",
                    visitors: sharing || "Not specified"
                })

            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            formMessage.textContent =
                "Thank you! We received your request. We'll contact you shortly.";

            visitForm.reset();

        } catch (error) {

            console.error("WhatsApp error:", error);

            formMessage.textContent =
                "Something went wrong. Please try again.";

        } finally {

            visitSubmit.disabled = false;
            visitSubmit.textContent = "Request a Callback";

        }

    });

}
// =================================
// GYM IMAGE CAROUSEL
// =================================

const gymSlides = document.querySelectorAll(".gym-slide");
const gymDots = document.querySelectorAll(".gym-dot");
const gymPrev = document.querySelector(".gym-prev");
const gymNext = document.querySelector(".gym-next");

let gymCurrentSlide = 0;
let gymAutoSlide;


// Show slide

function showGymSlide(index) {

    if (!gymSlides.length) return;

    // Loop around
    if (index >= gymSlides.length) {
        index = 0;
    }

    if (index < 0) {
        index = gymSlides.length - 1;
    }

    gymCurrentSlide = index;


    // Remove active from all slides
    gymSlides.forEach(slide => {
        slide.classList.remove("active");
    });


    // Remove active from all dots
    gymDots.forEach(dot => {
        dot.classList.remove("active");
    });


    // Activate current
    gymSlides[gymCurrentSlide].classList.add("active");

    if (gymDots[gymCurrentSlide]) {
        gymDots[gymCurrentSlide].classList.add("active");
    }
}


// Next

if (gymNext) {

    gymNext.addEventListener("click", () => {

        showGymSlide(gymCurrentSlide + 1);

        restartGymAutoSlide();

    });

}


// Previous

if (gymPrev) {

    gymPrev.addEventListener("click", () => {

        showGymSlide(gymCurrentSlide - 1);

        restartGymAutoSlide();

    });

}


// Dots

gymDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showGymSlide(index);

        restartGymAutoSlide();

    });

});


// Automatic sliding

function startGymAutoSlide() {

    gymAutoSlide = setInterval(() => {

        showGymSlide(gymCurrentSlide + 1);

    }, 5000);

}


function restartGymAutoSlide() {

    clearInterval(gymAutoSlide);

    startGymAutoSlide();

}


// Start

showGymSlide(0);

startGymAutoSlide();
// =========================================
// GALLERY CAROUSEL
// =========================================

const galleryItems = [

    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1786973601/117827_bvgxbb.jpg",

        alt: "2 sharing room at Home Stay Women's PG",

        category: "Room Type",

        title: "2 Sharing Room",

        description:
            "A comfortable shared room designed for residents who prefer more personal space and a relaxed stay."
    },


    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1787148436/Gemini_Generated_Image_tdj3u5tdj3u5tdj3_1_bij8sm.png",

        alt: "3 sharing room at Home Stay Women's PG",

        category: "Room Type",

        title: "3 Sharing Room",

        description:
            "A practical and welcoming shared room offering a comfortable living arrangement for residents."
    },


    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1786954175/117794_bcd5cy.jpg",

        alt: "4 sharing room at Home Stay Women's PG",

        category: "Room Type",

        title: "4 Sharing Room",

        description:
            "A budget-friendly room option that keeps everyday living comfortable, convenient and social."
    },


    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1786954166/117830_b9wrle.jpg",

        alt: "5 sharing room at Home Stay Women's PG",

        category: "Room Type",

        title: "5 Sharing Room",

        description:
            "An affordable shared-room choice for residents looking for a value-focused stay."
    },


    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1786954122/117281_el5uwp.jpg",

        alt: "Dining and mess area at Home Stay Women's PG",

        category: "Dining",

        title: "Everyday Dining",

        description:
            "A dedicated dining space where residents can enjoy their everyday meals together."
    },


    {
        image: "https://res.cloudinary.com/u6muhbms/image/upload/v1786954133/117791_rnsba4.jpg",

        alt: "Mess dining area at Home Stay Women's PG",

        category: "Dining",

        title: "A Place to Eat Together",

        description:
            "A welcoming dining space where residents can sit down, enjoy their meals and spend time together."
    },


    {
        image:
            "https://res.cloudinary.com/u6muhbms/image/upload/v1786954146/117803_bbmmou.jpg",

        alt: "Clean and well-lit hallway inside Home Stay Women's PG",

        category: "Common Area",

        title: "Thoughtfully Maintained, Every Day.",

        description:
            "Bright, clean corridors connect the rooms and common spaces, creating a comfortable and welcoming environment throughout the PG."
    },
    {
        image:
            "https://res.cloudinary.com/u6muhbms/image/upload/f_jpg/v1786977547/IMG_0076_d0pmq4.heic",

        alt: "Clean and organized washing area at Home Stay Women's PG",

        category: "Common Area",

        title: "A Dedicated Space for Everyday Essentials.",

        description:
            "A dedicated washing area that makes everyday laundry and personal care convenient for our residents."
    },

    {
        image:
            "https://res.cloudinary.com/u6muhbms/image/upload/f_jpg/v1786977484/IMG_0074_pwbtby.heic",

        alt: "Exterior view of Home Stay Women's PG",

        category: "Exterior",

        title: "A Peaceful Terrace with Extraordinary Views",

        description:
            "Enjoy your spare time with your friends and family on call or offline on the beautiful terrace"
    }
];


const galleryImage =
    document.getElementById("galleryImage");

const galleryCategory =
    document.getElementById("galleryCategory");

const galleryTitle =
    document.getElementById("galleryTitle");

const galleryDescription =
    document.getElementById("galleryDescription");

const galleryCurrent =
    document.getElementById("galleryCurrent");

const galleryNumber =
    document.getElementById("galleryNumber");

const galleryDots =
    document.querySelectorAll(".gallery-dot");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");


let galleryIndex = 0;


function showGalleryItem(index) {

    galleryIndex = index;

    const item = galleryItems[index];


    // Small fade effect

    galleryImage.style.opacity = "0";


    setTimeout(() => {

        galleryImage.src = item.image;

        galleryImage.alt = item.alt;

        galleryCategory.textContent =
            item.category;

        galleryTitle.textContent =
            item.title;

        galleryDescription.textContent =
            item.description;

        galleryCurrent.textContent =
            String(index + 1).padStart(2, "0");

        galleryNumber.textContent =
            String(index + 1).padStart(2, "0");


        galleryImage.style.opacity = "1";

    }, 150);


    // Update dots

    galleryDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


/* Previous */

galleryPrev.addEventListener("click", () => {

    const newIndex =
        (galleryIndex - 1 + galleryItems.length)
        % galleryItems.length;

    showGalleryItem(newIndex);

});


/* Next */

galleryNext.addEventListener("click", () => {

    const newIndex =
        (galleryIndex + 1)
        % galleryItems.length;

    showGalleryItem(newIndex);

});


/* Dots */

galleryDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        showGalleryItem(
            Number(dot.dataset.index)
        );

    });

});


/* Initial */

showGalleryItem(0);