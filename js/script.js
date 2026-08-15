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
            "Upma",
            "Or",
            "Poha"
            
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
            "Idly","Sambar", "Chutney"
        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Sambar","Curd"
        ],

        dinner: [
           "Chapati", "Rice", "Sambar", "Curd"
        ]

    },

    tue: {

        breakfast: [
            "Bonda", "Or ", "Punugulu"
        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Rasam","Curd"
           
        ],

        dinner: [
            "Rice", "Egg Curry", "Banana"
        ]

    },

    wed: {

        breakfast: [
            "Dosa",
            "Sambar",
            "Chutney"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Chutney","Curd"
        ],

        dinner: [
           "Bagara Rice",
           "Chicken Curry",
           "Mushroom Curry"
        ]

    },

    thu: {

        breakfast: [
            "Pulihora",
            "Or",
            "Tamota Rice"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Rasam","Curd"
        ],

        dinner: [
            "Idly",
            "Dosa",
            "Or",
            "Vada"
        ]

    },

    fri: {

        breakfast: [
            "Puri",
            "Aloo Curry"
        ],

        lunch: [
            "Rice", "Curry", "Dal", "Chutney","Curd"
        ],

        dinner: [
            "Chicken Fried Rice",
            "Veg Fried Rice"
        ]

    },

    sat: {

        breakfast: [
            "Uthapam",
            "Chutney"
            
        ],

        lunch: [
            "Rice", "Fry Curry", "Dal", "Rasam","Curd"
            
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