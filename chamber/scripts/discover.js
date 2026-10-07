import { places } from "../data/discover.mjs";

// ===== Visit message =====
const visitMessage = document.getElementById("visit-message");
const visitText = document.getElementById("visit-text");
const msPerDay = 24 * 60 * 60 * 1000;
const now = Date.now();
const lastVisit = Number(localStorage.getItem("discover-last-visit")) || 0;

if (!lastVisit) {
    visitText.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / msPerDay);
    if (days < 1) {
        visitText.textContent = "Back so soon! Awesome!";
    } else {
        visitText.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}

localStorage.setItem("discover-last-visit", now);

document.getElementById("visit-close").addEventListener("click", () => {
    visitMessage.hidden = true;
});

// ===== Places cards =====
const cards = document.getElementById("discover-cards");
const dialog = document.getElementById("place-dialog");
const dialogTitle = document.getElementById("place-dialog-title");
const dialogAddress = document.getElementById("place-dialog-address");
const dialogText = document.getElementById("place-dialog-text");

places.forEach((place, index) => {
    const card = document.createElement("section");
    card.className = "discover-card";
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" class="learn-btn">Learn More</button>
    `;

    card.querySelector(".learn-btn").addEventListener("click", () => {
        dialogTitle.textContent = place.name;
        dialogAddress.textContent = place.address;
        dialogText.textContent = place.more;
        dialog.showModal();
    });

    cards.appendChild(card);
});

document.getElementById("place-dialog-close").addEventListener("click", () => {
    dialog.close();
});

// ===== Photo credits =====
const credits = document.getElementById("photo-credits");
places.forEach((place) => {
    const item = document.createElement("li");
    item.textContent = `${place.name}: ${place.credit}, via Wikimedia Commons`;
    credits.appendChild(item);
});
