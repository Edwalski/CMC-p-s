const homePage = document.querySelector("[data-home-page]");

function setText(selector, value) {
    const element = document.querySelector(selector);

    if (element && value) {
        element.textContent = value;
    }
}

function setLink(selector, linkData) {
    const element = document.querySelector(selector);

    if (element && linkData?.label && linkData?.url) {
        element.textContent = linkData.label;
        element.setAttribute("href", linkData.url);
    }
}

function createHomeElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}

function renderMissionItems(items) {
    const grid = document.querySelector("#home-mission-grid");

    if (!grid || !Array.isArray(items) || items.length === 0) {
        return;
    }

    grid.innerHTML = "";

    items.forEach((item) => {
        const card = createHomeElement("article", "mission-card");
        card.appendChild(createHomeElement("span", "card-label", item.scripture));
        card.appendChild(createHomeElement("h3", "", item.title));

        if (item.summary) {
            card.appendChild(createHomeElement("p", "", item.summary));
        }

        grid.appendChild(card);
    });
}

function renderHomeHighlights(highlights) {
    const grid = document.querySelector("#home-highlight-grid");

    if (!grid || !Array.isArray(highlights) || highlights.length === 0) {
        return;
    }

    grid.innerHTML = "";

    highlights.forEach((item) => {
        const card = createHomeElement("article", "home-highlight-card");
        card.appendChild(createHomeElement("span", "card-label", item.label));
        card.appendChild(createHomeElement("h3", "", item.title));
        card.appendChild(createHomeElement("p", "", item.summary));

        if (item.url && item.buttonLabel) {
            const link = createHomeElement("a", "text-link", item.buttonLabel);
            link.href = item.url;
            card.appendChild(link);
        }

        grid.appendChild(card);
    });
}

async function loadHomeContent() {
    if (!homePage) {
        return;
    }

    try {
        const response = await fetch("Content/home.json");

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        setText("#home-hero-title", data.hero?.title);
        setText("#home-hero-subtitle", data.hero?.subtitle);
        setLink("#home-hero-button", data.hero?.primaryButton);
        setText("#home-mission-title", data.mission?.title);
        setText("#home-mission-intro", data.mission?.intro);
        renderMissionItems(data.mission?.items);
        renderHomeHighlights(data.highlights);
    } catch (error) {
        // Keep fallback HTML visible when local file loading blocks JSON fetch.
    }
}

loadHomeContent();
