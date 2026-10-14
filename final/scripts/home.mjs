import "./common.mjs";
import { getPlaces } from "./data.mjs";
import { cardTemplate, categoryNames } from "./cards.mjs";
import { showDetails } from "./modal.mjs";
import { getSaved } from "./storage.mjs";

const featured = document.querySelector("#featured");
const stats = document.querySelector("#stats");
const savedMessage = document.querySelector("#saved-message");

const pluralNames = {
    community: "Communities",
    event: "Events",
    coworking: "Coworking Spaces",
    resource: "Learning Resources"
};

const places = await getPlaces();

if (places) {
    // Count how many places are in each category.
    const counts = places.reduce((totals, place) => {
        totals[place.category] = (totals[place.category] || 0) + 1;
        return totals;
    }, {});

    stats.innerHTML = Object.entries(counts)
        .map(([category, count]) => `<li><span class="stat-number">${count}</span> ${count === 1 ? categoryNames[category] : pluralNames[category]}</li>`)
        .join("");

    // Pick three random places to feature.
    const picks = [...places].sort(() => Math.random() - 0.5).slice(0, 3);
    featured.innerHTML = picks.map((place) => cardTemplate(place)).join("");

    featured.addEventListener("click", (event) => {
        const button = event.target.closest(".details-button");
        if (button) {
            showDetails(places.find((place) => place.id === Number(button.dataset.id)));
        }
    });
} else {
    featured.innerHTML = `<p class="error">Sorry, the featured places could not be loaded. Please try again later.</p>`;
}

const savedCount = getSaved().length;
if (savedCount > 0) {
    savedMessage.innerHTML = `Welcome back! You have <strong>${savedCount}</strong> saved place${savedCount === 1 ? "" : "s"}. <a href="explore.html">See them on the Explore page</a>.`;
    savedMessage.hidden = false;
}
