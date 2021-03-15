//create convenience variables for all html elements
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var starterParagraphEl = document.querySelector("#starterParagraph");
var buttonGroupEl = document.querySelector("#buttonGroup");
var startButtonEl = document.querySelector("#startButton");
var containerDivEl = document.querySelector(".container");
var mainEl = document.querySelector("main");
var nameInput = document.querySelector(".form-control");

//set up global variables for various functions
var timerInterval;
var time = 100;
var questionSetIndex = 0;

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
        question: "Who lead the NBA in points per game for the 2019-20 season?",
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

//Start the button functionality
startButtonEl.addEventListener("click", gameStart);

//actually starts the game
function gameStart() {
    //Only if start button is hit
    if (event.target.matches("button")) {
        //remove start button
        startButtonEl.remove();
        //hide starter paragraph
        starterParagraphEl.setAttribute("style", "display: none !important");

        //start countdown
        timerInterval = setInterval(tickDown, 1000)
        displayQuestions();
    }
}

//function for showing the question on the screen from array
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

//function for showing the answers on the screen from array of objects
function setAnswers(indexVal) {
    //creates button for each answer choice
    var answerBtn = document.createElement("button");
    //sets answer choice text to appear in button
    answerBtn.textContent = questionSet[questionSetIndex].answerList[indexVal];
    //set bootstrap css class for button
    answerBtn.setAttribute("class", "btn btn-primary m-2");
    //set data attribute so we can check if it's the right answer later
    answerBtn.setAttribute("data-index", indexVal);

    //give button functionality to check answer and progress
    answerBtn.addEventListener("click", checkAnswer);

    //add button to the button group
    buttonGroupEl.appendChild(answerBtn);
}

//function for counting down clock/score
function tickDown() {
    //time/score decreases
    time--;
    //updates timer in top corner
    timerEl.textContent = "Time left: " + time;

    //end the game when time runs out
    if (time <= 0) {
        end();
    }
}

//function for checking if the answer is right and what to do from there
function checkAnswer() {
    //make sure there's no refresh due to the form
    event.preventDefault();
    //compare answer to corect answer value, if correct move on
    if (parseInt(event.target.getAttribute("data-index")) === questionSet[questionSetIndex].correctAnswer) {
        questionSetIndex++;
    }

    //if not correct, move on but with 10 less seconds
    else {
        time = time - 10;
        questionSetIndex++;
    }
    //remove buttons so new buttons can have space to themselves
    buttonGroupEl.innerHTML = "";

    //when you reach the end of the questions or if there's no time remaining, the game is over
    if (questionSetIndex === questionSet.length || time == 0) {
        return end();
    }
    //shows new set of questions if there's more to go
    displayQuestions()
}

//function for Game Over
function end() {

    // clears answer choices when the game ends
    buttonGroupEl.innerHTML = "";
    
    //Brings up screen for the intitals and save
    clearInterval(timerInterval);

    //creates and appends form for name
    var nameBoxFormEl = document.createElement("form");
    buttonGroupEl.appendChild(nameBoxFormEl);

    //creates, styles, and appends div for name
    var nameBoxEl = document.createElement("div");
    nameBoxEl.setAttribute("class", "form-group");
    nameBoxFormEl.appendChild(nameBoxEl);

    //creates, styles, and appends label for name
    var nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-text");
    nameBoxEl.appendChild(nameLabel);

    //creates, styles, and appends input for name
    var textForName = document.createElement("input");
    textForName.setAttribute("type", "text");
    textForName.setAttribute("placeholder", "Enter your name here!");
    textForName.setAttribute("name", "name-text");
    textForName.setAttribute("id", "name-text");
    textForName.setAttribute("class", "m-3");
    nameBoxEl.appendChild(textForName);

    //creates, styles, and appends button for submit
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-primary mb-2");
    submitBtn.textContent = "Submit";
    nameBoxEl.appendChild(submitBtn);

    //added functionality for button to store scores upon click
    submitBtn.addEventListener("click", storeScore);

    //Replaces question with some directions for the user
    questionEl.textContent = "Enter your name!";

}

//function for storing the scores in the local storage
function storeScore() {
    //make sure there's no refresh due to the form
    event.preventDefault();
    //convenience variable for name input
    var textForName = document.querySelector("#name-text");
    //make sure there's no filler in the name input
    var name = textForName.value.trim();

    //if the name isn't empty, store it
    if (name) {
        //creates object array for stored scores
        var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

        //the entry the use just made gets stored
        var newScore = {
            name: name,
            score: time
        }

        //put that new entry into the array
        localStorageHighScores.push(newScore);
        //store that array locally
        window.localStorage.setItem("localStorageHighScores", JSON.stringify(localStorageHighScores))

        //redirect user to highscore page
        window.location.href = "assets/highscores.html";
    }


}