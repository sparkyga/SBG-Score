(function () {
  let sbgGradeText = document.querySelector("body > modal-container > div > div > app-overall-grade > div.modal-body > div > span");
  if (!sbgGradeText) {
    document.querySelector("#grade-table-container > div.table-title.p-2.mb-0.text-white.title > button").click();
    sbgGradeText = document.querySelector("body > modal-container > div > div > app-overall-grade > div.modal-body > div > span");
  }

  if (sbgGradeText) {
    const value = parseFloat(sbgGradeText.innerHTML.split(': ')[1]);
    sbgGradeText.innerHTML = 'SBG Grade: ' + value;

    const getLetterGrade = (percentage) => {
      const gradeThresholds = {
        "A": 93,
        "A-": 90,
        "B+": 87,
        "B": 83,
        "B-": 80,
        "C+": 77,
        "C": 73,
        "C-": 70,
        "D+": 67,
        "D": 63,
        "D-": 60,
        "F": 0
      };

      for (const [grade, threshold] of Object.entries(gradeThresholds)) {
        if (percentage >= threshold) return grade;
      }
      return "F";
    };

    const midtermInput = document.createElement('div');
    const midtermSpan = document.createElement('span');
    const midtermGrade = localStorage.getItem('midterm-grade');
    if (midtermGrade) {
      midtermSpan.innerHTML = 'Midterm Percentage: <input id="midterm-grade" type="number" min="0" max="100" style="width: 100px;" value="' + midtermGrade + '" />';
    } else {
      midtermSpan.innerHTML = 'Midterm Percentage: <input id="midterm-grade" type="number" min="0" max="100" style="width: 100px;" />';
    }
    midtermSpan.setAttribute('ngcontent-orn-c175', '');
    midtermSpan.style.display = 'inline-block';
    midtermInput.appendChild(midtermSpan);

    midtermInput.appendChild(document.createElement('hr'));

    const overallGrade = document.createElement('span');
    overallGrade.id = 'overall-grade';
    const initialOverallGrade = (value * 0.8 + (midtermGrade || 0) * 0.2).toFixed(2);
    overallGrade.innerHTML = `Overall Grade: ${initialOverallGrade}% (${getLetterGrade(initialOverallGrade)})`;
    overallGrade.setAttribute('ngcontent-orn-c175', '');
    overallGrade.style.display = 'inline-block';
    midtermInput.appendChild(overallGrade);

    // Add progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.marginTop = "10px";
    progressBarContainer.style.width = "100%";
    progressBarContainer.style.backgroundColor = "#e0e0e0";
    progressBarContainer.style.borderRadius = "10px";
    progressBarContainer.style.position = "relative";
    progressBarContainer.style.height = "25px"; // Increased height for better readability

    const progressBar = document.createElement('div');
    const initialProgress = ((value * 0.8 + (midtermGrade || 0) * 0.2) / 100) * 100;
    progressBar.style.height = "100%";
    progressBar.style.width = `${Math.min(initialProgress, 100)}%`;
    progressBar.style.backgroundColor = initialProgress >= 90 ? "#4caf50" : initialProgress >= 70 ? "#ffeb3b" : "#f44336";
    progressBar.style.borderRadius = "10px";
    progressBar.style.fontSize = "14px"; // Larger font size
    progressBar.style.fontWeight = "bold";
    progressBar.style.padding = "0 5px"; // Added padding for readability
    progressBar.style.color = "white";
    progressBar.style.textAlign = "center";
    progressBar.style.lineHeight = "25px"; // Adjusted to match height
    progressBar.textContent = `${initialProgress.toFixed(1)}%`;

    progressBarContainer.appendChild(progressBar);
    midtermInput.appendChild(progressBarContainer);

    midtermInput.querySelector('#midterm-grade').addEventListener('input', (event) => {
      const updatedMidtermGrade = midtermInput.querySelector('#midterm-grade').value || 0;
      const updatedOverallGrade = (value * 0.8 + updatedMidtermGrade * 0.2).toFixed(2);
      overallGrade.innerHTML = `Overall Grade: ${updatedOverallGrade}% (${getLetterGrade(updatedOverallGrade)})`;

      // Update progress bar
      const updatedProgress = (updatedOverallGrade / 100) * 100;
      progressBar.style.width = `${Math.min(updatedProgress, 100)}%`;
      progressBar.textContent = `${updatedOverallGrade}%`;
      progressBar.style.backgroundColor = updatedProgress >= 90 ? "#4caf50" : updatedProgress >= 70 ? "#ffeb3b" : "#f44336";

      // Save updated midterm grade
      localStorage.setItem('midterm-grade', updatedMidtermGrade);
    });

    document.querySelector(".overall-grade-text").appendChild(midtermInput);

    const gradeThresholds = {
      "A": 93,
      "A-": 90,
      "B+": 87,
      "B": 83,
      "B-": 80,
      "C+": 77,
      "C": 73,
      "C-": 70,
      "D+": 67,
      "D": 63,
      "D-": 60,
      "F": 0
    };

    // Create elements for target grade and results
    const targetGradeContainer = document.createElement('div');
    const targetGradeSpan = document.createElement('span');
    targetGradeSpan.innerHTML = 'Target Grade: <select id="target-grade"></select>';
    targetGradeSpan.setAttribute('ngcontent-orn-c175', '');
    targetGradeSpan.style.display = 'inline-block';
    targetGradeContainer.appendChild(targetGradeSpan);

    // Populate target grade dropdown
    const targetGradeSelect = targetGradeContainer.querySelector('#target-grade');
    for (const grade in gradeThresholds) {
      const option = document.createElement('option');
      option.value = grade;
      option.textContent = grade;
      targetGradeSelect.appendChild(option);
    }

    targetGradeContainer.appendChild(document.createElement('hr'));

    // Create result displays
    const targetResultDisplay = document.createElement('div');
    targetResultDisplay.id = 'target-result';
    targetResultDisplay.setAttribute('ngcontent-orn-c175', '');
    targetGradeContainer.appendChild(targetResultDisplay);

    const safeGradeDisplay = document.createElement('div');
    safeGradeDisplay.id = 'safe-grade';
    safeGradeDisplay.setAttribute('ngcontent-orn-c175', '');
    targetGradeContainer.appendChild(safeGradeDisplay);

    const motivationalMessage = document.createElement('div');
    motivationalMessage.id = 'motivational-message';
    motivationalMessage.setAttribute('ngcontent-orn-c175', '');
    targetGradeContainer.appendChild(motivationalMessage);

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
      #target-result, #safe-grade, #motivational-message {
        margin: 10px 0;
        transition: opacity 0.3s;
      }
    `;
    document.head.appendChild(styles);

    // Motivational messages
    const motivationalMessages = [
      "Keep pushing! Every effort counts!",
      "Great work! You're doing amazing!",
      "You're almost there! Stay focused!",
      "Fantastic job! Keep up the momentum!"
    ];

    // Animation helper
    const animateDisplay = (element, text, color) => {
      element.style.opacity = 0;
      setTimeout(() => {
        element.textContent = text;
        element.style.color = color;
        element.style.opacity = 1;
      }, 300);
    };

    // Calculate functions
    const calculateSafeGrade = () => {
      const safeScore = (value * 0.8 + 55 * 0.2).toFixed(1);
      let safeGrade = "F";
      for (const grade in gradeThresholds) {
        if (safeScore >= gradeThresholds[grade]) {
          safeGrade = grade;
          break;
        }
      }
      animateDisplay(
        safeGradeDisplay,
        `You have a safe ${safeGrade} grade (assuming a 55% final score).`,
        "blue"
      );
    };

    const calculateTargetGrade = () => {
      const midtermScore = parseFloat(midtermInput.querySelector('#midterm-grade').value) || 0;
      const targetGrade = targetGradeSelect.value;
      const threshold = gradeThresholds[targetGrade];

      if (threshold === undefined) {
        animateDisplay(targetResultDisplay, "Invalid target grade.", "red");
        return;
      }

      const requiredScore = ((threshold - 0.8 * value - 0.1 * midtermScore) / 0.1).toFixed(1);

      if (requiredScore > 100) {
        const requiredIncrease = threshold - (0.8 * value + 0.1 * midtermScore + 0.1 * 100);
        const netIncrease = (requiredIncrease / 0.8).toFixed(1);
        animateDisplay(
          targetResultDisplay,
          `Achieving this grade is not possible. You need to increase your SBG score by ${netIncrease}% to qualify (total: ${(value + parseFloat(netIncrease)).toFixed(1)}%).`,
          "red"
        );
      } else if (requiredScore < 0) {
        animateDisplay(targetResultDisplay, "You have already exceeded the target grade.", "green");
      } else {
        animateDisplay(targetResultDisplay, `You need ${requiredScore}% on the final to achieve a ${targetGrade}.`, "blue");
      }

      // Update motivational message
      const progress = Math.min(100, Math.max(0, value));
      const messageIndex = Math.min(Math.floor(progress / 25), motivationalMessages.length - 1);
      animateDisplay(motivationalMessage, motivationalMessages[messageIndex], "#007aff");
    };

    // Add event listeners
    targetGradeSelect.addEventListener('change', calculateTargetGrade);
    midtermInput.querySelector('#midterm-grade').addEventListener('input', calculateTargetGrade);

    // Initial calculations
    calculateSafeGrade();
    calculateTargetGrade(); 

    // Add export button
    const exportButton = document.createElement('button');
    exportButton.innerHTML = 'Export';
    exportButton.addEventListener('click', () => {
      // Export functionality
      const data = `SBG Score: ${value}\nMidterm Score: ${midtermInput.querySelector('#midterm-grade').value}\nTarget Grade: ${targetGradeSelect.value}\nOverall Grade: ${overallGrade.textContent}\n${targetResultDisplay.textContent}\n${safeGradeDisplay.textContent}\nMotivational Message: ${motivationalMessage.textContent}`;
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SBG_Scores.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
    targetGradeContainer.appendChild(exportButton);

    // Add to DOM
    document.querySelector(".overall-grade-text").appendChild(targetGradeContainer);

    // Add footer
    const footer = document.createElement("footer");
    footer.style.marginTop = "20px";
    footer.style.fontSize = "12px";
    footer.style.textAlign = "center";
    footer.style.color = "#555";
    footer.innerHTML = "Made by Grayson Anderson and Teddy Lampert";
    document.querySelector(".overall-grade-text").appendChild(footer);
  }
})();