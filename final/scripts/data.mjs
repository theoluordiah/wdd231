export async function getPlaces() {
    try {
        const response = await fetch("data/places.json");
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not load places:", error);
        return null;
    }
}
