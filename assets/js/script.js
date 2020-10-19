const quizItems = [
  { question: "Commonly used data types do NOT include:",
    answers: ["strings","booleans","alerts","numbers"],
    correctAns: 2
  },
  {
    question: "The condition in an if/else is enclosed with ______",
    answers: ["quotes","curly brackets","parenthesis","square brackets"],
    correctAns: 2
  },
  {
    question: "Arrays in JavaScript can be used to store ______",
    answers: ["numbers and strings","other arrays","booleans","all of the above"],
    correctAns: 3
  },
  {
    question: "String value must be enclosed within ______ when being assigned.",
    answers: ["commas","curly brackets","quotes","parenthesis"],
    correctAns: 2
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript","terminal/bash","for loops","console.log"],
    correctAns: 3
  }
];

var score = 75;
var finalScore;
var currentQuestion = 0;
var highScores = [];

var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz-btn");
var questionEl = document.querySelector("#question-wrapper");
var answersEl = document.querySelector("#answers-wrapper");
var correctEl = document.querySelector("#correct");
var highScoresH3 = document.querySelector("#high-scores");
var questionH1 = document.querySelector("#question");
var answerP = document.querySelector("#answer");
var pageContentEl = document.querySelector("#page-content");

var startTimer = function() {

  var timeInterval = setInterval(function() {
    if (score >= 0) {
      timerEl.textContent = "Time: " + score;
      score--;
    } else {
      timerEl.textContent = "Time: 0";
      clearInterval(timeInterval);
    }
  }, 1000);
};

var startQuiz = function () {
  displayQuestion(0);
  startTimer();
};

var displayQuestion = function(index) {

  answerP.style.display = "none";
  startBtn.style.display = "none";

  questionH1.textContent = quizItems[index].question;

  for (var i = 0; i < quizItems[index].answers.length; i++) {
    answerBtn = document.createElement("button");
    answerBtn.textContent = (i + 1) + ". " + quizItems[index].answers[i];
    answerBtn.className = "btn answer-btn";
    answerBtn.setAttribute("data-answer-id", i);
    answersEl.appendChild(answerBtn);
  }

};

var startQuizButtonHandler = function() { 
  startQuiz();
};

var answerButtonHandler = function(event) {
  var targetEl = event.target;

  if ((targetEl.matches(".answer-btn")) && (targetEl.getAttribute("data-answer-id") != quizItems[currentQuestion].correctAns)) {
    score = score - 15;
    currentQuestion++;
    clearAnswers();
    displayCorrectOrWrong("Wrong!");
    console.log("Wrong Answer");
    if (currentQuestion < quizItems.length){
      displayQuestion(currentQuestion);
    } else {
      submitScore();
    }
  }
  else if (targetEl.matches(".answer-btn")) {
    currentQuestion++;
    clearAnswers();
    displayCorrectOrWrong("Correct!");
    console.log("Correct Answer");

    if (currentQuestion < quizItems.length) {
      displayQuestion(currentQuestion);
    } else {
      submitScore();
    }
  }
};

var clearAnswers = function() {
  var oldAnswers = document.querySelectorAll(".answer-btn");
  for (var i = 0; i < oldAnswers.length; i++) {
    oldAnswers[i].remove();
  }
};

var displayCorrectOrWrong = function(correctOrWrong) {
  var element = document.getElementById("correct-or-wrong");

  if (typeof(element) != "undefined" && element != null) {
    element.textContent = correctOrWrong;
  } else {

    correctOrWrongH2 = document.createElement("h2");
    correctOrWrongH2.textContent = correctOrWrong;
    correctOrWrongH2.id = "correct-or-wrong";
    correctOrWrongH2.style.borderTop = "2px solid gray"
    correctEl.appendChild(correctOrWrongH2);
  }
};

var submitScore = function() {
  questionH1.textContent="All done!";

  if (score < 0){
    score = 0;
  }
  finalScore = score;

  answerP.textContent = "Your final score is " + finalScore + ".";
  timerEl.remove();

  answerP.style.display = "block";

  submitScoreForm = document.createElement("form");
  submitScoreForm.id = "score-form";
  submitScoreLbl = document.createElement("label");
  submitScoreLbl.setAttribute("for","initials");
  submitScoreLbl.textContent = "Enter initials: ";
  submitScoreInput = document.createElement("input");
  submitScoreInput.setAttribute("type","text");
  submitScoreInput.id = "initials";
  submitScoreBtn = document.createElement("button");
  submitScoreBtn.className = "btn scoreBtn";
  submitScoreBtn.textContent = "Submit";
  submitScoreBtn.style.margin = "0 10px 0 10px";

  submitScoreForm.appendChild(submitScoreLbl);
  submitScoreForm.appendChild(submitScoreInput);
  submitScoreForm.appendChild(submitScoreBtn);

  answersEl.appendChild(submitScoreForm);

};

var submitButtonHandler = function(event) {
  var targetEl = event.target;
  if (finalScore< 0) {
    finalScore = 0;
  }
  if (targetEl.matches(".scoreBtn")){
    saveHighScores();
    showHighScores();
  }
};

var showHighScores = function () {
  questionH1.textContent = "High scores";
  formToRemove = document.querySelector("#score-form");
  if (formToRemove){ 
    formToRemove.remove();
  }
  rightOrWrong = document.querySelector("#correct-or-wrong");

  if (rightOrWrong){
    rightOrWrong.remove();
  }

  startQuizButton = document.querySelector("#start-quiz-btn");

  if (startQuizButton){
    startQuizButton.remove();
  }
  

  answerP.remove();
  orderedList = document.createElement("OL");

  
  for (var i = 0; i < highScores.length; i++) {
    var listItem = document.createElement("LI");
    listItem.textContent = highScores[i].name + " - " + highScores[i].score;
    orderedList.appendChild(listItem);
  }

  answersEl.appendChild(orderedList);
  answersEl.style.backgroundColor = "mediumorchid"

  goBackBtn = document.createElement("button");
  goBackBtn.textContent = "Go back";
  goBackBtn.id = "go-back";
  goBackBtn.className = "btn";

  clearScoresBtn = document.createElement("button");
  clearScoresBtn.textContent = "Clear High Scores";
  clearScoresBtn.id = "clear-scores";
  clearScoresBtn.className = "btn";

  correctEl.appendChild(goBackBtn);
  correctEl.appendChild(clearScoresBtn);




};

var saveHighScores = function(){
  initials = document.querySelector("#initials").value;
  highScores.push({ name: initials, score: finalScore });
  sortHighScores();
  localStorage.setItem("high-scores", JSON.stringify(highScores));
};

var loadHighScores = function () {
  highScores = localStorage.getItem("high-scores");
  if (highScores === null) {
    highScores = [];
    return false;
  }

  highScores = JSON.parse(highScores);
  sortHighScores();

};

var sortHighScores = function () {
  highScores.sort(function (a, b) { return b.score - a.score });

  console.log(highScores);
};

var showHighScoresHandler = function (){
  showHighScores();
};

var scoreButtonHandler = function (event){
  var targetEl = event.target;

  if (targetEl.matches("#go-back")){
    location.reload();
  } 
  else if (targetEl.matches("#clear-scores")) {
    localStorage.clear();
    window.alert("High Scores Cleared!");
    location.reload();
  }
}

loadHighScores();

startBtn.addEventListener("click", startQuizButtonHandler);
pageContentEl.addEventListener("click", answerButtonHandler);
answersEl.addEventListener("click", submitButtonHandler);
highScoresH3.addEventListener("click", showHighScoresHandler);
correctEl.addEventListener("click", scoreButtonHandler);

