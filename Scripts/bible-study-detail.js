(function () {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");
    const detail = document.querySelector("#study-detail");
    const heroWeek = document.querySelector("#study-page-week");
    const heroTheme = document.querySelector("#study-page-theme");

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

    const bibleGatewayUrl = (scriptures, version) => {
        const search = scriptures.join("; ");
        return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(search)}&version=${version}`;
    };

    const renderScriptureButtons = (session) => {
        const scriptures = Array.isArray(session.scriptures) ? session.scriptures : [];
        if (!scriptures.length) {
            return null;
        }

        const list = create("div", "scripture-list");
        list.appendChild(create("strong", "", "Scriptures"));
        list.appendChild(create("span", "", scriptures.join("; ")));

        const actions = create("div", "scripture-actions scripture-link-actions");
        ["NIV", "MEV", "NKJV"].forEach((version) => {
            const link = create("a", "", version);
            link.href = bibleGatewayUrl(scriptures, version);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            actions.appendChild(link);
        });

        list.appendChild(actions);
        return list;
    };

    const renderStudyNavigation = (studies, activeIndex) => {
        const nav = create("nav", "study-detail-nav");
        nav.setAttribute("aria-label", "Bible Study navigation");

        const newerStudy = activeIndex > 0 ? studies[activeIndex - 1] : null;
        const olderStudy = activeIndex < studies.length - 1 ? studies[activeIndex + 1] : null;

        if (newerStudy) {
            const newerLink = create("a", "study-nav-link", `Newer: ${newerStudy.week}`);
            newerLink.href = newerStudy.detailPage || `bible-study.html?id=${encodeURIComponent(newerStudy.id)}`;
            nav.appendChild(newerLink);
        }

        const archiveLink = create("a", "study-nav-link", "All Bible Studies");
        archiveLink.href = "sermons.html#bible-study-archive";
        nav.appendChild(archiveLink);

        if (olderStudy) {
            const olderLink = create("a", "study-nav-link", `Older: ${olderStudy.week}`);
            olderLink.href = olderStudy.detailPage || `bible-study.html?id=${encodeURIComponent(olderStudy.id)}`;
            nav.appendChild(olderLink);
        }

        return nav;
    };

    const renderCopyrightNotice = () => {
        const notice = create("section", "notes-block scripture-reader-card");
        const heading = create("div", "scripture-reader-heading");
        const headingText = create("div");
        headingText.appendChild(create("span", "card-label", "Scripture Reader"));
        headingText.appendChild(create("h3", "", "Open Scripture Readings"));
        heading.appendChild(headingText);
        notice.appendChild(heading);
        notice.appendChild(create(
            "p",
            "",
            "Use the NIV, MEV, and NKJV buttons beside each study day to open the full readings in a new tab. CMC - Mizpah does not display full copyrighted Bible text inside this page until the church has the correct digital license or API."
        ));
        notice.appendChild(create(
            "p",
            "scripture-copyright-note",
            "Scripture version rights belong to their respective publishers. Short quotations may be used with proper attribution where permitted; full in-page reading for NIV, MEV, and NKJV will be added only through an approved Bible API or written permission."
        ));
        return notice;
    };

    const renderStudy = (study, studies, activeIndex) => {
        document.title = `${study.week} Bible Study | Christ's Mission Church`;
        heroWeek.textContent = `${study.week} Bible Study`;
        heroTheme.textContent = study.theme;

        detail.innerHTML = "";
        const backLink = create("a", "text-link back-link", "Back to Sermons");
        backLink.href = "sermons.html";
        detail.appendChild(backLink);
        detail.appendChild(renderStudyNavigation(studies, activeIndex));

        const header = create("header", "notes-header");
        header.appendChild(create("span", "section-label", [study.year ? `Year ${study.year}` : "", study.monthNote || ""].filter(Boolean).join(" | ")));
        header.appendChild(create("h2", "", study.theme));
        header.appendChild(create("p", "", study.dateRange || ""));
        if (study.author) {
            header.appendChild(create("p", "", study.author));
        }
        detail.appendChild(header);

        const intro = create("section", "notes-block");
        const notes = Array.isArray(study.fullNotes) ? study.fullNotes : [];
        if (notes.length) {
            notes.forEach((paragraph) => intro.appendChild(create("p", "", paragraph)));
        } else if (study.summary) {
            intro.appendChild(create("p", "", study.summary));
        }
        detail.appendChild(intro);
        detail.appendChild(renderCopyrightNotice());

        const sessions = Array.isArray(study.sessions) ? study.sessions : [];
        sessions.forEach((session) => {
            const block = create("section", "notes-block");
            block.appendChild(create("span", "card-label", [session.day, session.date].filter(Boolean).join(", ")));
            block.appendChild(create("h3", "", session.title || "Bible Study Session"));
            if (session.comment) {
                block.appendChild(create("p", "", session.comment));
            }

            const scriptureList = renderScriptureButtons(session);
            if (scriptureList) {
                block.appendChild(scriptureList);
            }

            detail.appendChild(block);
        });

        detail.appendChild(renderStudyNavigation(studies, activeIndex));
    };

    const showMissing = () => {
        heroTheme.textContent = "The requested Bible Study could not be found.";
        detail.innerHTML = "";
        const block = create("section", "notes-block");
        block.appendChild(create("p", "", "Please return to the Sermons page and choose a Bible Study from the archive."));
        const link = create("a", "btn-secondary", "Back to Sermons");
        link.href = "sermons.html";
        block.appendChild(link);
        detail.appendChild(block);
    };

    const loadStudy = async () => {
        try {
            const response = await fetch("Content/bible-studies.json", { cache: "no-cache" });
            if (!response.ok) {
                throw new Error("Bible Study content could not be loaded.");
            }

            const studies = await response.json();
            const publishedStudies = Array.isArray(studies)
                ? studies.filter((study) => study.published !== false)
                : [];
            const foundIndex = publishedStudies.findIndex((item) => item.id === requestedId);
            const activeIndex = foundIndex >= 0 ? foundIndex : 0;
            const study = publishedStudies[activeIndex];

            if (!study) {
                showMissing();
                return;
            }

            renderStudy(study, publishedStudies, activeIndex);
        } catch (error) {
            console.warn(error);
            showMissing();
        }
    };

    document.addEventListener("DOMContentLoaded", loadStudy);
})();
