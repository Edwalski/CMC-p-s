(function () {
    const get = (id) => document.getElementById(id);

    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    const loadJson = async (path) => {
        const response = await fetch(path, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Could not load ${path}`);
        }
        return response.json();
    };

    const publishedItems = (items) => {
        if (!Array.isArray(items)) {
            return [];
        }
        return items.filter((item) => item.published !== false);
    };

    const renderBibleStudy = (study) => {
        const label = get("current-study-label");
        const title = get("current-study-title");
        const meta = get("current-study-meta");
        const overview = get("current-study-overview");
        const grid = get("current-study-grid");

        if (!study || !label || !title || !meta || !overview || !grid) {
            return;
        }

        label.textContent = `${study.week || "Bible Study"} | ${study.dateRange || ""}`.trim();
        title.textContent = study.theme || "Bible Study";
        meta.textContent = [study.year ? `Year ${study.year}` : "", study.monthNote || ""].filter(Boolean).join(" | ");

        overview.innerHTML = "";
        if (study.summary) {
            overview.appendChild(create("p", "", study.summary));
        }

        const fullNotes = create(
            "p",
            "",
            "Full notes include the teaching introduction, daily comments, scriptures, and weekly focus."
        );
        overview.appendChild(fullNotes);

        if (study.detailPage) {
            const link = create("a", "btn-secondary", "Read Full Notes");
            link.href = study.detailPage;
            overview.appendChild(link);
        }

        const sessions = Array.isArray(study.sessions) ? study.sessions : [];
        const previewSessions = sessions
            .filter((session) => !/pentecost/i.test(session.title || ""))
            .slice(0, 3);

        if (!previewSessions.length) {
            return;
        }

        grid.innerHTML = "";
        previewSessions.forEach((session) => {
            const card = create("article", "study-card");
            card.appendChild(create("span", "card-label", [session.day, session.date].filter(Boolean).join(", ")));
            card.appendChild(create("h3", "", session.title || "Bible Study Session"));
            card.appendChild(create("p", "", session.comment || ""));
            grid.appendChild(card);
        });
    };

    const renderTeachingFocus = (study) => {
        const grid = get("weekly-teaching-grid");
        if (!grid || !study) {
            return;
        }

        const detailPage = study.detailPage || "sermons.html";
        const theme = study.theme || "Current Bible Study Theme";
        const season = study.monthNote || "Weekly Teaching";
        const summary = study.summary || "This week's Bible Study theme guides the teaching focus for the week.";

        const cards = [
            {
                label: season.includes("Pentecost") ? "Pentecost Week" : "Current Theme",
                title: theme,
                summary,
                actionLabel: "Read Full Notes",
                actionUrl: detailPage
            },
            {
                label: "Sunday Bible Study",
                title: "Teaching From the Weekly Theme",
                summary: "Sunday Bible Study continues the weekly teaching direction with scripture, explanation, and practical instruction.",
                actionLabel: "Open Study Notes",
                actionUrl: detailPage
            },
            {
                label: "Sunday Sermon",
                title: "Sermon Application",
                summary: "The Sunday sermon builds from the weekly Bible Study, the church season, and what God is emphasizing to the congregation.",
                actionLabel: "Request Recording",
                actionUrl: "contact.html"
            }
        ];

        grid.innerHTML = "";
        cards.forEach((message) => {
            const card = create("article", "info-card");
            card.appendChild(create("span", "card-label", message.label));
            card.appendChild(create("h3", "", message.title));
            card.appendChild(create("p", "", message.summary || ""));

            const link = create("a", "text-link", message.actionLabel);
            link.href = message.actionUrl;
            if (/^https?:\/\//.test(message.actionUrl)) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            card.appendChild(link);

            grid.appendChild(card);
        });
    };

    const hydrateSermonsPage = async () => {
        try {
            const studies = await loadJson("Content/bible-studies.json");
            const currentStudy = publishedItems(studies)[0];

            renderBibleStudy(currentStudy);
            renderTeachingFocus(currentStudy);
        } catch (error) {
            console.warn("Using built-in page content because content files could not be loaded.", error);
        }
    };

    document.addEventListener("DOMContentLoaded", hydrateSermonsPage);
})();
