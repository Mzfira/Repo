let guessCounter = 0;
let guessId = "wrong-guess";
let guessPnameId = "wrong-guess-pname";
let natBox ="nationality-box";
let teamBox ="team-box";
let posBox ="position-box";
let ageBox ="age-box";
let shirtBox ="shirt-num-box";
document.getElementById("guess-submit").onclick = () =>  wrongGuess();
function wrongGuess() {
    // let div = document.createElement("div");
    guessCounter++;
    document.getElementById("label-boxes").style.display = "flex";
    document.getElementById(guessId+guessCounter).style.display = "block";
    document.getElementById(natBox+guessCounter).style.animationName = "boxFlipWrong";
    document.getElementById(natBox+guessCounter).style.animationDelay = "0.5s";
    document.getElementById(teamBox+guessCounter).style.animationName = "boxFlipWrong";
    document.getElementById(teamBox+guessCounter).style.animationDelay = "1s";
    document.getElementById(posBox+guessCounter).style.animationName = "boxFlipWrong";
    document.getElementById(posBox+guessCounter).style.animationDelay = "1.5s";
    document.getElementById(ageBox+guessCounter).style.animationName = "boxFlipWrong";
    document.getElementById(ageBox+guessCounter).style.animationDelay = "2s";
    document.getElementById(shirtBox+guessCounter).style.animationName = "boxFlipWrong";
    document.getElementById(shirtBox+guessCounter).style.animationDelay = "2.5s";
    document.getElementById(guessPnameId+guessCounter).innerHTML = document.forms["guess-form"]["guess"].value;
    document.getElementById("guess-box").value = "";
    document.getElementById("guess-box").placeholder = "ניחוש " + (guessCounter+1) + " מתוך 8";
    return false;
}
