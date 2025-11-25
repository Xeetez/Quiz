import { quizQuestions } from "./data.js";

const startScreen = document.getElementById("start-screen");
const startQuizBtn = document.getElementById("start-btn");
const quizScreen= document.getElementById("quiz-screen");
const questionsArea= document.getElementById("question");
const currentQuestionSpan= document.getElementById("current-question");
const totalQuestionSpan= document.getElementById("total-question");
const scoreSpan= document.getElementById("score");
const answerContainer= document.getElementById("answers");
const progressBar= document.getElementById("progress");
const resultScreen= document.getElementById("result-screen");
const finalScoreSpan= document.getElementById("final-score");
const maxScoreSpan= document.getElementById("max-score");
const resultMessageDiv= document.getElementById("result-message");
const restartBtn = document.getElementById('restart-btn');

// Initialize the variables
let questionIndex = 0;
let score = 0;
let disableAnswer = false;


/* This the the start quiz button
 upon clicking this, the starting screen will be hidden and the questionnare quiz scree will be active and shown on the screen */

startQuiz();
function startQuiz(){
questionIndex = 0;
score = 0;

startQuizBtn.addEventListener('click', () => {
  startScreen.classList.remove('active');
  

  // We show the first question grabbing from the data. but we dneed to do it one by one.
  showQuestions();
  }
)
}


function showQuestions(){

  quizScreen.classList.add('active');
  let currentQuestion = quizQuestions[questionIndex];
 
  questionsArea.innerText = currentQuestion.question;
  currentQuestionSpan.innerHTML = questionIndex + 1;
  scoreSpan.innerHTML = score;
  let progress = (questionIndex +1 )/quizQuestions.length ;
  progressBar.style.width = (progress* 100)+ '%'
  showOptions(currentQuestion);

}


function showOptions(currentQuestion){
 // no we need to display answers. We will show them as list items. But in a container we have not created any ul and li items. we will be creating it via js. Also note that there are four options to choose from so we need to use map.
  // the data is on following format.
  // {id: 1, question: 'What is the capital city of Australia?', options: Array(4), answer: 'Canberra'}
  // we are creating the ul item first
  answerContainer.innerHTML= ''

  let createUl = document.createElement('ul');
  // appending the ul element in the answer container
  answerContainer.appendChild(createUl);  
  let currentAnswers = currentQuestion.options;
  const correctAnswer = currentQuestion.answer;


  // for each answers available we will be showing in list itmes
  if(currentAnswers){
    currentAnswers.map(answer =>{
    
     let createLi = document.createElement('li');
    createLi.setAttribute('id','answers');
    createLi.textContent = answer;

    //Now we add the created list item to ul
    createUl.appendChild(createLi);
  })
  }
  
  

  checkAnswer(correctAnswer);
}


//checking answers when user select the answer 
function checkAnswer(answer){

  document.getElementById('answers').addEventListener('click', (e) => {
     setTimeout(showQuestions, 900);
        questionIndex++; 

    if(e.target.innerText === answer){
      e.target.style.backgroundColor = 'blue'
        score++; 
        console.log(questionIndex)
      }else{
        e.target.style.backgroundColor = 'red';
        console.log(questionIndex)

        }
  })
  }


 
