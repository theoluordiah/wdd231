const timestampField = document.getElementById("timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modals = document.querySelectorAll("dialog.modal");

document.querySelectorAll(".level-info-link").forEach((trigger) => {
    const modal = document.getElementById(trigger.getAttribute("href").slice(1));

    trigger.addEventListener("click", (event) => {
        event.preventDefault();

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            modal.setAttribute("open", "");
        }
    });
});

modals.forEach((modal) => {
    modal.querySelector(".modal-close").addEventListener("click", () => modal.close());

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

const summaryFields = [
    { key: "fname", label: "First Name" },
    { key: "lname", label: "Last Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Mobile Number" },
    { key: "organization", label: "Business Name" },
    { key: "membership", label: "Membership Level" },
    { key: "timestamp", label: "Application Submitted" }
];

const summary = document.getElementById("application-summary");
const fallback = document.getElementById("summary-fallback");

if (summary) {
    const params = new URLSearchParams(window.location.search);
    const anyValue = summaryFields.some((field) => params.get(field.key));

    if (anyValue) {
        const list = document.createElement("dl");
        list.classList.add("summary-list");

        summaryFields.forEach((field) => {
            const row = document.createElement("div");
            row.classList.add("summary-row");

            const term = document.createElement("dt");
            term.textContent = field.label;

            const value = document.createElement("dd");
            value.textContent = params.get(field.key) || "Not provided";

            row.append(term, value);
            list.appendChild(row);
        });

        summary.appendChild(list);

        if (fallback) {
            fallback.hidden = true;
        }
    } else if (fallback) {
        summary.hidden = true;
    }
}
