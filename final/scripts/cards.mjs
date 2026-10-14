export const categoryNames = {
    community: "Community",
    event: "Event",
    coworking: "Coworking Space",
    resource: "Learning Resource"
};

export function cardTemplate(place, { isSaved = false, showSave = false } = {}) {
    const saveButton = showSave
        ? `<button class="save-button" type="button" data-id="${place.id}" aria-pressed="${isSaved}">${isSaved ? "★ Saved" : "☆ Save"}</button>`
        : "";

    return `
        <article class="card">
            <img src="images/${place.category}.svg" alt="${categoryNames[place.category]} icon" width="400" height="200" loading="lazy">
            <div class="card-body">
                <p class="tag ${place.category}">${categoryNames[place.category]}</p>
                <h3>${place.name}</h3>
                <p class="meta">📍 ${place.area} &middot; ${place.cost}</p>
                <p>${place.summary}</p>
                <div class="card-actions">
                    <button class="details-button" type="button" data-id="${place.id}">Learn More</button>
                    ${saveButton}
                </div>
            </div>
        </article>`;
}
