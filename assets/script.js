//buttons
var btnStartEl = document.querySelector("#start-game");

//question-answer elements
var questionEl = document.getElementById("question-container");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var questionTitleEl = document.querySelector("#question");
var starterContainerEl = document.getElementById("starter-container");
var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;


function startQuiz() {
    starterContainerEl.setAttribute("class", "hide");
    questionEl.removeAttribute("class");

    timerId = setInterval(clock, 1000);
    timerEl.textContent = time;
    nextQuestion();
};

// timer countdown
function clock() {
    time--;
    timerEl.textContent = time;

    if (time < 0) {
        endQuiz();
    }
};

// end quiz
function endQuiz() {

};

// next question
function nextQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionTitleEl.textContent = currentQuestion.title;
    answerbuttonsEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i){
        var answerChoice = document.createElement("button");
        answerChoice.setAttribute("class", "choice");
        answerChoice.setAttribute("value", choice);
        answerChoice.textContent = i + 1 + ". " + choice;
        answerChoice.onclick = questionClick;
        answerbuttonsEl.appendChild(answerChoice);
    })
    
};

function questionClick() {
    
};

//display correct/wrong


// display total score on screen at end of game


//high score button

btnStartEl.addEventListener("click", startQuiz);
