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
    questions: "String value must be enclosed within ______ when being assigned.",
    answers: ["commas","curly brackets","quotes","parenthesis"],
    correctAns: 2
  },
  {
    questions: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript","terminal/bash","for loops","console.log"],
    correctAns: 3
  }
];

var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz-btn");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var correctEl = document.querySelector("#correct");

var startTimer = function() {
  var timeLeft = 75;

  var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      clearInterval(timeInterval);
    }
  }, 1000);
};

var startQuiz = function () {
  questionEl.textContent = "test";
  startTimer;
};

var startQuizButtonHandler = function() { 
  startQuiz();
};  


startBtn.addEventListener("click", startQuizButtonHandler);
