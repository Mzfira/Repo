let guessCounter = 1;
const sub = document.getElementById("guess-submit");
const guessBox = document.getElementById("guess-box");
const wrongGuesses = document.getElementById("wrong-guesses");
const guessWrapper = document.getElementById("guess-box-wrapper");
// const pDB = new Map([
//     [""
// ])
guessBox.addEventListener("input", (ev) => {

    let val = guessBox.value;
    if (guessWrapper.lastElementChild.getAttribute("id") === "ac-box") {
        const rmv = guessWrapper.lastElementChild;
        rmv.remove();
    }
    switch (val.length) {
        case 0:
        case 1:
            break;
        default:
            autoComp(val);
    }

});

function autoComp(val) {
    const ac = Object.assign(document.createElement("div"), { className: "container", id: "ac-box" });
    const nomatch = Object.assign(document.createElement("div"), { className: "no-match" });
    ac.appendChild(nomatch);
    // const matches = posMatches(val, pDB);
    const matches = ["ערן זהבי", "אבי נמני", "יניב קטן", "דקל קינן", "אייל גולסה"]
    for (x in matches) {
        const match = Object.assign(document.createElement("div"), { className: "match", innerHTML: matches[x] });
        match.setAttribute("tabindex", "0");
        ac.appendChild(match);
    }
    guessWrapper.appendChild(ac);
    var matchesSelectors = document.getElementsByClassName("match");
    for (i = 0; i < matchesSelectors.length; i++) {
        matchesSelectors[i].addEventListener("click", myFunc, false);
    }
}
function myFunc() {
    guessBox.value = this.innerHTML;
}

window.addEventListener("onkeydown", (eve) => {
    eve.preventDefault();
    var matchesSelectors = document.getElementsByClassName("match");
    let key = eve.key;
    for (i = 0; i < matchesSelectors.length; i++) {
        // if (key === "ArrowDown" && matchesSelectors[i].hasFocus())
        if (key === "ArrowDown") {
            // matchesSelectors[i + 1].focus();   
            console.log("wer");
        }
    }
})
sub.addEventListener("click", (e) => {
    e.preventDefault();
    labelsCreate(guessCounter);
    boxesCreate();
    nameCreate(guessCounter, guessBox.value);
    guessCounter++;
}
);

function labelsCreate(x) {
    if (x === 1) {
        const lbl = Object.assign(document.createElement("div"), { className: "container" });
        const natlbl = Object.assign(document.createElement("div"), { className: "label-box", innerHTML: "אזרחות" });
        const teamlbl = Object.assign(document.createElement("div"), { className: "label-box", innerHTML: "קבוצה" });
        const poslbl = Object.assign(document.createElement("div"), { className: "label-box", innerHTML: "עמדה" });
        const agelbl = Object.assign(document.createElement("div"), { className: "label-box", innerHTML: "גיל" });
        const shirtlbl = Object.assign(document.createElement("div"), { className: "label-box", innerHTML: "חולצה" });
        lbl.append(natlbl, teamlbl, poslbl, agelbl, shirtlbl);
        wrongGuesses.appendChild(lbl);
    }
};

function boxesCreate() {
    const boxes = Object.assign(document.createElement("div"), { className: "container" });
    const natBox = Object.assign(document.createElement("div"), { className: "box", style: "animation-name: boxFlipWrong; animation-delay: 0.2s;" });
    const teamBox = Object.assign(document.createElement("div"), { className: "box", style: "animation-name: boxFlipWrong; animation-delay: 0.7s;" });
    const posBox = Object.assign(document.createElement("div"), { className: "box", style: "animation-name: boxFlipWrong; animation-delay: 1.2s;" });
    const ageBox = Object.assign(document.createElement("div"), { className: "box", style: "animation-name: boxFlipWrong; animation-delay: 1.7s;" });
    const shirtBox = Object.assign(document.createElement("div"), { className: "box", style: "animation-name: boxFlipWrong; animation-delay: 2.2s;" });
    boxes.append(natBox, teamBox, posBox, ageBox, shirtBox);
    wrongGuesses.insertBefore(boxes, wrongGuesses.firstElementChild);
};

function nameCreate(x, val) {
    const wrng = Object.assign(document.createElement("div"), { className: "wrong-guess" });
    const cont = Object.assign(document.createElement("div"), { className: "container" });
    const pname = Object.assign(document.createElement("div"), { className: "pname", innerHTML: val });
    cont.appendChild(pname); wrng.appendChild(cont); wrongGuesses.insertBefore(wrng, wrongGuesses.firstElementChild);
    guessBox.value = "";
    guessBox.placeholder = "ניחוש מס' " + (x + 1);
};

