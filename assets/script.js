//create convenience variables for all html sections
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var starterParagraphEl = document.querySelector("#starterParagraph");
var buttonGroupEl = document.querySelector("#buttonGroup");
var startButtonEl = document.querySelector("#startButton");
var containerDivEl = document.querySelector(".container");
var mainEl = document.querySelector("main");

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
        startButtonEl.setAttribute("style", "display: none !important");
        starterParagraphEl.setAttribute("style", "display: none !important");

        timerInterval = setInterval(tickDown, 1000)
        displayQuestions();
    }
}

function displayQuestions() {
    //Iterate through questions

    for (var i = 0; i < questionSet.length; i++) {
        setQuestion(i);
    }
}

function setQuestion(indexVal) {
    //sets question content to question from array
    questionEl.textContent = questionSet[indexVal].question;
    for (var i = 0; i < questionSet[indexVal].answerList[i].length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.textContent = questionSet[questionSetIndex].answerList[i];
        answerBtn.setAttribute("class", "btn btn-primary m-2");
        buttonGroupEl.appendChild(answerBtn);
        buttonGroupEl.setAttribute("class", "btn-group-vertical");
    }
}

function tickDown() {
    time--;
    timerEl.textContent = "Time left: " + time;

    if (time <= 0) {
        end();
    }
}

function end() {
    //Brings up screen for the intitals and save
}
//replace the starter info and button
//append questions, variables, and buttons to the body

//create button choices for selecting answer
//create button to submit and go to next question
//store answer as correct or incorrect locally