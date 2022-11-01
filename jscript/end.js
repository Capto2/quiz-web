const username = document.getElementById("username");
const savedScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", function(){
    savedScoreBtn.disabled = !username.value;
});

function saveHighScore(event){
    console.log("Clicked on Saved Button")
    event.preventDefault();
}
