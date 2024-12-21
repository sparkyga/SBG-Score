chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("sbgbook.xyz")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"]
    });
  }
});
