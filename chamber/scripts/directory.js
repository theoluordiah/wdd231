const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

const memberUrl = "data/members.json";
let members = [];

const levelLabels = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

const levelClasses = {
    1: "level-member",
    2: "level-silver",
    3: "level-gold"
};

function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const logo = document.createElement("img");
    logo.classList.add("member-logo");
    logo.src = "images/" + member.image;
    logo.alt = member.name + " logo";

    const details = document.createElement("div");
    details.classList.add("member-details");

    const name = document.createElement("h2");
    name.classList.add("member-name");
    name.textContent = member.name;

    const industry = document.createElement("p");
    industry.classList.add("member-industry");
    industry.textContent = member.industry;

    const badge = document.createElement("span");
    badge.classList.add("level-badge", levelClasses[member.membershipLevel]);
    badge.textContent = levelLabels[member.membershipLevel];

    const description = document.createElement("p");
    description.classList.add("member-description");
    description.textContent = member.description;

    const address = document.createElement("p");
    address.classList.add("member-meta");
    address.textContent = member.address;
    address.appendChild(document.createElement("br"));

    const phone = document.createElement("p");
    phone.classList.add("member-meta");
    phone.textContent = member.phone;
    phone.appendChild(document.createElement("br"));

    const website = document.createElement("p");
    website.classList.add("member-meta");
    const link = document.createElement("a");
    link.classList.add("member-link");
    link.href = member.website;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = member.website;
    website.appendChild(link);

    details.append(name, industry, badge, description, address, phone, website);
    card.append(logo, details);

    return card;
}

function renderMembers() {
    membersContainer.innerHTML = "";
    members.forEach((member) => {
        membersContainer.appendChild(createMemberCard(member));
    });
}

async function getMembers() {
    try {
        const response = await fetch(memberUrl);
        if (!response.ok) {
            throw new Error("Could not load member data");
        }
        members = await response.json();
        renderMembers();
    } catch (error) {
        membersContainer.innerHTML =
            '<p class="intro">Sorry, the member directory could not be loaded right now.</p>';
        console.error(error);
    }
}

function setView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("member-grid", isGrid);
    membersContainer.classList.toggle("member-list", !isGrid);

    gridBtn.classList.toggle("active", isGrid);
    listBtn.classList.toggle("active", !isGrid);
    gridBtn.setAttribute("aria-pressed", isGrid);
    listBtn.setAttribute("aria-pressed", !isGrid);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();