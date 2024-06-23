document.getElementById("guess-submit").onclick = () =>  wrongGuess();
function wrongGuess() {
    // let div = document.createElement("div");
    // div.id
    document.getElementById("label-boxes").style.display = "flex";
    document.getElementById("label-boxes").style.display = "flex";
    document.getElementById("wrong-guess-pname1").innerHTML = document.forms["guess-form"]["guess"].value;
    return false;
}
