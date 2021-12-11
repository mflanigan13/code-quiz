//buttons
// var btnStartEl = document.querySelector("#start-game");
var submitScoreBtn = document.getElementById("submit-score");
var btnStartEl = document.getElementById("start-game");

//question-answer elements
var questionEl = document.getElementById("question-container");
var endContainerEl = document.getElementById("end-container");
var highScoreContainerEl = document.getElementById("high-score-container");
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
    questionEl.setAttribute("class", "hide");
    answerCorrectEl.setAttribute("class", "hide");
    answerWrongEl.setAttribute("class", "hide");
    endContainerEl.removeAttribute("class");
    showScoreEl.innerHTML = "Score:" + totalScore;
    submitScoreBtn.setAttribute("onclick", "formSubmit()");
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

function formSubmit() {
    var formInfoEl = document.getElementById('initials').value;
    document.querySelector(".container").setAttribute("class", "hide");

    var entry = {
        "initials": formInfoEl,
        "score": totalScore,
    };
    localStorage.setItem(localStorage.length, JSON.stringify(entry));

    // starterContainerEl.setAttribute("class", "hide");
    // highScoreContainerEl.removeAttribute("class");

    displayHighScore();
};

/*
    displayHighScore() is a function which iterates over the items stored within the localStore
    and adds each ofthem to a array. The array is then sorted from high to low based on each initials scores.
*/
function displayHighScore(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const entry = localStorage.getItem(key);
        scoreArray.push(JSON.parse(entry));
    }
    

    scoreArray?.sort((entry1, entry2) => (entry1.score < entry2.score ? 1 : -1))
    

    // var mytable = "<table class=scoresTable`><tr>";
    // for (var score of scoreArray) {  mytable += "<td>" + score + "</td>"; }
    // mytable += "</tr></table>";
    // document.getElementById("scoresTable").innerHTML = mytable;

    for (let j =0; j < scoreArray.length; j++){
        console.log(scoreArray[j].initials + " " + scoreArray[j].score)
    }
};

// btnStartEl.addEventListener("click", startQuiz);
btnStartEl.setAttribute("onclick", "startQuiz()");