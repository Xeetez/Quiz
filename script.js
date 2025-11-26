import { quizQuestions } from "./data.js";

const startScreen = document.getElementById("start-screen");
const startQuizBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionsArea = document.getElementById("question");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answerContainer = document.getElementById("answers");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessageDiv = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

// Initialize the variables
let index = 0;
let score = 0;
let disableAnswer = false;

/* This the the start quiz button
 upon clicking this, the starting screen will be hidden and the questionnare quiz scree will be active and shown on the screen */

startQuiz();
function startQuiz() {
  startQuizBtn.addEventListener("click", () => {
    startScreen.classList.remove("active");

    // We show the first question grabbing from the data. but we dneed to do it one by one.
    showQuestions();
  });
}

function showQuestions() {
  disableAnswer = false;
  quizScreen.classList.add("active");

  totalQuestionSpan.innerHTML = quizQuestions.length;
  scoreSpan.innerHTML = score;

  if (index >= quizQuestions.length) {
    restartQuiz();
  } else {
    let currentQuestion = quizQuestions[index];
    questionsArea.innerText = currentQuestion.question;

    currentQuestionSpan.innerHTML = index + 1;

    showOptions(currentQuestion);
  }
  let progress = index / quizQuestions.length;
  progressBar.style.width = progress * 100 + "%";
}

function restartQuiz() {
  document.getElementsByClassName("restart-screen")[0].classList.add("active");
  quizScreen.classList.remove("active");

  const percent = (score / quizQuestions.length) * 100;
  document.getElementById("final-score").innerText = percent + '%';
  document.getElementById("restart-btn-2").addEventListener("click", () => {
    document
      .getElementsByClassName("restart-screen")[0]
      .classList.remove("active");
    startScreen.classList.remove("active");
    // show start screen
    showQuestions();
  });
  // reset variables
  index = 0;
  score = 0;
  disableAnswer = false;
  // hide restart screen
}

function showOptions(currentQuestion) {
  // no we need to display answers. We will show them as list items. But in a container we have not created any ul and li items. we will be creating it via js. Also note that there are four options to choose from so we need to use map.
  // the data is on following format.
  // {id: 1, question: 'What is the capital city of Australia?', options: Array(4), answer: 'Canberra'}
  // we are creating the ul item first
  answerContainer.innerHTML = "";

  let createUl = document.createElement("ul");
  // appending the ul element in the answer container
  answerContainer.appendChild(createUl);
  let currentAnswers = currentQuestion.options;
  const correctAnswer = currentQuestion.answer;

  // for each answers available we will be showing in list itmes
  if (currentAnswers) {
    currentAnswers.map((answer) => {
      let createLi = document.createElement("li");
      createLi.setAttribute("class", "list-answers");
      createLi.textContent = answer;

      //Now we add the created list item to ul
      createUl.appendChild(createLi);
    });
    checkAnswer(correctAnswer);
  }

  //checking answers when user select the answer
  function checkAnswer(answer) {
    const answerOfList = document.getElementsByClassName("list-answers");
    Array.from(answerOfList).forEach((el) => {
      el.addEventListener("click", (e) => {
        if (!disableAnswer) {
          disableAnswer = true;
          if (e.target.innerText === answer) {
            e.target.style.backgroundColor = "blue";
            score++;
            console.log(e.target.innerText);
          } else {
            e.target.style.backgroundColor = "red";
          }

          // after 1 second we need to show the next question
          setTimeout(() => {
            index++;
            showQuestions();
          }, 1000);
        }
      });
    });
  }
}
