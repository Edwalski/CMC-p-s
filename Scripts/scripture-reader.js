const scriptureToggle = document.querySelector(".scripture-toggle");
const scriptureReaderContent = document.querySelector("#scripture-reader-content");

if (scriptureToggle && scriptureReaderContent) {
    scriptureToggle.addEventListener("click", () => {
        const isExpanded = scriptureToggle.getAttribute("aria-expanded") === "true";

        scriptureReaderContent.hidden = isExpanded;
        scriptureToggle.setAttribute("aria-expanded", String(!isExpanded));
        scriptureToggle.textContent = isExpanded ? "Show Scripture Links" : "Hide Scripture Links";
    });
}

document.querySelectorAll("[data-scripture-url]").forEach((button) => {
    button.addEventListener("click", () => {
        const url = button.dataset.scriptureUrl;

        if (!url) {
            return;
        }

        window.open(url, "_blank", "noopener,noreferrer");
    });
});
