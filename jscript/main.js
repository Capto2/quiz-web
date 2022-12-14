//refers from html page. route game.html
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {}
let questionCounter = 0;
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

let questions = [
    {
        "question": "Inside which HTML element do we put the JavaScript??",
        "choice1": "<script>",
        "choice2": "<javascript>",
        "choice3": "<jsx>",
        "choice4": "<scripting>",
        "answer": 1
      },
      {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "choice1": "<script href='xxx.js'>",
        "choice2": "<script name='xxx.js'>",
        "choice3": "<script src='xxx.js'>",
        "choice4": "<script file='xxx.js'>",
        "answer": 3
      },
      {
        "question": " How do you write 'Hello World' in an alert box?",
        "choice1": "msgBox('Hello World');",
        "choice2": "alertBox('Hello World');",
        "choice3": "msg('Hello World');",
        "choice4": "alert('Hello World');",
        "answer": 4
      },
      {
        "question": "Inside which HTML element do we put the CSS??",
        "choice1": "<script>",
        "choice2": "<style>",
        "choice3": "<Style>",
        "choice4": "<scripting>",
        "answer": 2
      }, 
]

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

function startGame (){
    questionCounter = 0;
    score = 0;
    availableQuestions =[... questions];
    console.log(availableQuestions);
    getNewQuestion();
}
function getNewQuestion(){
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
       localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter+=1;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`
    //Update the progress bar
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(function(choice){
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}
choices.forEach(function(choice){
    choice.addEventListener("click", function(e){
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply == 'correct'){
            increamentScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function(){
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

function increamentScore(numb){
    score += numb;
    scoreText.innerText = score;
}

startGame();

