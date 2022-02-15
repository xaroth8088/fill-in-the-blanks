chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: [
            "compendium.minimal.js",
            "makeIntoWordGame.js"
        ]
    });
});
