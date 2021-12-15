//buttons
var submitScoreBtn = document.getElementById("submit-score");
var btnStartEl = document.getElementById("start-game");
var clearBtn = document.getElementById("clear-button");
var backBtn = document.getElementById("back-button");

//question-answer elements
var questionEl = document.getElementById("question-container");
var endContainerEl = document.getElementById("end-container");
var highScoreContainerEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.querySelector(".view-high-scores");
var showScoreEl = document.getElementById("show-score");
var scoreArray = [];
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

// this function starts the quiz
function startQuiz() {
    time = questions.length * 15;

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

    if (time < 1 ) {
        return;
    }
};

// end quiz
function endQuiz() {
    clearInterval(timerId);  
    timerEl.setAttribute("class", "hide");       
    questionEl.setAttribute("class", "hide");
    answerCorrectEl.setAttribute("class", "hide");
    answerWrongEl.setAttribute("class", "hide");
    endContainerEl.removeAttribute("class");
    showScoreEl.innerHTML = "Score:" + totalScore;
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

// when a question is clicked check if correct
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

// Initials form
function formSubmit(){
    var formInfoEl = document.getElementById('initials').value;

    var entry = {
        "initials": formInfoEl,
        "score": totalScore,
    };
    localStorage.setItem(localStorage.length, JSON.stringify(entry));

    displayHighScore();
};

// High Score at the end of game and store in local storage
function displayHighScore(){
    event.preventDefault();
    console.log("it works");
    highScoreContainerEl.removeAttribute("class");
    endContainerEl.setAttribute("class", "hide");
    starterContainerEl.setAttribute("class", "hide");
    questionEl.setAttribute("class", "hide");
    timerEl.setAttribute("class", "hide");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const entry = localStorage.getItem(key);
        scoreArray.push(JSON.parse(entry));
    }

    scoreArray?.sort((entry1, entry2) => (entry1.score < entry2.score ? 1 : -1))
    
    var table = document.getElementById("scores-table");
    for (let j =1; j < scoreArray.length+1; j++){
        var row = table.insertRow(j);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = scoreArray[j-1].initials;
        cell2.innerHTML = scoreArray[j-1].score;
    }

};

// event listeners
btnStartEl.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", formSubmit);
viewHighScoreEl.addEventListener("click", displayHighScore);


// clear button 
clearBtn.addEventListener("click", function(){
    localStorage.clear();
    document.getElementById("scores-table").innerHTML="";
});

// back button
backBtn.addEventListener("click", function(){
    highScoreContainerEl.setAttribute("class", "hide");
    starterContainerEl.removeAttribute("class");
    document.getElementById("scores-table").remove();
    document.getElementById("initials-form").reset();
    totalScore = 0;
    currentQuestionIndex = 0;
});

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
});
