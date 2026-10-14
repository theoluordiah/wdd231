import "./common.mjs";
import { getPlaces } from "./data.mjs";
import { cardTemplate } from "./cards.mjs";
import { showDetails } from "./modal.mjs";
import { getSaved, toggleSaved, getFilter, setFilter } from "./storage.mjs";

const grid = document.querySelector("#places");
const filterButtons = document.querySelectorAll(".filter-button");
const resultCount = document.querySelector("#result-count");

const places = await getPlaces();
let currentFilter = getFilter();

function displayPlaces() {
    const saved = getSaved();
    const shown = places.filter((place) => {
        if (currentFilter === "all") return true;
        if (currentFilter === "saved") return saved.includes(place.id);
        return place.category === currentFilter;
    });

    filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", button.dataset.filter === currentFilter);
    });

    resultCount.textContent = `Showing ${shown.length} of ${places.length} places`;

    grid.innerHTML = shown.length
        ? shown.map((place) => cardTemplate(place, { isSaved: saved.includes(place.id), showSave: true })).join("")
        : `<p class="empty">Nothing saved yet. Use the ☆ Save button on any card to add it to your list.</p>`;
}

if (places) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            setFilter(currentFilter);
            displayPlaces();
        });
    });

    grid.addEventListener("click", (event) => {
        const detailsButton = event.target.closest(".details-button");
        const saveButton = event.target.closest(".save-button");

        if (detailsButton) {
            showDetails(places.find((place) => place.id === Number(detailsButton.dataset.id)));
        } else if (saveButton) {
            toggleSaved(Number(saveButton.dataset.id));
            displayPlaces();
        }
    });

    displayPlaces();
} else {
    resultCount.textContent = "";
    grid.innerHTML = `<p class="error">Sorry, the places could not be loaded. Please try again later.</p>`;
}
