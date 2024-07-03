let guessCounter = 0;
const element = document.getElementById("guess-submit");
element.addEventListener("click", (e) => {

    const wrongGuesses = document.getElementById("wrong-guesses");
    e.preventDefault();
    console.log("working");
    if (guessCounter === 0) {

        const lbl = document.createElement("div");
        lbl.className = "container";
        const natlbl = document.createElement("div");
        natlbl.className = "label-box"; natlbl.innerHTML = "אזרחות"
        const teamlbl = document.createElement("div");
        teamlbl.className = "label-box"; teamlbl.innerHTML = "קבוצה"
        const poslbl = document.createElement("div");
        poslbl.className = "label-box"; poslbl.innerHTML = "עמדה"
        const agelbl = document.createElement("div");
        agelbl.className = "label-box"; agelbl.innerHTML = "גיל"
        const shirtlbl = document.createElement("div");
        shirtlbl.className = "label-box"; shirtlbl.innerHTML = "חולצה"
        lbl.append(natlbl, teamlbl, poslbl, agelbl, shirtlbl);
        wrongGuesses.appendChild(lbl);
    }
    
    const boxes = document.createElement("div");
    boxes.className = "container";
    const natBox = document.createElement("div");
    natBox.className = "box"; natBox.style.animationName = "boxFlipWrong"; natBox.style.animationDelay = "0.2s";
    const teamBox = document.createElement("div");
    teamBox.className = "box"; teamBox.style.animationName = "boxFlipWrong"; teamBox.style.animationDelay = "0.7s";
    const posBox = document.createElement("div");
    posBox.className = "box"; posBox.style.animationName = "boxFlipWrong"; posBox.style.animationDelay = "1.2s";
    const ageBox = document.createElement("div");
    ageBox.className = "box"; ageBox.style.animationName = "boxFlipWrong"; ageBox.style.animationDelay = "1.7s";
    const shirtBox = document.createElement("div");
    shirtBox.className = "box"; shirtBox.style.animationName = "boxFlipWrong"; shirtBox.style.animationDelay = "2.2s";
    boxes.append(natBox, teamBox, posBox, ageBox, shirtBox);
    wrongGuesses.insertBefore(boxes, wrongGuesses.firstElementChild);
   
    const wrng = document.createElement("div");
    wrng.className= "wrong-guess";
    const cont = document.createElement("div");
    cont.className= "container";
    const pname = document.createElement("div");
    pname.className= "pname"; pname.innerHTML= document.forms["guess-form"]["guess"].value;
    cont.appendChild(pname); wrng.appendChild(cont); wrongGuesses.insertBefore(wrng, wrongGuesses.firstElementChild);
    document.getElementById("guess-box").value = "";
    guessCounter++;
    document.getElementById("guess-box").placeholder = "ניחוש " + (guessCounter+1) + " מתוך 8";
}
);

