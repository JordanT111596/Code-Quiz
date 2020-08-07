//create convenience variables for all html sections
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var starterParagraphEl = document.querySelector("#starterParagraph");
var buttonGroupEl = document.querySelector("#buttonGroup");
var startButtonEl = document.querySelector("#startButton");
var containerDivEl = document.querySelector(".container");
var mainEl = document.querySelector("main");
var nameInput = document.querySelector(".form-control");

var timerInterval;
var time = 100;
var questionSetIndex = 0;

//create elements if needed

//create question array
var questionSet = [
    {
        question: "Who invented the game of basketball in the year 1891?",
        answerList: [
            "Thomas Edison",
            "James Naismith",
            "Charles Fritts",
            "Michael Jordan"
        ],
        correctAnswer: 1
    },
    {
        question: "Who holds the all-time record for most career points in the NBA?",
        answerList: [
            "Michael Jordan",
            "LeBron James",
            "Kobe Bryant",
            "Kareem Abdul-Jabbar"
        ],
        correctAnswer: 3
    },
    {
        question: "Who has made the most money from only their total contract career earnings?",
        answerList: [
            "Kevin Garnett",
            "Kobe Bryant",
            "Shaquille O'Neal",
            "Steph Curry"
        ],
        correctAnswer: 0
    },
    {
        question: "Who leads the NBA in points per game for the 2019-20 season?",
        answerList: [
            "Bradley Beal",
            "Giannis Antetokounmpo",
            "James Harden",
            "Luka Dončić"
        ],
        correctAnswer: 2
    },
    {
        question: "Who, despite their many faults, is the greatest basketball team to ever exist?",
        answerList: [
            "Los Angeles Lakers",
            "Boston Celtics... yuck",
            "New York Knicks",
            "Philadelphia 76ers"
        ],
        correctAnswer: 3
    }
]

//Start the game
startButtonEl.addEventListener("click", gameStart);

function gameStart() {
    if (event.target.matches("button")) {
        startButtonEl.remove();
        starterParagraphEl.setAttribute("style", "display: none !important");

        timerInterval = setInterval(tickDown, 1000)
        displayQuestions();
    }
}

function displayQuestions() {


    var currentQuestion = questionSet[questionSetIndex];

    //sets question content to question from array
    questionEl.textContent = questionSet[questionSetIndex].question;
    //sets button group to be vertical using bootstrap
    buttonGroupEl.setAttribute("class", "btn-group-vertical");

    //Iterate through questions
    for (var i = 0; i < questionSet.length - 1; i++) {
        setAnswers(i);
    }
}

function setAnswers(indexVal) {
    var answerBtn = document.createElement("button");
    answerBtn.textContent = questionSet[questionSetIndex].answerList[indexVal];
    answerBtn.setAttribute("class", "btn btn-primary m-2");
    answerBtn.setAttribute("data-index", indexVal);

    answerBtn.addEventListener("click", checkAnswer);

    buttonGroupEl.appendChild(answerBtn);
}

function tickDown() {
    time--;
    timerEl.textContent = "Time left: " + time;

    if (time <= 0) {
        end();
    }
}

function checkAnswer() {
    event.preventDefault();
    if (parseInt(event.target.getAttribute("data-index")) === questionSet[questionSetIndex].correctAnswer) {
        questionSetIndex++;
    }

    else {
        time = time - 10;
        questionSetIndex++;
    }
    buttonGroupEl.innerHTML = "";
    
    if (questionSetIndex === questionSet.length) {
        return end();
    }
    displayQuestions()
}

function end() {
    //Brings up screen for the intitals and save
    clearInterval(timerInterval);

    var nameBoxFormEl = document.createElement("form");
    buttonGroupEl.appendChild(nameBoxFormEl);

    var nameBoxEl = document.createElement("div");
    nameBoxEl.setAttribute("class", "form-group");
    nameBoxFormEl.appendChild(nameBoxEl);

    var nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-text");
    nameBoxEl.appendChild(nameLabel);

    var textForName = document.createElement("input");
    textForName.setAttribute("type", "text");
    textForName.setAttribute("placeholder", "Enter your name here!");
    textForName.setAttribute("name", "name-text");
    textForName.setAttribute("id", "name-text")
    nameBoxEl.appendChild(textForName);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-primary mb-2");
    submitBtn.textContent = "Submit";
    nameBoxEl.appendChild(submitBtn);

    submitBtn.addEventListener("click", storeScore);

    questionEl.textContent = "Enter your name!";

}

function storeScore() {
    event.preventDefault();
    var textForName = document.querySelector("#name-text");
    var name = textForName.value.trim();
    
    if (name === "") {
        return;
      }

      
}
//replace the starter info and button
//append questions, variables, and buttons to the body

//create button choices for selecting answer
//create button to submit and go to next question
//store answer as correct or incorrect locally