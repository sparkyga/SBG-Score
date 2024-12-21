// popup.js: Enhanced with progress bar colors and motivational messages

document.addEventListener("DOMContentLoaded", () => {
  const midtermInput = document.getElementById("midtermScore");
  const sbgInput = document.getElementById("sbgScore");
  const targetInput = document.getElementById("targetGrade");
  const resultDisplay = document.getElementById("result");
  const targetResultDisplay = document.getElementById("targetResult");
  const progressBar = document.getElementById("progressBar");
  const safeGradeDisplay = document.getElementById("safeGrade");
  const motivationalMessage = document.getElementById("motivationalMessage");

  // Grade thresholds for target grades
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

  // Motivational messages based on grades
  const motivationalMessages = [
      "Keep pushing! Every effort counts!",
      "Great work! You're doing amazing!",
      "You're almost there! Stay focused!",
      "Fantastic job! Keep up the momentum!"
  ];

  // Populate dropdown with grade options
  for (const grade in gradeThresholds) {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      targetInput.appendChild(option);
  }

  // Load saved scores on popup load
  const savedMidtermScore = localStorage.getItem("midtermScore");
  const savedSbgScore = localStorage.getItem("sbgScore");

  if (savedMidtermScore !== null) {
      midtermInput.value = savedMidtermScore;
  }

  if (savedSbgScore !== null) {
      sbgInput.value = savedSbgScore;
  }

  // Smooth animation helper
  const animateDisplay = (element, text, color) => {
      element.style.opacity = 0;
      setTimeout(() => {
          element.textContent = text;
          element.style.color = color;
          element.style.opacity = 1;
      }, 300);
  };

  // Function to calculate and display the overall grade
  const calculateOverallGrade = () => {
      const midtermScore = parseFloat(midtermInput.value) || 0;
      const sbgScore = parseFloat(sbgInput.value) || 0;

      // Calculate overall grade
      const overallGrade = (0.8 * sbgScore + 0.2 * midtermScore).toFixed(1);

      // Update progress bar
      const progress = Math.min(100, Math.max(0, overallGrade));
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${progress}%`;
      if (progress >= 90) {
          progressBar.style.backgroundColor = "#4caf50"; // Green
      } else if (progress >= 70) {
          progressBar.style.backgroundColor = "#ffeb3b"; // Yellow
      } else {
          progressBar.style.backgroundColor = "#f44336"; // Red
      }

      animateDisplay(resultDisplay, `Your overall grade is: ${overallGrade}%`, "blue");

      // Display a motivational message based on progress
      const messageIndex = Math.min(
          Math.floor(progress / 25),
          motivationalMessages.length - 1
      );
      animateDisplay(motivationalMessage, motivationalMessages[messageIndex], "#007aff");

      // Calculate the "safe" grade assuming a 55% second final score
      const safeScore = (0.8 * sbgScore + 0.2 * 55).toFixed(1);
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

  // Function to calculate the required final score for the desired grade
  const calculateTargetFinal = () => {
      const midtermScore = parseFloat(midtermInput.value) || 0;
      const sbgScore = parseFloat(sbgInput.value) || 0;
      const targetGrade = targetInput.value;

      const threshold = gradeThresholds[targetGrade];
      if (threshold === undefined) {
          animateDisplay(targetResultDisplay, "Invalid target grade.", "red");
          return;
      }

      // Solve for x in 0.8(sbg) + 0.1(midterm) + 0.1x = threshold
      const requiredScore = ((threshold - 0.8 * sbgScore - 0.1 * midtermScore) / 0.1).toFixed(1);

      if (requiredScore > 100) {
          const requiredIncrease = threshold - (0.8 * sbgScore + 0.1 * midtermScore + 0.1 * 100);
          const netIncrease = (requiredIncrease / 0.8).toFixed(1);
          animateDisplay(
              targetResultDisplay,
              `Achieving this grade is not possible. You need to increase your SBG score by ${netIncrease}% to qualify (total: ${(parseFloat(sbgScore) + parseFloat(netIncrease)).toFixed(1)}%).`,
              "red"
          );
      } else if (requiredScore < 0) {
          animateDisplay(targetResultDisplay, "You have already exceeded the target grade.", "green");
      } else {
          animateDisplay(targetResultDisplay, `You need ${requiredScore}% on the final to achieve a ${targetGrade}.`, "blue");
      }
  };

  // Save the scores to localStorage whenever they change
  midtermInput.addEventListener("input", () => {
      localStorage.setItem("midtermScore", midtermInput.value);
      calculateOverallGrade();
      calculateTargetFinal();
  });

  sbgInput.addEventListener("input", () => {
      localStorage.setItem("sbgScore", sbgInput.value);
      calculateOverallGrade();
      calculateTargetFinal();
  });

  targetInput.addEventListener("change", () => {
      calculateTargetFinal();
  });

  // Initial calculation on load
  calculateOverallGrade();
  calculateTargetFinal();

  // Export functionality
  document.getElementById("exportButton").addEventListener("click", () => {
      const data = `SBG Score: ${sbgInput.value}\nMidterm Score: ${midtermInput.value}\nTarget Grade: ${targetInput.value}\nOverall Grade: ${resultDisplay.textContent}\n${targetResultDisplay.textContent}\n${safeGradeDisplay.textContent}\nMotivational Message: ${motivationalMessage.textContent}`;
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SBG_Scores.txt";
      a.click();
      URL.revokeObjectURL(url);
  });
});
