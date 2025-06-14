chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("sbgbook.xyz/student/section/4125")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"]
    });
  }
});
