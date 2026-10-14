import { categoryNames } from "./cards.mjs";

const dialog = document.querySelector("#details-dialog");
const content = document.querySelector("#dialog-content");

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());

// Close when the backdrop outside the dialog box is clicked.
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

export function showDetails(place) {
    content.innerHTML = `
        <h2 id="dialog-title">${place.name}</h2>
        <p class="tag ${place.category}">${categoryNames[place.category]}</p>
        <p>${place.details}</p>
        <dl>
            <dt>Area</dt><dd>${place.area}</dd>
            <dt>Best for</dt><dd>${place.audience}</dd>
            <dt>Cost</dt><dd>${place.cost}</dd>
            <dt>When</dt><dd>${place.schedule}</dd>
        </dl>`;
    dialog.showModal();
}
