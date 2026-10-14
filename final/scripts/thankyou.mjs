import "./common.mjs";
import { categoryNames } from "./cards.mjs";

const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");
const timestamp = params.get("timestamp");

const fields = [
    ["Your name", params.get("name")],
    ["Email", params.get("email")],
    ["Suggestion", params.get("place")],
    ["Type", categoryNames[params.get("category")]],
    ["Area", params.get("area")],
    ["Why it should be added", params.get("reason")],
    ["Sent", timestamp && new Date(timestamp).toLocaleString()]
];

// textContent is used so submitted text is never treated as HTML.
fields.forEach(([label, value]) => {
    if (!value) return;
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    summary.append(term, description);
});
