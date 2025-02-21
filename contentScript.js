const setupOverallGrade = () => {
  let sbgGradeText = document.querySelector("body > modal-container > div > div > app-overall-grade > div.modal-body > div > span");
  if (!sbgGradeText) {
    document.querySelector("#grade-table-container > div.table-title.p-2.mb-0.text-white.title > button").click();
    sbgGradeText = document.querySelector("body > modal-container > div > div > app-overall-grade > div.modal-body > div > span");
  }

  if (sbgGradeText) {
    const value = parseFloat(sbgGradeText.innerHTML.split(': ')[1]);
    sbgGradeText.innerHTML = 'SBG Grade: ' + value + '%';

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
    // const targetGradeContainer = document.createElement('div');
    // const targetGradeSpan = document.createElement('span');
    // targetGradeSpan.innerHTML = 'Target Grade: <select id="target-grade"></select>';
    // targetGradeSpan.setAttribute('ngcontent-orn-c175', '');
    // targetGradeSpan.style.display = 'inline-block';
    // targetGradeContainer.appendChild(targetGradeSpan);

    // Populate target grade dropdown
    const targetGradeSelect = targetGradeContainer.querySelector('#target-grade');
    for (const grade in gradeThresholds) {
      const option = document.createElement('option');
      option.value = grade;
      option.textContent = grade;
      targetGradeSelect.appendChild(option);
    }

    // Set initial target grade from localStorage if exists
    const savedTargetGrade = localStorage.getItem('target-grade');
    if (savedTargetGrade) {
      targetGradeSelect.value = savedTargetGrade;
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

      // Save target grade to localStorage
      localStorage.setItem('target-grade', targetGrade);

      if (threshold === undefined) {
        animateDisplay(targetResultDisplay, "Invalid target grade.", "red");
        return;
      }

      // const requiredScore = ((threshold - 0.8 * value - 0.1 * midtermScore) / 0.1).toFixed(1);

      // if (requiredScore > 100) {
      //   const requiredIncrease = threshold - (0.8 * value + 0.1 * midtermScore + 0.1 * 100);
      //   const netIncrease = (requiredIncrease / 0.8).toFixed(1);
      //   animateDisplay(
      //     targetResultDisplay,
      //     `Achieving this grade is not possible. You need to increase your SBG score by ${netIncrease}% to qualify (total: ${(value + parseFloat(netIncrease)).toFixed(1)}%).`,
      //     "red"
      //   );
      // } else if (requiredScore < 0) {
      //   animateDisplay(targetResultDisplay, "You have already exceeded the target grade.", "green");
      // } else {
      //   animateDisplay(targetResultDisplay, `You need ${requiredScore}% on the final to achieve a ${targetGrade}.`, "blue");
      // }

      // // Update motivational message
      // const progress = Math.min(100, Math.max(0, value));
      // const messageIndex = Math.min(Math.floor(progress / 25), motivationalMessages.length - 1);
      // animateDisplay(motivationalMessage, motivationalMessages[messageIndex], "#007aff");
    };

    // Add event listeners
    targetGradeSelect.addEventListener('change', calculateTargetGrade);
    midtermInput.querySelector('#midterm-grade').addEventListener('input', calculateTargetGrade);

    // Initial calculations
    // calculateSafeGrade();
    // calculateTargetGrade();

    // Add export button
    const exportButton = document.createElement('button');
    exportButton.innerHTML = 'Export';
    exportButton.addEventListener('click', () => {
      // Export functionality
      const data = `SBG Score: ${value}\nMidterm Score: ${midtermInput.querySelector('#midterm-grade').value}\n\nOverall Grade: ${overallGrade.textContent}`;
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
}

let createdScores = [];
let newStandardScores = {};
let changedScores = {};
let changedScoresBox = null;

const loOrdering = [
  'Structure & Function 1',
  'Structure & Function 2',
  'Structure & Function 3',
  'Biological Process 1',
  'Biological Process 2',
  'Genetics 1',
  'Genetics 2',
  'Genetics 3',
  'Evolution 1',
  'Evolution 2',
  'Laboratory 1'
]

const checkForGradeTable = () => {
  if (document.querySelector("#grade-table-container")) {
    document.querySelector("#grade-table-container > div.table-title.p-2.mb-0.text-white.title > button").addEventListener("click", setupOverallGrade);

    document.querySelectorAll(".fa-search").forEach((openLOButton) => {
      openLOButton.addEventListener("click", () => {
        document.querySelectorAll("assessment-scores").forEach((scoreBox) => {
          setTimeout(() => {
            createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).forEach((score) => {
              const scoreContainer = document.createElement('div');
              scoreContainer.dataset.scoreId = score.id;
              const attributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2)")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of attributes) {
                scoreContainer.setAttribute(attr.name, attr.value);
              }
              scoreContainer.classList.add("score-container", "mb-1");

              const dateContainer = document.createElement("div");
              const dateText = document.createElement("p");
              const dateAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.date-container.mb-2")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of dateAttributes) {
                dateContainer.setAttribute(attr.name, attr.value);
                dateText.setAttribute(attr.name, attr.value);
              }
              dateContainer.classList.add("date-container", "mb-2");
              dateText.textContent = 'Hypothetical';
              dateText.style.color = 'orange';
              dateContainer.appendChild(dateText);

              const scoreText = document.createElement("simple-score");
              const scoreAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.date-container.mb-2 > simple-score")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of scoreAttributes) {
                scoreText.setAttribute(attr.name, attr.value);
              }
              scoreText.classList.add("score");
              scoreText.textContent = score.score;
              scoreText.contentEditable = true;
              scoreText.style.backgroundColor = score.score >= 9 ? "rgb(49, 154, 66)" : score.score >= 7 ? "rgb(255, 207, 57)" : score.score >= 5 ? "rgb(239, 29, 23)" : "#000000";
              dateContainer.appendChild(scoreText);
              scoreContainer.appendChild(dateContainer);

              scoreText.addEventListener("input", () => {
                createdScores = createdScores.map((s) => {
                  if (s.id === score.id) {
                    return { ...s, score: parseInt(scoreText.textContent) };
                  }
                  return s;
                });
              });

              scoreText.addEventListener("blur", () => {
                const newScore = parseInt(scoreText.textContent);
                
                // Update score color
                if (newScore > 10) {
                  scoreText.style.backgroundColor = "#000000";
                } else if (newScore >= 9) {
                  scoreText.style.backgroundColor = "rgb(49, 154, 66)";
                } else if (newScore >= 7) {
                  scoreText.style.backgroundColor = "rgb(255, 207, 57)";
                } else if (newScore >= 5) {
                  scoreText.style.backgroundColor = "rgb(239, 29, 23)";
                } else {
                  scoreText.style.backgroundColor = "#000000";
                }

                // Update standard score
                const standardScore = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.heading > div > div");
                const allScores = [
                  ...createdScores.filter((s) => s.standard === document.getElementById('standard-name').textContent).map((s) => s.score),
                  ...Array.from(scoreBox.querySelectorAll("div.score")).filter((_, index) => index % 2 === 0).map((score, index) => {
                    const assessmentName = `${document.getElementById('standard-name').textContent}-${index + 1}`;
                    if (changedScores[assessmentName] && changedScores[assessmentName].to !== null) {
                      return changedScores[assessmentName].to;
                    } else {
                      return parseInt(score.textContent);
                    }
                  })
                ];

                if (allScores.length === 1) {
                  standardScore.textContent = allScores[0];
                } else if (allScores.length === 2) {
                  standardScore.textContent = (0.6 * allScores[0] + 0.4 * allScores[1]).toFixed(1);
                } else {
                  const avgAllOthers = allScores.slice(2).reduce((a, b) => a + b, 0) / allScores.slice(2).length;
                  standardScore.textContent = (0.6 * allScores[0] + 0.3 * allScores[1] + 0.1 * avgAllOthers).toFixed(1);
                }

                if (standardScore.textContent >= 9) {
                  standardScore.style.backgroundColor = "rgb(49, 154, 66)";
                } else if (standardScore.textContent >= 7) {
                  standardScore.style.backgroundColor = "rgb(255, 207, 57)";
                } else if (standardScore.textContent >= 5) {
                  standardScore.style.backgroundColor = "rgb(239, 29, 23)";
                } else {
                  standardScore.style.backgroundColor = "#000000";
                }

                newStandardScores[document.getElementById('standard-name').textContent] = standardScore.textContent;

                document.querySelectorAll(".scorehover").forEach((score, index) => {
                  const lo = loOrdering[index];
                  if (newStandardScores[lo] !== undefined) {
                    score.childNodes[0].textContent = newStandardScores[lo];
                    if (newStandardScores[lo] >= 9) {
                      score.style.backgroundColor = "rgb(49, 154, 66)";
                    } else if (newStandardScores[lo] >= 7) {
                      score.style.backgroundColor = "rgb(255, 207, 57)";
                    } else if (newStandardScores[lo] >= 5) {
                      score.style.backgroundColor = "rgb(239, 29, 23)";
                    } else {
                      score.style.backgroundColor = "#000000";
                    }
                  }
                });

                const standardName = document.getElementById('standard-name').textContent;
                const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                const pbarRow = loOrdering.indexOf(document.getElementById('standard-name').textContent);
                const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                pbars.innerHTML = '';

                const allLoScores = [
                  ...createdScores.filter((score) => score.standard === standardName).map((score) => score.score),
                  ...Object.entries(changedScores).filter(([name]) => name.startsWith(standardName)).map(([_, score]) => score.to || score.from)
                ]

                while (allLoScores.length > 6) {
                  allLoScores.pop();
                }

                while (allLoScores.length < 6) {
                  allLoScores.push(null);
                }

                allLoScores.reverse();
                allLoScores.forEach((score) => {
                  const pbarContainer = document.createElement('score-bar');
                  for (const attr of scoreBarAttributes) {
                    pbarContainer.setAttribute(attr.name, attr.value);
                  }
                  const progressParent = document.createElement('div');
                  for (const attr of progressBarParentAttributes) {
                    progressParent.setAttribute(attr.name, attr.value);
                  }
                  if (score !== null) {
                    const progressBar = document.createElement('div');
                    for (const attr of progressBarAttributes) {
                      progressBar.setAttribute(attr.name, attr.value);
                    }
                    progressBar.style.height = `${score * 10}%`;
                    progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                    progressParent.appendChild(progressBar);
                  } else {
                    progressParent.style.border = 'none';
                  }
                  pbarContainer.appendChild(progressParent);
                  pbars.appendChild(pbarContainer);
                });

                const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(standardName) + 1}) > td:nth-child(3) > div > div`);
                loBar.style.width = newStandardScores[standardName] * 10 + "%";
                loBar.style.backgroundColor = newStandardScores[standardName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[standardName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[standardName] >= 5 ? "rgb(239, 29, 23)" : "#000000";

                // Use a different variable name to avoid redeclaration
                const updatedScoresArray = Object.values(changedScores).filter(score => score.to !== null);
                if (updatedScoresArray.length > 0 || createdScores.length > 0) {
                  if (changedScoresBox) {
                    changedScoresBox.remove();
                  }
                  changedScoresBox = document.createElement("div");
                  changedScoresBox.classList.add('panel', 'mb-3');
                  const boxTitle = document.createElement('div');
                  boxTitle.classList.add('table-title', 'p-2', 'mb-0', 'text-white', 'title');
                  boxTitle.innerHTML = "Hypothetical Changes";
                  changedScoresBox.appendChild(boxTitle);

                  let groupedChanges = {};
                  for (const [assessmentName, score] of Object.entries(changedScores)) {
                    if (score.to === null || score.from === score.to) continue;
                    const groupName = assessmentName.split('-')[0];
                    if (!groupedChanges[groupName]) {
                      groupedChanges[groupName] = [];
                    }
                    groupedChanges[groupName].push({ assessmentName, score });
                  }

                  for (const score of createdScores) {
                    const groupName = score.standard;
                    if (!groupedChanges[groupName]) {
                      groupedChanges[groupName] = [];
                    }
                    groupedChanges[groupName].push({
                      assessmentName: `created/${score.id}`,
                      score: {
                        displayName: score.name,
                        from: null,
                        to: score.score
                      }
                    });
                  }

                  for (const [groupName, changes] of Object.entries(groupedChanges)) {
                    const changedScoreBox = document.createElement("div");
                    changedScoreBox.classList.add('assessment-container');
                    const attributes = document.querySelector("#recent-score-container > div:nth-child(2) > div.assessment-container").attributes;
                    for (const attr of attributes) {
                      changedScoreBox.setAttribute(attr.name, attr.value);
                    }
                    const assessName = document.createElement("div");
                    assessName.classList.add("assess-name");
                    const nameAttributes = document.querySelector('#recent-score-container > div:nth-child(2) > div.assessment-container > div.assess-name').attributes;
                    for (const attr of nameAttributes) {
                      assessName.setAttribute(attr.name, attr.value);
                    }
                    assessName.innerHTML = groupName;
                    changedScoreBox.appendChild(assessName);
                    changedScoresBox.appendChild(changedScoreBox);

                    for (const change of changes) {
                      const scoreContainer = document.createElement("div");
                      scoreContainer.setAttribute('_ngcontent-nbx-c179', '');
                      scoreContainer.classList.add("score-container");
                      const scoreName = document.createElement("div");
                      const nameAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div").attributes;
                      for (const attr of nameAttributes) {
                        scoreName.setAttribute(attr.name, attr.value);
                      }
                      scoreName.classList.add("score-name");

                      const scoreNameSpan = document.createElement("span");
                      scoreNameSpan.innerHTML = `<strong>${change.assessmentName.startsWith('created') ? "Created" : "Changed"}:</strong> ${change.score.displayName}`;

                      const resetButton = document.createElement("button");
                      resetButton.classList.add("btn", "btn-tertiary", "btn-sm");
                      resetButton.style.marginLeft = "10px";
                      resetButton.textContent = "Reset";
                      resetButton.addEventListener("click", () => {
                        // Get all scores for this LO, including both created and changed scores
                        const loName = change.assessmentName.startsWith('created') ?
                          createdScores.find(score => score.id === change.assessmentName.split('/')[1]).standard :
                          change.assessmentName.split('-')[0];

                        // Remove the score from either createdScores or changedScores
                        if (change.assessmentName.startsWith('created')) {
                          createdScores = createdScores.filter((score) => score.id !== change.assessmentName.split('/')[1]);

                          // Remove the score element from the DOM
                          const scoreElement = document.querySelector(`[data-score-id="${change.assessmentName.split('/')[1]}"]`);
                          if (scoreElement) {
                            scoreElement.remove();
                          }
                        } else {
                          changedScores[change.assessmentName] = { from: change.score.from, to: null };
                        }

                        const loScores = [
                          ...createdScores
                            .filter(score => score.standard === loName)
                            .map(score => score.score),
                          ...Object.entries(changedScores)
                            .filter(([name]) => name.startsWith(loName))
                            .map(([_, score]) => score.to || score.from)
                        ];

                        // Calculate new standard score
                        if (loScores.length === 0) {
                          delete newStandardScores[loName];
                        } else if (loScores.length === 1) {
                          newStandardScores[loName] = loScores[0];
                        } else if (loScores.length === 2) {
                          newStandardScores[loName] = (0.6 * loScores[0] + 0.4 * loScores[1]).toFixed(1);
                        } else {
                          const avgOthers = loScores.slice(2).reduce((a, b) => a + b, 0) / loScores.slice(2).length;
                          newStandardScores[loName] = (0.6 * loScores[0] + 0.3 * loScores[1] + 0.1 * avgOthers).toFixed(1);
                        }

                        // Update progress bars
                        const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                        const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                        const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                        const pbarRow = loOrdering.indexOf(loName);
                        const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                        pbars.innerHTML = '';

                        const allLoScores = [
                          ...createdScores.filter((score) => score.standard === loName).map((score) => score.score),
                          ...Object.entries(changedScores).filter(([name]) => name.startsWith(loName)).map(([_, score]) => score.to || score.from)
                        ];

                        while (allLoScores.length > 6) {
                          allLoScores.pop();
                        }

                        while (allLoScores.length < 6) {
                          allLoScores.push(null);
                        }

                        allLoScores.reverse();
                        allLoScores.forEach((score) => {
                          const pbarContainer = document.createElement('score-bar');
                          for (const attr of scoreBarAttributes) {
                            pbarContainer.setAttribute(attr.name, attr.value);
                          }
                          const progressParent = document.createElement('div');
                          for (const attr of progressBarParentAttributes) {
                            progressParent.setAttribute(attr.name, attr.value);
                          }
                          if (score !== null) {
                            const progressBar = document.createElement('div');
                            for (const attr of progressBarAttributes) {
                              progressBar.setAttribute(attr.name, attr.value);
                            }
                            progressBar.style.height = `${score * 10}%`;
                            progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                            progressParent.appendChild(progressBar);
                          } else {
                            progressParent.style.border = 'none';
                          }
                          pbarContainer.appendChild(progressParent);
                          pbars.appendChild(pbarContainer);
                        });

                        // Update score display
                        document.querySelectorAll(".scorehover").forEach((score, index) => {
                          const lo = loOrdering[index];
                          if (newStandardScores[lo] !== undefined) {
                            score.childNodes[0].textContent = newStandardScores[lo];
                            if (newStandardScores[lo] >= 9) {
                              score.style.backgroundColor = "rgb(49, 154, 66)";
                            } else if (newStandardScores[lo] >= 7) {
                              score.style.backgroundColor = "rgb(255, 207, 57)";
                            } else if (newStandardScores[lo] >= 5) {
                              score.style.backgroundColor = "rgb(239, 29, 23)";
                            } else {
                              score.style.backgroundColor = "#000000";
                            }
                          }
                        });

                        // Update LO bar
                        const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(loName) + 1}) > td:nth-child(3) > div > div`);
                        if (newStandardScores[loName]) {
                          loBar.style.width = newStandardScores[loName] * 10 + "%";
                          loBar.style.backgroundColor = newStandardScores[loName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[loName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[loName] >= 5 ? "rgb(239, 29, 23)" : "#000000";
                        } else {
                          loBar.style.width = "0%";
                        }

                        // Clean up UI
                        changedScoresBox.removeChild(scoreContainer);

                        const children = Array.from(changedScoresBox.children);
                        for (let i = 0; i < children.length; i++) {
                          const child = children[i];
                          if (child.classList.contains('assessment-container')) {
                            let hasScores = false;
                            for (let j = i + 1; j < children.length; j++) {
                              if (children[j].classList.contains('assessment-container')) break;
                              if (children[j].classList.contains('score-container')) {
                                hasScores = true;
                                break;
                              }
                            }
                            if (!hasScores) changedScoresBox.removeChild(child);
                          }
                        }

                        // Remove changes panel if empty
                        const hasChanges = Object.values(changedScores).some(score => score.to !== null && score.from !== score.to) ||
                          createdScores.length > 0;
                        if (!hasChanges) {
                          changedScoresBox.remove();
                        }
                      });

                      scoreNameSpan.appendChild(resetButton);
                      scoreName.appendChild(scoreNameSpan);
                      scoreContainer.appendChild(scoreName);

                      const scoreBox = document.createElement("div");
                      scoreBox.classList.add("score-box");
                      const scoreBoxAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > app-score > div > div").attributes;
                      for (const attr of scoreBoxAttributes) {
                        scoreBox.setAttribute(attr.name, attr.value);
                      }

                      if (change.assessmentName.startsWith('created')) {
                        scoreBox.innerHTML = change.score.to;
                      } else {
                        scoreBox.innerHTML = `${change.score.from} -> ${change.score.to}`;
                      }
                      if (change.score.to >= 9) {
                        scoreBox.style.backgroundColor = "rgb(49, 154, 66)";
                      } else if (change.score.to >= 7) {
                        scoreBox.style.backgroundColor = "rgb(255, 207, 57)";
                      } else if (change.score.to >= 5) {
                        scoreBox.style.backgroundColor = "rgb(239, 29, 23)";
                      } else {
                        scoreBox.style.backgroundColor = "#000000";
                      }
                      scoreName.appendChild(scoreBox);
                      changedScoresBox.appendChild(scoreContainer);
                    }
                  }

                  const boxParent = document.querySelector("#body-wrapper > app-student > div > div > app-student-section > div.row > div:nth-child(2)");
                  boxParent.prepend(changedScoresBox);
                }
              });

              const nameElement = document.createElement("div");
              const nameText = document.createElement("p");
              const nameAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.standard-container")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of nameAttributes) {
                nameElement.setAttribute(attr.name, attr.value);
                nameText.setAttribute(attr.name, attr.value);
              }
              nameText.classList.add('assess-info');
              nameText.textContent = score.name;
              nameElement.appendChild(nameText);
              scoreContainer.appendChild(nameElement);

              document.querySelector("assessment-scores").prepend(scoreContainer);
            });
            
            const createAssessmentButton = document.createElement("button");
            createAssessmentButton.classList.add("btn", "btn-success", "mt-3");
            createAssessmentButton.textContent = "Create Hypothetical Assessment";
            createAssessmentButton.addEventListener("click", () => {
              const name = prompt("Enter the name of the assessment:");
              if (!name) return;
              const newScoreId = `${name}-${Math.random().toString(36).substring(2, 15)}`;
              createdScores = [{ id: newScoreId, name, standard: document.getElementById('standard-name').textContent, score: 10 }, ...createdScores];

              const scoreContainer = document.createElement('div');
              const attributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2)")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of attributes) {
                scoreContainer.setAttribute(attr.name, attr.value);
              }
              scoreContainer.classList.add("score-container", "mb-1");

              const changedScoresArray = Object.values(changedScores).filter(score => score.to !== null);
              if (changedScoresArray.length > 0 || createdScores.length > 0) {
                if (changedScoresBox) {
                  changedScoresBox.remove();
                }
                changedScoresBox = document.createElement("div");
                changedScoresBox.classList.add('panel', 'mb-3');
                const boxTitle = document.createElement('div');
                boxTitle.classList.add('table-title', 'p-2', 'mb-0', 'text-white', 'title');
                boxTitle.innerHTML = "Hypothetical Changes";
                changedScoresBox.appendChild(boxTitle);

                let groupedChanges = {};
                for (const [assessmentName, score] of Object.entries(changedScores)) {
                  if (score.to === null || score.from === score.to) continue;
                  const groupName = assessmentName.split('-')[0];
                  if (!groupedChanges[groupName]) {
                    groupedChanges[groupName] = [];
                  }
                  groupedChanges[groupName].push({ assessmentName, score });
                }

                for (const score of createdScores) {
                  const groupName = score.standard;
                  if (!groupedChanges[groupName]) {
                    groupedChanges[groupName] = [];
                  }
                  groupedChanges[groupName].push({
                    assessmentName: `created/${score.id}`,
                    score: {
                      displayName: score.name,
                      from: null,
                      to: score.score
                    }
                  });
                }

                for (const [groupName, changes] of Object.entries(groupedChanges)) {
                  const changedScoreBox = document.createElement("div");
                  changedScoreBox.classList.add('assessment-container');
                  const attributes = document.querySelector("#recent-score-container > div:nth-child(2) > div.assessment-container").attributes;
                  for (const attr of attributes) {
                    changedScoreBox.setAttribute(attr.name, attr.value);
                  }
                  const assessName = document.createElement("div");
                  assessName.classList.add("assess-name");
                  const nameAttributes = document.querySelector('#recent-score-container > div:nth-child(2) > div.assessment-container > div.assess-name').attributes;
                  for (const attr of nameAttributes) {
                    assessName.setAttribute(attr.name, attr.value);
                  }
                  assessName.innerHTML = groupName;
                  changedScoreBox.appendChild(assessName);
                  changedScoresBox.appendChild(changedScoreBox);

                  for (const change of changes) {
                    const scoreContainer = document.createElement("div");
                    scoreContainer.setAttribute('_ngcontent-nbx-c179', '');
                    scoreContainer.classList.add("score-container");
                    const scoreName = document.createElement("div");
                    const nameAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div").attributes;
                    for (const attr of nameAttributes) {
                      scoreName.setAttribute(attr.name, attr.value);
                    }
                    scoreName.classList.add("score-name");

                    const scoreNameSpan = document.createElement("span");
                    scoreNameSpan.innerHTML = `<strong>${change.assessmentName.startsWith('created') ? "Created" : "Changed"}:</strong> ${change.score.displayName}`;

                    const resetButton = document.createElement("button");
                    resetButton.classList.add("btn", "btn-tertiary", "btn-sm");
                    resetButton.style.marginLeft = "10px";
                    resetButton.textContent = "Reset";
                    resetButton.addEventListener("click", () => {
                      // Get all scores for this LO, including both created and changed scores
                      const loName = change.assessmentName.startsWith('created') ?
                        createdScores.find(score => score.id === change.assessmentName.split('/')[1]).standard :
                        change.assessmentName.split('-')[0];

                      // Remove the score from either createdScores or changedScores
                      if (change.assessmentName.startsWith('created')) {
                        createdScores = createdScores.filter((score) => score.id !== change.assessmentName.split('/')[1]);

                        // Remove the score element from the DOM
                        const scoreElement = document.querySelector(`[data-score-id="${change.assessmentName.split('/')[1]}"]`);
                        if (scoreElement) {
                          scoreElement.remove();
                        }
                      } else {
                        changedScores[change.assessmentName] = { from: change.score.from, to: null };
                      }

                      const loScores = [
                        ...createdScores
                          .filter(score => score.standard === loName)
                          .map(score => score.score),
                        ...Object.entries(changedScores)
                          .filter(([name]) => name.startsWith(loName))
                          .map(([_, score]) => score.to || score.from)
                      ];

                      // Calculate new standard score
                      if (loScores.length === 0) {
                        delete newStandardScores[loName];
                      } else if (loScores.length === 1) {
                        newStandardScores[loName] = loScores[0];
                      } else if (loScores.length === 2) {
                        newStandardScores[loName] = (0.6 * loScores[0] + 0.4 * loScores[1]).toFixed(1);
                      } else {
                        const avgOthers = loScores.slice(2).reduce((a, b) => a + b, 0) / loScores.slice(2).length;
                        newStandardScores[loName] = (0.6 * loScores[0] + 0.3 * loScores[1] + 0.1 * avgOthers).toFixed(1);
                      }

                      // Update progress bars
                      const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                      const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                      const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                      const pbarRow = loOrdering.indexOf(loName);
                      const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                      pbars.innerHTML = '';

                      const allLoScores = [
                        ...createdScores.filter((score) => score.standard === loName).map((score) => score.score),
                        ...Object.entries(changedScores).filter(([name]) => name.startsWith(loName)).map(([_, score]) => score.to || score.from)
                      ];

                      while (allLoScores.length > 6) {
                        allLoScores.pop();
                      }

                      while (allLoScores.length < 6) {
                        allLoScores.push(null);
                      }

                      allLoScores.reverse();
                      allLoScores.forEach((score) => {
                        const pbarContainer = document.createElement('score-bar');
                        for (const attr of scoreBarAttributes) {
                          pbarContainer.setAttribute(attr.name, attr.value);
                        }
                        const progressParent = document.createElement('div');
                        for (const attr of progressBarParentAttributes) {
                          progressParent.setAttribute(attr.name, attr.value);
                        }
                        if (score !== null) {
                          const progressBar = document.createElement('div');
                          for (const attr of progressBarAttributes) {
                            progressBar.setAttribute(attr.name, attr.value);
                          }
                          progressBar.style.height = `${score * 10}%`;
                          progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                          progressParent.appendChild(progressBar);
                        } else {
                          progressParent.style.border = 'none';
                        }
                        pbarContainer.appendChild(progressParent);
                        pbars.appendChild(pbarContainer);
                      });

                      // Update score display
                      document.querySelectorAll(".scorehover").forEach((score, index) => {
                        const lo = loOrdering[index];
                        if (newStandardScores[lo] !== undefined) {
                          score.childNodes[0].textContent = newStandardScores[lo];
                          if (newStandardScores[lo] >= 9) {
                            score.style.backgroundColor = "rgb(49, 154, 66)";
                          } else if (newStandardScores[lo] >= 7) {
                            score.style.backgroundColor = "rgb(255, 207, 57)";
                          } else if (newStandardScores[lo] >= 5) {
                            score.style.backgroundColor = "rgb(239, 29, 23)";
                          } else {
                            score.style.backgroundColor = "#000000";
                          }
                        }
                      });

                      // Update LO bar
                      const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(loName) + 1}) > td:nth-child(3) > div > div`);
                      if (newStandardScores[loName]) {
                        loBar.style.width = newStandardScores[loName] * 10 + "%";
                        loBar.style.backgroundColor = newStandardScores[loName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[loName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[loName] >= 5 ? "rgb(239, 29, 23)" : "#000000";
                      } else {
                        loBar.style.width = "0%";
                      }

                      // Clean up UI
                      changedScoresBox.removeChild(scoreContainer);

                      const children = Array.from(changedScoresBox.children);
                      for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        if (child.classList.contains('assessment-container')) {
                          let hasScores = false;
                          for (let j = i + 1; j < children.length; j++) {
                            if (children[j].classList.contains('assessment-container')) break;
                            if (children[j].classList.contains('score-container')) {
                              hasScores = true;
                              break;
                            }
                          }
                          if (!hasScores) changedScoresBox.removeChild(child);
                        }
                      }

                      // Remove changes panel if empty
                      const hasChanges = Object.values(changedScores).some(score => score.to !== null && score.from !== score.to) ||
                        createdScores.length > 0;
                      if (!hasChanges) {
                        changedScoresBox.remove();
                      }
                    });

                    scoreNameSpan.appendChild(resetButton);
                    scoreName.appendChild(scoreNameSpan);
                    scoreContainer.appendChild(scoreName);

                    const scoreBox = document.createElement("div");
                    scoreBox.classList.add("score-box");
                    const scoreBoxAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > app-score > div > div").attributes;
                    for (const attr of scoreBoxAttributes) {
                      scoreBox.setAttribute(attr.name, attr.value);
                    }

                    if (change.assessmentName.startsWith('created')) {
                      scoreBox.innerHTML = change.score.to;
                    } else {
                      scoreBox.innerHTML = `${change.score.from} -> ${change.score.to}`;
                    }
                    if (change.score.to >= 9) {
                      scoreBox.style.backgroundColor = "rgb(49, 154, 66)";
                    } else if (change.score.to >= 7) {
                      scoreBox.style.backgroundColor = "rgb(255, 207, 57)";
                    } else if (change.score.to >= 5) {
                      scoreBox.style.backgroundColor = "rgb(239, 29, 23)";
                    } else {
                      scoreBox.style.backgroundColor = "#000000";
                    }
                    scoreName.appendChild(scoreBox);
                    changedScoresBox.appendChild(scoreContainer);
                  }
                }

                const boxParent = document.querySelector("#body-wrapper > app-student > div > div > app-student-section > div.row > div:nth-child(2)");
                boxParent.prepend(changedScoresBox);
              }

              const dateContainer = document.createElement("div");
              const dateText = document.createElement("p");
              const dateAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.date-container.mb-2")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of dateAttributes) {
                dateContainer.setAttribute(attr.name, attr.value);
                dateText.setAttribute(attr.name, attr.value);
              }
              dateContainer.classList.add("date-container", "mb-2");
              dateText.textContent = 'Hypothetical';
              dateText.style.color = 'orange';
              dateContainer.appendChild(dateText);

              const scoreText = document.createElement("simple-score");
              const scoreAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.date-container.mb-2 > simple-score")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of scoreAttributes) {
                scoreText.setAttribute(attr.name, attr.value);
              }
              scoreText.classList.add("score");
              scoreText.textContent = "10";
              scoreText.contentEditable = true;
              scoreText.style.backgroundColor = "rgb(49, 154, 66)";
              dateContainer.appendChild(scoreText);
              scoreContainer.appendChild(dateContainer);

              scoreText.addEventListener("input", () => {
                createdScores = createdScores.map((score) => {
                  if (score.id === newScoreId) {
                    return { ...score, score: parseInt(scoreText.textContent) };
                  }
                  return score;
                });
              });

              scoreText.addEventListener("blur", () => {
                // update score color
                if (parseInt(scoreText.textContent) > 10) {
                  scoreText.style.backgroundColor = "#000000";
                } else if (parseInt(scoreText.textContent) >= 9) {
                  scoreText.style.backgroundColor = "rgb(49, 154, 66)";
                } else if (parseInt(scoreText.textContent) >= 7) {
                  scoreText.style.backgroundColor = "rgb(255, 207, 57)";
                } else if (parseInt(scoreText.textContent) >= 5) {
                  scoreText.style.backgroundColor = "rgb(239, 29, 23)";
                } else {
                  scoreText.style.backgroundColor = "#000000";
                }

                const standardScore = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.heading > div > div");
                const allScores = [
                  ...createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).map((score) => score.score),
                  ...Array.from(scoreBox.querySelectorAll("div.score")).filter((_, index) => index % 2 === 0).map((score, index) => {
                    const assessmentName = `${document.getElementById('standard-name').textContent}-${index + 1}`;
                    if (changedScores[assessmentName] && changedScores[assessmentName].to !== null) {
                      return changedScores[assessmentName].to;
                    } else {
                      return parseInt(score.textContent);
                    }
                  })
                ]

                if (allScores.length === 1) {
                  standardScore.textContent = allScores[0];
                } else if (allScores.length === 2) {
                  standardScore.textContent = (0.6 * allScores[0] + 0.4 * allScores[1]).toFixed(1);
                } else {
                  const avgAllOthers = allScores.slice(2).reduce((a, b) => a + b, 0) / allScores.slice(2).length;
                  standardScore.textContent = (0.6 * allScores[0] + 0.3 * allScores[1] + 0.1 * avgAllOthers).toFixed(1);
                }

                if (standardScore.textContent >= 9) {
                  standardScore.style.backgroundColor = "rgb(49, 154, 66)";
                } else if (standardScore.textContent >= 7) {
                  standardScore.style.backgroundColor = "rgb(255, 207, 57)";
                } else if (standardScore.textContent >= 5) {
                  standardScore.style.backgroundColor = "rgb(239, 29, 23)";
                } else {
                  standardScore.style.backgroundColor = "#000000";
                }

                newStandardScores[document.getElementById('standard-name').textContent] = standardScore.textContent;

                document.querySelectorAll(".scorehover").forEach((score, index) => {
                  const lo = loOrdering[index];
                  if (newStandardScores[lo] !== undefined) {
                    score.childNodes[0].textContent = newStandardScores[lo];
                    if (newStandardScores[lo] >= 9) {
                      score.style.backgroundColor = "rgb(49, 154, 66)";
                    } else if (newStandardScores[lo] >= 7) {
                      score.style.backgroundColor = "rgb(255, 207, 57)";
                    } else if (newStandardScores[lo] >= 5) {
                      score.style.backgroundColor = "rgb(239, 29, 23)";
                    } else {
                      score.style.backgroundColor = "#000000";
                    }
                  }
                });

                const standardName = document.getElementById('standard-name').textContent;
                const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                const pbarRow = loOrdering.indexOf(document.getElementById('standard-name').textContent);
                const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                pbars.innerHTML = '';

                const allLoScores = [
                  ...createdScores.filter((score) => score.standard === standardName).map((score) => score.score),
                  ...Object.entries(changedScores).filter(([name]) => name.startsWith(standardName)).map(([_, score]) => score.to || score.from)
                ]

                while (allLoScores.length > 6) {
                  allLoScores.pop();
                }

                while (allLoScores.length < 6) {
                  allLoScores.push(null);
                }

                allLoScores.reverse();
                allLoScores.forEach((score) => {
                  const pbarContainer = document.createElement('score-bar');
                  for (const attr of scoreBarAttributes) {
                    pbarContainer.setAttribute(attr.name, attr.value);
                  }
                  const progressParent = document.createElement('div');
                  for (const attr of progressBarParentAttributes) {
                    progressParent.setAttribute(attr.name, attr.value);
                  }
                  if (score !== null) {
                    const progressBar = document.createElement('div');
                    for (const attr of progressBarAttributes) {
                      progressBar.setAttribute(attr.name, attr.value);
                    }
                    progressBar.style.height = `${score * 10}%`;
                    progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                    progressParent.appendChild(progressBar);
                  } else {
                    progressParent.style.border = 'none';
                  }
                  pbarContainer.appendChild(progressParent);
                  pbars.appendChild(pbarContainer);
                });

                const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(standardName) + 1}) > td:nth-child(3) > div > div`);
                loBar.style.width = newStandardScores[standardName] * 10 + "%";
                loBar.style.backgroundColor = newStandardScores[standardName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[standardName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[standardName] >= 5 ? "rgb(239, 29, 23)" : "#000000";

                // Use a different variable name to avoid redeclaration
                const updatedScoresArray = Object.values(changedScores).filter(score => score.to !== null);
                if (updatedScoresArray.length > 0 || createdScores.length > 0) {
                        if (changedScoresBox) {
                          changedScoresBox.remove();
                        }
                        changedScoresBox = document.createElement("div");
                        changedScoresBox.classList.add('panel', 'mb-3');
                        const boxTitle = document.createElement('div');
                        boxTitle.classList.add('table-title', 'p-2', 'mb-0', 'text-white', 'title');
                        boxTitle.innerHTML = "Hypothetical Changes";
                        changedScoresBox.appendChild(boxTitle);

                        let groupedChanges = {};
                        for (const [assessmentName, score] of Object.entries(changedScores)) {
                          if (score.to === null || score.from === score.to) continue;
                          const groupName = assessmentName.split('-')[0];
                          if (!groupedChanges[groupName]) {
                            groupedChanges[groupName] = [];
                          }
                          groupedChanges[groupName].push({ assessmentName, score });
                        }

                        for (const score of createdScores) {
                          const groupName = score.standard;
                          if (!groupedChanges[groupName]) {
                            groupedChanges[groupName] = [];
                          }
                          groupedChanges[groupName].push({
                            assessmentName: `created/${score.id}`,
                            score: {
                              displayName: score.name,
                              from: null,
                              to: score.score
                            }
                          });
                        }

                        for (const [groupName, changes] of Object.entries(groupedChanges)) {
                          const changedScoreBox = document.createElement("div");
                          changedScoreBox.classList.add('assessment-container');
                          const attributes = document.querySelector("#recent-score-container > div:nth-child(2) > div.assessment-container").attributes;
                          for (const attr of attributes) {
                            changedScoreBox.setAttribute(attr.name, attr.value);
                          }
                          const assessName = document.createElement("div");
                          assessName.classList.add("assess-name");
                          const nameAttributes = document.querySelector('#recent-score-container > div:nth-child(2) > div.assessment-container > div.assess-name').attributes;
                          for (const attr of nameAttributes) {
                            assessName.setAttribute(attr.name, attr.value);
                          }
                          assessName.innerHTML = groupName;
                          changedScoreBox.appendChild(assessName);
                          changedScoresBox.appendChild(changedScoreBox);

                          for (const change of changes) {
                            const scoreContainer = document.createElement("div");
                            scoreContainer.setAttribute('_ngcontent-nbx-c179', '');
                            scoreContainer.classList.add("score-container");
                            const scoreName = document.createElement("div");
                            const nameAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div").attributes;
                            for (const attr of nameAttributes) {
                              scoreName.setAttribute(attr.name, attr.value);
                            }
                            scoreName.classList.add("score-name");

                            const scoreNameSpan = document.createElement("span");
                            scoreNameSpan.innerHTML = `<strong>${change.assessmentName.startsWith('created') ? "Created" : "Changed"}:</strong> ${change.score.displayName}`;

                            const resetButton = document.createElement("button");
                            resetButton.classList.add("btn", "btn-tertiary", "btn-sm");
                            resetButton.style.marginLeft = "10px";
                            resetButton.textContent = "Reset";
                            resetButton.addEventListener("click", () => {
                              // Get all scores for this LO, including both created and changed scores
                              const loName = change.assessmentName.startsWith('created') ?
                                createdScores.find(score => score.id === change.assessmentName.split('/')[1]).standard :
                                change.assessmentName.split('-')[0];

                              // Remove the score from either createdScores or changedScores
                              if (change.assessmentName.startsWith('created')) {
                                createdScores = createdScores.filter((score) => score.id !== change.assessmentName.split('/')[1]);

                                // Remove the score element from the DOM
                                const scoreElement = document.querySelector(`[data-score-id="${change.assessmentName.split('/')[1]}"]`);
                                if (scoreElement) {
                                  scoreElement.remove();
                                }
                              } else {
                                changedScores[change.assessmentName] = { from: change.score.from, to: null };
                              }

                              const loScores = [
                                ...createdScores
                                  .filter(score => score.standard === loName)
                                  .map(score => score.score),
                                ...Object.entries(changedScores)
                                  .filter(([name]) => name.startsWith(loName))
                                  .map(([_, score]) => score.to || score.from)
                              ];

                              // Calculate new standard score
                              if (loScores.length === 0) {
                                delete newStandardScores[loName];
                              } else if (loScores.length === 1) {
                                newStandardScores[loName] = loScores[0];
                              } else if (loScores.length === 2) {
                                newStandardScores[loName] = (0.6 * loScores[0] + 0.4 * loScores[1]).toFixed(1);
                              } else {
                                const avgOthers = loScores.slice(2).reduce((a, b) => a + b, 0) / loScores.slice(2).length;
                                newStandardScores[loName] = (0.6 * loScores[0] + 0.3 * loScores[1] + 0.1 * avgOthers).toFixed(1);
                              }

                              // Update progress bars
                              const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                              const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                              const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                        const pbarRow = loOrdering.indexOf(loName);
                        const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                        pbars.innerHTML = '';

                        const allLoScores = [
                          ...createdScores.filter((score) => score.standard === loName).map((score) => score.score),
                          ...Object.entries(changedScores).filter(([name]) => name.startsWith(loName)).map(([_, score]) => score.to || score.from)
                        ];

                        while (allLoScores.length > 6) {
                          allLoScores.pop();
                        }

                        while (allLoScores.length < 6) {
                          allLoScores.push(null);
                        }

                        allLoScores.reverse();
                        allLoScores.forEach((score) => {
                          const pbarContainer = document.createElement('score-bar');
                          for (const attr of scoreBarAttributes) {
                            pbarContainer.setAttribute(attr.name, attr.value);
                          }
                          const progressParent = document.createElement('div');
                          for (const attr of progressBarParentAttributes) {
                            progressParent.setAttribute(attr.name, attr.value);
                          }
                          if (score !== null) {
                            const progressBar = document.createElement('div');
                            for (const attr of progressBarAttributes) {
                              progressBar.setAttribute(attr.name, attr.value);
                            }
                            progressBar.style.height = `${score * 10}%`;
                            progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                            progressParent.appendChild(progressBar);
                          } else {
                            progressParent.style.border = 'none';
                          }
                          pbarContainer.appendChild(progressParent);
                          pbars.appendChild(pbarContainer);
                        });

                        // Update score display
                        document.querySelectorAll(".scorehover").forEach((score, index) => {
                          const lo = loOrdering[index];
                          if (newStandardScores[lo] !== undefined) {
                            score.childNodes[0].textContent = newStandardScores[lo];
                            if (newStandardScores[lo] >= 9) {
                              score.style.backgroundColor = "rgb(49, 154, 66)";
                            } else if (newStandardScores[lo] >= 7) {
                              score.style.backgroundColor = "rgb(255, 207, 57)";
                            } else if (newStandardScores[lo] >= 5) {
                              score.style.backgroundColor = "rgb(239, 29, 23)";
                            } else {
                              score.style.backgroundColor = "#000000";
                            }
                          }
                        });

                        // Update LO bar
                        const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(loName) + 1}) > td:nth-child(3) > div > div`);
                        if (newStandardScores[loName]) {
                          loBar.style.width = newStandardScores[loName] * 10 + "%";
                          loBar.style.backgroundColor = newStandardScores[loName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[loName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[loName] >= 5 ? "rgb(239, 29, 23)" : "#000000";
                        } else {
                          loBar.style.width = "0%";
                        }

                        // Clean up UI
                        changedScoresBox.removeChild(scoreContainer);

                        const children = Array.from(changedScoresBox.children);
                        for (let i = 0; i < children.length; i++) {
                          const child = children[i];
                          if (child.classList.contains('assessment-container')) {
                            let hasScores = false;
                            for (let j = i + 1; j < children.length; j++) {
                              if (children[j].classList.contains('assessment-container')) break;
                              if (children[j].classList.contains('score-container')) {
                                hasScores = true;
                                break;
                              }
                            }
                            if (!hasScores) changedScoresBox.removeChild(child);
                          }
                        }

                        // Remove changes panel if empty
                        const hasChanges = Object.values(changedScores).some(score => score.to !== null && score.from !== score.to) ||
                          createdScores.length > 0;
                        if (!hasChanges) {
                          changedScoresBox.remove();
                        }
                      });

                      scoreNameSpan.appendChild(resetButton);
                      scoreName.appendChild(scoreNameSpan);
                      scoreContainer.appendChild(scoreName);

                      const scoreBox = document.createElement("div");
                      scoreBox.classList.add("score-box");
                      const scoreBoxAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > app-score > div > div").attributes;
                      for (const attr of scoreBoxAttributes) {
                        scoreBox.setAttribute(attr.name, attr.value);
                      }

                      if (change.assessmentName.startsWith('created')) {
                        scoreBox.innerHTML = change.score.to;
                      } else {
                        scoreBox.innerHTML = `${change.score.from} -> ${change.score.to}`;
                      }
                      if (change.score.to >= 9) {
                        scoreBox.style.backgroundColor = "rgb(49, 154, 66)";
                      } else if (change.score.to >= 7) {
                        scoreBox.style.backgroundColor = "rgb(255, 207, 57)";
                      } else if (change.score.to >= 5) {
                        scoreBox.style.backgroundColor = "rgb(239, 29, 23)";
                      } else {
                        scoreBox.style.backgroundColor = "#000000";
                      }
                      scoreName.appendChild(scoreBox);
                      changedScoresBox.appendChild(scoreContainer);
                    }
                  }

                  const boxParent = document.querySelector("#body-wrapper > app-student > div > div > app-student-section > div.row > div:nth-child(2)");
                  boxParent.prepend(changedScoresBox);
                }
              });

              scoreText.dispatchEvent(new Event("blur"));

              const nameElement = document.createElement("div");
              const nameText = document.createElement("p");
              const nameAttributes = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(2) > div.standard-container")?.attributes || ['_ngcontent-xrr-c160', '_ngcontent-xrr-c161'];
              for (const attr of nameAttributes) {
                nameElement.setAttribute(attr.name, attr.value);
                nameText.setAttribute(attr.name, attr.value);
              }
              nameText.classList.add('assess-info');
              nameText.textContent = name;
              scoreContainer.appendChild(nameElement);
              scoreContainer.appendChild(nameText);

              document.querySelector("assessment-scores").prepend(scoreContainer);
            });
            document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.heading").appendChild(createAssessmentButton);

            const standardScore = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.heading > div > div");
            const allScores = [
              ...createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).map((score) => score.score),
              ...Array.from(scoreBox.querySelectorAll("div.score")).filter((_, index) => index % 2 === 0).map((score, index) => {
                const assessmentName = `${document.getElementById('standard-name').textContent}-${index + 1}`;
                if (changedScores[assessmentName] && changedScores[assessmentName].to !== null) {
                  return changedScores[assessmentName].to;
                } else {
                  return parseInt(score.textContent);
                }
              })
            ]

            if (allScores.length === 1) {
              standardScore.textContent = allScores[0];
            } else if (allScores.length === 2) {
              standardScore.textContent = (0.6 * allScores[0] + 0.4 * allScores[1]).toFixed(1);
            } else {
              const avgAllOthers = allScores.slice(2).reduce((a, b) => a + b, 0) / allScores.slice(2).length;
              standardScore.textContent = (0.6 * allScores[0] + 0.3 * allScores[1] + 0.1 * avgAllOthers).toFixed(1);
            }

            if (standardScore.textContent >= 9) {
              standardScore.style.backgroundColor = "rgb(49, 154, 66)";
            } else if (standardScore.textContent >= 7) {
              standardScore.style.backgroundColor = "rgb(255, 207, 57)";
            } else if (standardScore.textContent >= 5) {
              standardScore.style.backgroundColor = "rgb(239, 29, 23)";
            } else {
              standardScore.style.backgroundColor = "#000000";
            }

            scoreBox.querySelectorAll("div.score").forEach((score, index) => {
              if (index !== 0 && Number.isInteger(((index - 1) / 2) + 1)) {
                const assessmentName = `${document.getElementById('standard-name').textContent}-${((index - 1) / 2) + 1 + createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).length}`;
                if (!changedScores[assessmentName]) {
                  changedScores[assessmentName] = { from: parseInt(score.textContent), to: null };
                } else {
                  if (changedScores[assessmentName].to !== null) {
                    score.textContent = changedScores[assessmentName].to;
                    score.style.backgroundColor = changedScores[assessmentName].to >= 9 ? "rgb(49, 154, 66)" : changedScores[assessmentName].to >= 7 ? "rgb(255, 207, 57)" : changedScores[assessmentName].to >= 5 ? "rgb(239, 29, 23)" : "#000000";
                  }

                  const standardContainer = document.querySelector(`body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(${((index - 1) / 2) + 1 + createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).length}) > div.standard-container`);
                  if (changedScores[assessmentName].from !== changedScores[assessmentName].to && changedScores[assessmentName].to !== null) {
                    const modifiedText = document.createElement("div");
                    modifiedText.setAttribute('data-modified-text', true);
                    modifiedText.textContent = `Modified from ${changedScores[assessmentName].from} to ${changedScores[assessmentName].to}`;
                    modifiedText.style.color = "orange";
                    standardContainer.appendChild(modifiedText);
                  }
                }

                score.contentEditable = true;
                score.addEventListener("input", () => {
                  const displayName = document.querySelector(`body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(${((index - 1) / 2) + 1 + createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).length}) > div.standard-container > p`).textContent;
                  changedScores[assessmentName] = { ...changedScores[assessmentName], to: parseInt(score.textContent) !== changedScores[assessmentName].from ? parseInt(score.textContent) : null, displayName };

                  if (parseInt(score.textContent) > 10) {
                    score.style.backgroundColor = "#000000";
                  } else if (parseInt(score.textContent) >= 9) {
                    score.style.backgroundColor = "rgb(49, 154, 66)";
                  } else if (parseInt(score.textContent) >= 7) {
                    score.style.backgroundColor = "rgb(255, 207, 57)";
                  } else if (parseInt(score.textContent) >= 5) {
                    score.style.backgroundColor = "rgb(239, 29, 23)";
                  } else {
                    score.style.backgroundColor = "#000000";
                  }
                });

                score.addEventListener("blur", () => {
                  if (parseInt(score.textContent) < 5) {
                    score.textContent = "5";
                    score.style.backgroundColor = "rgb(239, 29, 23)";
                  } else if (parseInt(score.textContent) > 10) {
                    score.textContent = "10";
                    score.style.backgroundColor = "rgb(49, 154, 66)";
                  }

                  const displayName = document.querySelector(`body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(${((index - 1) / 2) + 1 + createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).length}) > div.standard-container > p`).textContent;
                  changedScores[assessmentName] = { ...changedScores[assessmentName], to: parseInt(score.textContent), displayName };

                  const standardContainer = document.querySelector(`body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.body > assessment-scores > div:nth-child(${((index - 1) / 2) + 1 + createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).length}) > div.standard-container`);
                  if (standardContainer) {
                    const existingModifiedText = standardContainer.querySelector('div[data-modified-text]');
                    if (changedScores[assessmentName].from === changedScores[assessmentName].to || changedScores[assessmentName].to === null) {
                      if (existingModifiedText) {
                        existingModifiedText.remove();
                      }
                    } else {
                      const modifiedText = existingModifiedText || document.createElement("div");
                      modifiedText.textContent = `Modified from ${changedScores[assessmentName].from} to ${changedScores[assessmentName].to}`;
                      modifiedText.style.color = "orange";
                      modifiedText.dataset.modifiedText = true;
                      if (!existingModifiedText && changedScores[assessmentName].to !== null) {
                        standardContainer.appendChild(modifiedText);
                      }
                    }
                  }

                  const standardScore = document.querySelector("body > modal-container > div > div > standard-info > app-modal > div > modal-body > div > div.heading > div > div");
                  const allScores = [
                    ...createdScores.filter((score) => score.standard === document.getElementById('standard-name').textContent).map((score) => score.score),
                    ...Array.from(scoreBox.querySelectorAll("div.score")).filter((_, index) => index % 2 === 0).map((score, index) => {
                      const assessmentName = `${document.getElementById('standard-name').textContent}-${index + 1}`;
                      if (changedScores[assessmentName] && changedScores[assessmentName].to !== null) {
                        return changedScores[assessmentName].to;
                      } else {
                        return parseInt(score.textContent);
                      }
                    })
                  ]

                  if (allScores.length === 1) {
                    standardScore.textContent = allScores[0];
                  } else if (allScores.length === 2) {
                    standardScore.textContent = (0.6 * allScores[0] + 0.4 * allScores[1]).toFixed(1);
                  } else {
                    const avgAllOthers = allScores.slice(2).reduce((a, b) => a + b, 0) / allScores.slice(2).length;
                    standardScore.textContent = (0.6 * allScores[0] + 0.3 * allScores[1] + 0.1 * avgAllOthers).toFixed(1);
                  }

                  if (standardScore.textContent >= 9) {
                    standardScore.style.backgroundColor = "rgb(49, 154, 66)";
                  } else if (standardScore.textContent >= 7) {
                    standardScore.style.backgroundColor = "rgb(255, 207, 57)";
                  } else if (standardScore.textContent >= 5) {
                    standardScore.style.backgroundColor = "rgb(239, 29, 23)";
                  } else {
                    standardScore.style.backgroundColor = "#000000";
                  }

                  newStandardScores[assessmentName.split('-')[0]] = standardScore.textContent;

                  // Update score display
                  document.querySelectorAll(".scorehover").forEach((score, index) => {
                    const lo = loOrdering[index];
                    if (newStandardScores[lo] !== undefined) {
                      score.childNodes[0].textContent = newStandardScores[lo];
                      if (newStandardScores[lo] >= 9) {
                        score.style.backgroundColor = "rgb(49, 154, 66)";
                      } else if (newStandardScores[lo] >= 7) {
                        score.style.backgroundColor = "rgb(255, 207, 57)";
                      } else if (newStandardScores[lo] >= 5) {
                        score.style.backgroundColor = "rgb(239, 29, 23)";
                      } else {
                        score.style.backgroundColor = "#000000";
                      }
                    }
                  });

                  // Update progress bars
                  const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                  const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                  const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                  const loName = assessmentName.split('-')[0];
                              const pbarRow = loOrdering.indexOf(loName);
                              const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                              pbars.innerHTML = '';

                              const allLoScores = [
                                ...createdScores.filter((score) => score.standard === loName).map((score) => score.score),
                                ...Object.entries(changedScores).filter(([name]) => name.startsWith(loName)).map(([_, score]) => score.to || score.from)
                              ];

                              while (allLoScores.length > 6) {
                                allLoScores.pop();
                              }

                              while (allLoScores.length < 6) {
                                allLoScores.push(null);
                              }

                              allLoScores.reverse();
                              allLoScores.forEach((score) => {
                                const pbarContainer = document.createElement('score-bar');
                                for (const attr of scoreBarAttributes) {
                                  pbarContainer.setAttribute(attr.name, attr.value);
                                }
                                const progressParent = document.createElement('div');
                                for (const attr of progressBarParentAttributes) {
                                  progressParent.setAttribute(attr.name, attr.value);
                                }
                                if (score !== null) {
                                  const progressBar = document.createElement('div');
                                  for (const attr of progressBarAttributes) {
                                    progressBar.setAttribute(attr.name, attr.value);
                                  }
                                  progressBar.style.height = `${score * 10}%`;
                                  progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                                  progressParent.appendChild(progressBar);
                                } else {
                                  progressParent.style.border = 'none';
                                }
                                pbarContainer.appendChild(progressParent);
                                pbars.appendChild(pbarContainer);
                              });

                              // Update score display
                              document.querySelectorAll(".scorehover").forEach((score, index) => {
                                const lo = loOrdering[index];
                                if (newStandardScores[lo] !== undefined) {
                                  score.childNodes[0].textContent = newStandardScores[lo];
                                  if (newStandardScores[lo] >= 9) {
                                    score.style.backgroundColor = "rgb(49, 154, 66)";
                                  } else if (newStandardScores[lo] >= 7) {
                                    score.style.backgroundColor = "rgb(255, 207, 57)";
                                  } else if (newStandardScores[lo] >= 5) {
                                    score.style.backgroundColor = "rgb(239, 29, 23)";
                                  } else {
                                    score.style.backgroundColor = "#000000";
                                  }
                                }
                              });

                              // Update LO bar
                              const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(loName) + 1}) > td:nth-child(3) > div > div`);
                              if (newStandardScores[loName]) {
                                loBar.style.width = newStandardScores[loName] * 10 + "%";
                                loBar.style.backgroundColor = newStandardScores[loName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[loName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[loName] >= 5 ? "rgb(239, 29, 23)" : "#000000";
                              } else {
                                loBar.style.width = "0%";
                              }

                              const changedScoresArray = Object.values(changedScores).filter(score => score.to !== null);
                              if (changedScoresArray.length > 0) {
                                if (changedScoresBox) {
                                  changedScoresBox.remove();
                                }
                                changedScoresBox = document.createElement("div");
                                changedScoresBox.classList.add('panel', 'mb-3');
                                const boxTitle = document.createElement('div');
                                boxTitle.classList.add('table-title', 'p-2', 'mb-0', 'text-white', 'title');
                                boxTitle.innerHTML = "Hypothetical Changes";
                                changedScoresBox.appendChild(boxTitle);

                                let groupedChanges = {};
                                for (const [assessmentName, score] of Object.entries(changedScores)) {
                                  if (score.to === null || score.from === score.to) continue;
                                  const groupName = assessmentName.split('-')[0];
                                  if (!groupedChanges[groupName]) {
                                    groupedChanges[groupName] = [];
                                  }
                                  groupedChanges[groupName].push({ assessmentName, score });
                                }

                                for (const score of createdScores) {
                                  const groupName = score.standard;
                                  if (!groupedChanges[groupName]) {
                                    groupedChanges[groupName] = [];
                                  }
                                  groupedChanges[groupName].push({
                                    assessmentName: `created/${score.id}`,
                                    score: {
                                      displayName: score.name,
                                      from: null,
                                      to: score.score
                                    }
                                  });
                                }

                                for (const [groupName, changes] of Object.entries(groupedChanges)) {
                                  const changedScoreBox = document.createElement("div");
                                  changedScoreBox.classList.add('assessment-container');
                                  const attributes = document.querySelector("#recent-score-container > div:nth-child(2) > div.assessment-container").attributes;
                                  for (const attr of attributes) {
                                    changedScoreBox.setAttribute(attr.name, attr.value);
                                  }
                                  const assessName = document.createElement("div");
                                  assessName.classList.add("assess-name");
                                  const nameAttributes = document.querySelector('#recent-score-container > div:nth-child(2) > div.assessment-container > div.assess-name').attributes;
                                  for (const attr of nameAttributes) {
                                    assessName.setAttribute(attr.name, attr.value);
                                  }
                                  assessName.innerHTML = groupName;
                                  changedScoreBox.appendChild(assessName);
                                  changedScoresBox.appendChild(changedScoreBox);

                                  for (const change of changes) {
                                    const scoreContainer = document.createElement("div");
                                    scoreContainer.setAttribute('_ngcontent-nbx-c179', '');
                                    scoreContainer.classList.add("score-container");
                                    const scoreName = document.createElement("div");
                                    const nameAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div").attributes;
                                    for (const attr of nameAttributes) {
                                      scoreName.setAttribute(attr.name, attr.value);
                                    }
                                    scoreName.classList.add("score-name");

                                    const scoreNameSpan = document.createElement("span");
                                    scoreNameSpan.innerHTML = `<strong>${change.assessmentName.startsWith('created') ? "Created" : "Changed"}:</strong> ${change.score.displayName}`;

                                    const resetButton = document.createElement("button");
                                    resetButton.classList.add("btn", "btn-tertiary", "btn-sm");
                                    resetButton.style.marginLeft = "10px";
                                    resetButton.textContent = "Reset";
                                    resetButton.addEventListener("click", () => {
                                      // Get all scores for this LO, including both created and changed scores
                                      const loName = change.assessmentName.startsWith('created') ?
                                        createdScores.find(score => score.id === change.assessmentName.split('/')[1]).standard :
                                        change.assessmentName.split('-')[0];

                                      // Remove the score from either createdScores or changedScores
                                      if (change.assessmentName.startsWith('created')) {
                                        createdScores = createdScores.filter((score) => score.id !== change.assessmentName.split('/')[1]);

                                        // Remove the score element from the DOM
                                        const scoreElement = document.querySelector(`[data-score-id="${change.assessmentName.split('/')[1]}"]`);
                                        if (scoreElement) {
                                          scoreElement.remove();
                                        }
                                      } else {
                                        changedScores[change.assessmentName] = { from: change.score.from, to: null };
                                      }

                                      const loScores = [
                                        ...createdScores
                                          .filter(score => score.standard === loName)
                                          .map(score => score.score),
                                        ...Object.entries(changedScores)
                                          .filter(([name]) => name.startsWith(loName))
                                          .map(([_, score]) => score.to || score.from)
                                      ];

                                      // Calculate new standard score
                                      if (loScores.length === 0) {
                                        delete newStandardScores[loName];
                                      } else if (loScores.length === 1) {
                                        newStandardScores[loName] = loScores[0];
                                      } else if (loScores.length === 2) {
                                        newStandardScores[loName] = (0.6 * loScores[0] + 0.4 * loScores[1]).toFixed(1);
                                      } else {
                                        const avgOthers = loScores.slice(2).reduce((a, b) => a + b, 0) / loScores.slice(2).length;
                                        newStandardScores[loName] = (0.6 * loScores[0] + 0.3 * loScores[1] + 0.1 * avgOthers).toFixed(1);
                                      }

                                      // Update progress bars
                                      const scoreBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6)").attributes;
                                      const progressBarParentAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div").attributes;
                                      const progressBarAttributes = document.querySelector("#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > score-bar:nth-child(6) > div > div").attributes;

                                      const pbarRow = loOrdering.indexOf(loName);
                                      const pbars = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${pbarRow + 1}) > td:nth-child(4) > div`);
                                      pbars.innerHTML = '';

                                      const allLoScores = [
                                        ...createdScores.filter((score) => score.standard === loName).map((score) => score.score),
                                        ...Object.entries(changedScores).filter(([name]) => name.startsWith(loName)).map(([_, score]) => score.to || score.from)
                                      ];

                                      while (allLoScores.length > 6) {
                                        allLoScores.pop();
                                      }

                                      while (allLoScores.length < 6) {
                                        allLoScores.push(null);
                                      }

                                      allLoScores.reverse();
                                      allLoScores.forEach((score) => {
                                        const pbarContainer = document.createElement('score-bar');
                                        for (const attr of scoreBarAttributes) {
                                          pbarContainer.setAttribute(attr.name, attr.value);
                                        }
                                        const progressParent = document.createElement('div');
                                        for (const attr of progressBarParentAttributes) {
                                          progressParent.setAttribute(attr.name, attr.value);
                                        }
                                        if (score !== null) {
                                          const progressBar = document.createElement('div');
                                          for (const attr of progressBarAttributes) {
                                            progressBar.setAttribute(attr.name, attr.value);
                                          }
                                          progressBar.style.height = `${score * 10}%`;
                                          progressBar.style.backgroundColor = score >= 9 ? "rgb(49, 154, 66)" : score >= 7 ? "rgb(255, 207, 57)" : score >= 5 ? "rgb(239, 29, 23)" : "#000000";
                                          progressParent.appendChild(progressBar);
                                        } else {
                                          progressParent.style.border = 'none';
                                        }
                                        pbarContainer.appendChild(progressParent);
                                        pbars.appendChild(pbarContainer);
                                      });

                                      // Update score display
                                      document.querySelectorAll(".scorehover").forEach((score, index) => {
                                        const lo = loOrdering[index];
                                        if (newStandardScores[lo] !== undefined) {
                                          score.childNodes[0].textContent = newStandardScores[lo];
                                          if (newStandardScores[lo] >= 9) {
                                            score.style.backgroundColor = "rgb(49, 154, 66)";
                                          } else if (newStandardScores[lo] >= 7) {
                                            score.style.backgroundColor = "rgb(255, 207, 57)";
                                          } else if (newStandardScores[lo] >= 5) {
                                            score.style.backgroundColor = "rgb(239, 29, 23)";
                                          } else {
                                            score.style.backgroundColor = "#000000";
                                          }
                                        }
                                      });

                                      // Update LO bar
                                      const loBar = document.querySelector(`#grade-table-container > div.table-responsive > table > tbody > tr:nth-child(${loOrdering.indexOf(loName) + 1}) > td:nth-child(3) > div > div`);
                                      if (newStandardScores[loName]) {
                                        loBar.style.width = newStandardScores[loName] * 10 + "%";
                                        loBar.style.backgroundColor = newStandardScores[loName] >= 9 ? "rgb(49, 154, 66)" : newStandardScores[loName] >= 7 ? "rgb(255, 207, 57)" : newStandardScores[loName] >= 5 ? "rgb(239, 29, 23)" : "#000000";
                                      } else {
                                        loBar.style.width = "0%";
                                      }

                                      // Clean up UI
                                      changedScoresBox.removeChild(scoreContainer);

                                      const children = Array.from(changedScoresBox.children);
                                      for (let i = 0; i < children.length; i++) {
                                        const child = children[i];
                                        if (child.classList.contains('assessment-container')) {
                                          let hasScores = false;
                                          for (let j = i + 1; j < children.length; j++) {
                                            if (children[j].classList.contains('assessment-container')) break;
                                            if (children[j].classList.contains('score-container')) {
                                              hasScores = true;
                                              break;
                                            }
                                          }
                                          if (!hasScores) changedScoresBox.removeChild(child);
                                        }
                                      }

                                      // Remove changes panel if empty
                                      const hasChanges = Object.values(changedScores).some(score => score.to !== null && score.from !== score.to) ||
                                        createdScores.length > 0;
                                      if (!hasChanges) {
                                        changedScoresBox.remove();
                                      }
                                    });

                                    scoreNameSpan.appendChild(resetButton);
                                    scoreName.appendChild(scoreNameSpan);
                                    scoreContainer.appendChild(scoreName);

                                    const scoreBox = document.createElement("div");
                                    scoreBox.classList.add("score-box");
                                    const scoreBoxAttributes = document.querySelector("#recent-score-container > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > app-score > div > div").attributes;
                                    for (const attr of scoreBoxAttributes) {
                                      scoreBox.setAttribute(attr.name, attr.value);
                                    }

                                    if (change.assessmentName.startsWith('created')) {
                                      scoreBox.innerHTML = change.score.to;
                                    } else {
                                      scoreBox.innerHTML = `${change.score.from} -> ${change.score.to}`;
                                    }
                                    if (change.score.to >= 9) {
                                      scoreBox.style.backgroundColor = "rgb(49, 154, 66)";
                        } else if (change.score.to >= 7) {
                          scoreBox.style.backgroundColor = "rgb(255, 207, 57)";
                        } else if (change.score.to >= 5) {
                          scoreBox.style.backgroundColor = "rgb(239, 29, 23)";
                        } else {
                          scoreBox.style.backgroundColor = "#000000";
                        }
                        scoreName.appendChild(scoreBox);
                        changedScoresBox.appendChild(scoreContainer);
                      }
                    }

                    const boxParent = document.querySelector("#body-wrapper > app-student > div > div > app-student-section > div.row > div:nth-child(2)");
                    boxParent.prepend(changedScoresBox);
                  }

                  // if hypothetical changes box is empty (completely), remove it
                  const hypotheticalChangesBox = document.querySelector("#body-wrapper > app-student > div > div > app-student-section > div.row > div:nth-child(2) > div");
                  if (hypotheticalChangesBox.children.length <= 1) {
                    hypotheticalChangesBox.remove();
                  }
                });
              }
            });
          }, 500);
        });
      });
    });
  } else {
    setTimeout(checkForGradeTable, 1000);
  }
};

checkForGradeTable();