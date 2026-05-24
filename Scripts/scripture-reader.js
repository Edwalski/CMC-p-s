const scriptureViewer = document.querySelector("#scripture-viewer");
const scriptureFrame = document.querySelector("#scripture-frame");
const scriptureTitle = document.querySelector("#scripture-viewer-title");
const scriptureLink = document.querySelector("#scripture-viewer-link");
const scriptureToggle = document.querySelector(".scripture-toggle");
const scriptureFrameArea = document.querySelector("#scripture-frame-area");

if (scriptureToggle && scriptureFrameArea) {
    scriptureToggle.addEventListener("click", () => {
        const isExpanded = scriptureToggle.getAttribute("aria-expanded") === "true";

        scriptureFrameArea.hidden = isExpanded;
        scriptureToggle.setAttribute("aria-expanded", String(!isExpanded));
        scriptureToggle.textContent = isExpanded ? "Show" : "Hide";
    });
}

document.querySelectorAll("[data-scripture-url]").forEach((button) => {
    button.addEventListener("click", () => {
        const url = button.dataset.scriptureUrl;
        const title = `${button.dataset.scriptureTitle} - ${button.textContent}`;

        scriptureTitle.textContent = title;
        scriptureLink.href = url;
        scriptureFrame.src = url;
        scriptureViewer.hidden = false;
        scriptureFrameArea.hidden = false;
        scriptureToggle.setAttribute("aria-expanded", "true");
        scriptureToggle.textContent = "Hide";
        scriptureViewer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
