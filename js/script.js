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
            "Poori",
            "Aloo Curry",
            "Tea / Coffee",
            "Banana"
        ],

        lunch: [
            "Rice",
            "Chicken Curry",
            "Dal",
            "Curd",
            "Sweet"
        ],

        dinner: [
            "Chapati",
            "Paneer Curry",
            "Rice",
            "Rasam"
        ]

    },

    mon: {

        breakfast: [
            "Idli",
            "Vada",
            "Sambar",
            "Tea / Coffee"
        ],

        lunch: [
            "Rice",
            "Dal",
            "Beans Fry",
            "Curd"
        ],

        dinner: [
            "Chapati",
            "Veg Curry",
            "Rice",
            "Pickle"
        ]

    },

    tue: {

        breakfast: [
            "Dosa",
            "Chutney",
            "Sambar",
            "Tea"
        ],

        lunch: [
            "Rice",
            "Sambar",
            "Potato Fry",
            "Curd"
        ],

        dinner: [
            "Lemon Rice",
            "Raita",
            "Papad"
        ]

    },

    wed: {

        breakfast: [
            "Upma",
            "Coconut Chutney",
            "Tea"
        ],

        lunch: [
            "Rice",
            "Rajma",
            "Fry",
            "Curd"
        ],

        dinner: [
            "Chapati",
            "Dal",
            "Rice",
            "Veg Curry"
        ]

    },

    thu: {

        breakfast: [
            "Pongal",
            "Chutney",
            "Tea"
        ],

        lunch: [
            "Veg Biryani",
            "Raita",
            "Curd"
        ],

        dinner: [
            "Chapati",
            "Mixed Veg Curry",
            "Rice"
        ]

    },

    fri: {

        breakfast: [
            "Pesarattu",
            "Ginger Chutney",
            "Tea"
        ],

        lunch: [
            "Rice",
            "Dal",
            "Ladies Finger Fry",
            "Curd"
        ],

        dinner: [
            "Chapati",
            "Paneer Curry",
            "Rice"
        ]

    },

    sat: {

        breakfast: [
            "Uttapam",
            "Sambar",
            "Tea"
        ],

        lunch: [
            "Fried Rice",
            "Manchurian",
            "Curd"
        ],

        dinner: [
            "Chapati",
            "Veg Kurma",
            "Rice"
        ]

    }

};


// Elements

const breakfastMenu = document.getElementById("breakfastMenu");
const lunchMenu = document.getElementById("lunchMenu");
const dinnerMenu = document.getElementById("dinnerMenu");

const buttons = document.querySelectorAll(".day-btn");


// Function to display menu

function loadMenu(day){

    breakfastMenu.innerHTML = "";
    lunchMenu.innerHTML = "";
    dinnerMenu.innerHTML = "";

    weeklyMenu[day].breakfast.forEach(item=>{

        breakfastMenu.innerHTML += `<li>${item}</li>`;

    });

    weeklyMenu[day].lunch.forEach(item=>{

        lunchMenu.innerHTML += `<li>${item}</li>`;

    });

    weeklyMenu[day].dinner.forEach(item=>{

        dinnerMenu.innerHTML += `<li>${item}</li>`;

    });

}


// Click Event

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>btn.classList.remove("active"));

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