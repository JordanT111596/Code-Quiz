//Declares element variables
var highScoresOlEl = document.querySelector("#scoresList");
var resetBtn = document.querySelector("#reset");

//How the scores show up on the screen
function displayHighScores() {
    var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

    //gotta add sort() somewhere, somehow..

    //iterates through all scores from localStorage array
    for (var i = 0; i < localStorageHighScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = localStorageHighScores[i].name + ": " + localStorageHighScores[i].score;
        liEl.setAttribute("class", "list-group-item");
        highScoresOlEl.appendChild(liEl);
    }
}

//just clears the local storage and refreshes the page
function resetScores() {
    window.localStorage.clear();
    displayHighScores();
    location.reload();
}

//calls function to display scores
displayHighScores();

//gives button functionality
resetBtn.addEventListener("click", resetScores);