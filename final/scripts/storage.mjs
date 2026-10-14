const SAVED_KEY = "ltc-saved";
const FILTER_KEY = "ltc-filter";

export function getSaved() {
    try {
        return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    } catch {
        return [];
    }
}

// Adds or removes an id and returns true if the place is now saved.
export function toggleSaved(id) {
    const saved = getSaved();
    const isSaved = saved.includes(id);
    const updated = isSaved ? saved.filter((savedId) => savedId !== id) : [...saved, id];
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
    return !isSaved;
}

export function getFilter() {
    return localStorage.getItem(FILTER_KEY) || "all";
}

export function setFilter(filter) {
    localStorage.setItem(FILTER_KEY, filter);
}
