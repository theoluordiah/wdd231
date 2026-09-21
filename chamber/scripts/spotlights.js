const spotlightContainer = document.getElementById("spotlights");

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

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const logo = document.createElement("img");
    logo.classList.add("spotlight-logo");
    logo.src = "images/" + member.image;
    logo.alt = member.name + " logo";

    const name = document.createElement("h3");
    name.classList.add("spotlight-name");
    name.textContent = member.name;

    const badge = document.createElement("span");
    badge.classList.add("level-badge", levelClasses[member.membershipLevel]);
    badge.textContent = levelLabels[member.membershipLevel];

    const address = document.createElement("p");
    address.classList.add("spotlight-meta");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.classList.add("spotlight-meta");
    phone.textContent = member.phone;

    const website = document.createElement("p");
    website.classList.add("spotlight-meta");
    const link = document.createElement("a");
    link.classList.add("member-link");
    link.href = member.website;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = member.website;
    website.appendChild(link);

    card.append(logo, name, badge, address, phone, website);
    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Could not load member data");
        }
        const members = await response.json();
        const eligible = members.filter((member) => member.membershipLevel >= 2);
        const featured = shuffle(eligible).slice(0, 3);

        spotlightContainer.innerHTML = "";
        featured.forEach((member) => {
            spotlightContainer.appendChild(createSpotlightCard(member));
        });
    } catch (error) {
        spotlightContainer.innerHTML =
            '<p class="weather-note">Spotlight members could not be loaded right now.</p>';
        console.error(error);
    }
}

loadSpotlights();