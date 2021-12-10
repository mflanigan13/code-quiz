//buttons
var btnStartEl = document.querySelector("#start-game");

//question-answer elements
var questionEl = document.getElementById("question-container");
var endContainerEl = document.getElementById("end-container");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var questionTitleEl = document.querySelector("#question");
var starterContainerEl = document.getElementById("starter-container");
var answerCorrectEl = document.getElementById("correct");
var answerWrongEl = document.getElementById("wrong");
var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;
var totalScore = 0;

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

    if (time < 1) {
        endQuiz();
    }
};

// end quiz
function endQuiz() {
    console.log("it works");
    questionEl.setAttribute("class", "hide");
    answerCorrectEl.setAttribute("class", "hide");
    answerWrongEl.setAttribute("class", "hide");
    endContainerEl.removeAttribute("class");
};

// next question
function nextQuestion() {
    if (time > 0 && currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionTitleEl.textContent = currentQuestion.title;
        answerbuttonsEl.innerHTML = "";

        currentQuestion.choices.forEach(function (choice, i){
            var answerChoice = document.createElement("button");
            answerChoice.setAttribute("class", "choice");
            answerChoice.setAttribute("value", choice);
            answerChoice.textContent = i + 1 + ". " + choice;
            answerChoice.setAttribute("onclick", "questionClick(\""+choice+"\")");
            answerbuttonsEl.appendChild(answerChoice);
        })
    } else {
        endQuiz();
    }

};

function questionClick(c){
    var cq = questions[currentQuestionIndex].correct;
    if(cq === c){
        answerWrongEl.setAttribute("class", "hide");
        answerCorrectEl.removeAttribute("class");
        totalScore+=20;
    } else {
        answerCorrectEl.setAttribute("class", "hide");
        answerWrongEl.removeAttribute("class");
        time-=10;
    };
    
    currentQuestionIndex++;
    nextQuestion();


};



// display total score on screen at end of game


//high score button

btnStartEl.addEventListener("click", startQuiz);
