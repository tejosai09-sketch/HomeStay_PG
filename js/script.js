const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    menuBtn.textContent =
        navMenu.classList.contains("active")
        ? "✕"
        : "☰";

});
// Close menu when clicking outside

document.addEventListener("click", function (e) {

    if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        nav.classList.remove("active");
    }

});
document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        nav.classList.remove("active");

    }

});
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