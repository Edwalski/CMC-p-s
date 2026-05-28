const ministryGrid = document.querySelector("#ministry-card-grid");

function ministryElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}

function renderMinistryCards(ministries) {
    if (!ministryGrid || !Array.isArray(ministries) || ministries.length === 0) {
        return;
    }

    const published = ministries.filter((ministry) => ministry.published !== false);

    if (published.length === 0) {
        return;
    }

    ministryGrid.innerHTML = "";

    published.forEach((ministry) => {
        const card = ministryElement("article", "info-card ministry-info-card");

        if (ministry.focus) {
            card.appendChild(ministryElement("span", "card-label", ministry.focus));
        }

        card.appendChild(ministryElement("h3", "", ministry.name));
        card.appendChild(ministryElement("p", "", ministry.description));

        if (Array.isArray(ministry.serveAreas) && ministry.serveAreas.length > 0) {
            const list = ministryElement("ul", "ministry-service-list");

            ministry.serveAreas.forEach((area) => {
                list.appendChild(ministryElement("li", "", area));
            });

            card.appendChild(list);
        }

        ministryGrid.appendChild(card);
    });
}

async function loadMinistries() {
    if (!ministryGrid) {
        return;
    }

    try {
        const response = await fetch("Content/ministries.json");

        if (!response.ok) {
            return;
        }

        renderMinistryCards(await response.json());
    } catch (error) {
        // Keep fallback cards visible when opened directly as a local file.
    }
}

loadMinistries();
