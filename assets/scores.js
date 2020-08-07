var highScoresOlEl = document.querySelector("#scoresList");
var resetBtn = document.querySelector("#reset");

function displayHighScores() {
    var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

    //can add sort()

    for (var i = 0; i < localStorageHighScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = localStorageHighScores[i].name + ": " + localStorageHighScores[i].score;
        liEl.setAttribute("class", "list-group-item");
        highScoresOlEl.appendChild(liEl);
    }
}

function resetScores() {
    window.localStorage.clear();
    displayHighScores();
}

resetBtn.addEventListener("click", resetScores);

displayHighScores();