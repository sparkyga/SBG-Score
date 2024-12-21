(function () {
    // Locate the element containing the "Overall Grade" popup
    const overallGradePopup = document.querySelector("div[role='dialog']");
  
    if (overallGradePopup) {
      // Find the text node with the score
      const gradeText = overallGradePopup.innerText;
      const match = gradeText.match(/Current overall grade for All Standards: (\d+(\.\d+)?)/);
  
      if (match) {
        const sbgScore = parseFloat(match[1]);
        // Send the score to the extension's popup
        chrome.runtime.sendMessage({ sbgScore });
      }
    }
  })();
  