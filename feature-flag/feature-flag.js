// Geeting All Flags Status from Local Storage on Page Load
window.onload = function () {
    let firstItem = JSON.parse(localStorage.getItem("Show-Repository-Feature"));
    let secondItem = JSON.parse(localStorage.getItem("Auto-Text-Feature"));

    if (firstItem) {
        document.getElementById("showRepoToggle").checked = true
    }

    if (secondItem) {
        document.getElementById("autoTextToggle").checked = true
    }
};

// Toggling the Show Repository Feature
const showRepoToggle = document.getElementById("showRepoToggle");

showRepoToggle.addEventListener("click", () => {
    if (showRepoToggle.checked == true) {
        localStorage.setItem("Show-Repository-Feature", true);
    } else if (showRepoToggle.checked == false) {
        localStorage.setItem("Show-Repository-Feature", false);
    }
})

// Toggling the Auto Text Writer Feature
const autoTextToggle = document.getElementById("autoTextToggle");

autoTextToggle.addEventListener("click", () => {
    if (autoTextToggle.checked == true) {
        localStorage.setItem("Auto-Text-Feature", true);
    } else if (autoTextToggle.checked == false) {
        localStorage.setItem("Auto-Text-Feature", false);
    }
})

// Apply Changes Button
let showChanges1 = document.getElementById("showChanges1");
let showChanges2 = document.getElementById("showChanges2");

var childWindow = "";
var newTabUrl = "http://127.0.0.1:55321/";

function openNewTab() {
    childWindow = window.open(newTabUrl);
}

showChanges1.addEventListener('click', () => {
    openNewTab();
})

showChanges2.addEventListener('click', () => {
    openNewTab();
})