let guessCounter = 1;
const sub = document.getElementById("guess-submit");
const guessBox = document.getElementById("guess-box");
const wrongGuesses = document.getElementById("wrong-guesses");
const guessWrapper = document.getElementById("guess-box-wrapper");
const pDB = new Map([
    ["Ofir Marciano", ["Israel", "MSA", "GK", "33", "1"]],
    ["Miguel Vítor", ["Portugal", "HBS", "DF", "33", "4"]],
    ["Sheran Yeini", ["Israel", "MTA", "DF", "36", "21"]],
    ["Lior Refaelov", ["Israel", "MHDR", "MF", "37", "10"]],
    ["Dan Einbinder", ["Israel", "HTA", "MF", "34", "8"]],
    ["Eyad Hutba", ["Israel", "MBR", "DF", "29", "18"]],
    ["Ram Levy", ["Israel", "HPT", "MF", "27", "23"]],
    ["Yonas Malede", ["Israel", "BJFC", "FW", "23", "9"]],
    ["Mohammed Hindy", ["Israel", "MPT", "DF", "24", "4"]],
    ["Ofek Bitton", ["Israel", "HJE", "MF", "22", "6"]],
    ["Tomer Josefi", ["Israel", "HPFC", "MF", "25", "17"]],
    ["Aviv Avraham", ["Israel", "MNT", "MF", "27", "19"]],
    ["Maroun Gantous", ["Israel", "BNS", "DF", "25", "5"]],
    ["Barak Bachar", ["Israel", "MHDR", "Man Ar", "43", ""]],
    ["Eli Dasa", ["Israel", "MHDR", "DF", "30", "2"]],
    ["Omer Atzili", ["Israel", "MHDR", "FW", "29", "7"]],
    ["Neta Lavi", ["Israel", "MHDR", "MF", "27", "6"]],
    ["Eylon Almog", ["Israel", "MTA", "FW", "23", "17"]],
    ["Dan Glazer", ["Israel", "MTA", "MF", "26", "6"]],
    ["Stipe Perica", ["Croatia", "MTA", "FW", "28", "99"]],
    ["Eran Zahavi", ["Israel", "MTA", "FW", "35", "7"]],
    ["Ben Bitton", ["Israel", "HTA", "DF", "31", "2"]],
])
window.addEventListener("keydown", (eve) => {
    // eve.preventDefault();
    const fcs = document.activeElement;
    let key = eve.key;
    if ((key === "ArrowDown" || key === "Tab") && fcs.getAttribute("id") == "guess-box") {
        eve.preventDefault();
        const newFcs = fcs.parentElement.lastElementChild.firstElementChild.nextElementSibling;
        newFcs.focus();

        guessBox.value = newFcs.innerHTML;
    }
    if ((key === "ArrowDown" || key === "Tab") && fcs.getAttribute("class") == "match no-hover") {
        eve.preventDefault();
        if (fcs.nextElementSibling != null) {
            const newFcs = fcs.nextElementSibling;
            newFcs.focus();
            guessBox.value = newFcs.innerHTML;
        }
    }
    if (key === "ArrowUp" && fcs.getAttribute("class") == "match no-hover") {
        eve.preventDefault();
        if (fcs.previousElementSibling.getAttribute("class") == "no-match") {
            guessBox.focus();
            guessBox.value = "";
        }
        else {
            const newFcs = fcs.previousElementSibling;
            newFcs.focus();
            guessBox.value = newFcs.innerHTML;
        }
    }
    if (key === "Enter" && fcs.getAttribute("class") == "match no-hover") {
        guessBox.focus();
    }
})
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
    ac.addEventListener("mousemove", focusedThenHover, false);
    const nomatch = Object.assign(document.createElement("div"), { className: "no-match" });
    ac.appendChild(nomatch);
    const matches = posMatches(val, pDB);
    // const matches = ["ערן זהבי", "אבי נמני", "יניב קטן", "דקל קינן", "אייל גולסה"]
    for (x in matches) {
        const match = Object.assign(document.createElement("div"), { className: "match", innerHTML: matches[x] });
        match.setAttribute("tabindex", "0");
        ac.appendChild(match);
    }
    guessWrapper.appendChild(ac);
    var matchesSelectors = document.getElementsByClassName("match");
    for (i = 0; i < matchesSelectors.length; i++) {
        matchesSelectors[i].addEventListener("click", selectFromAC, false);
        matchesSelectors[i].addEventListener("focus", hoverDis, false);
        matchesSelectors[i].addEventListener("blur", hoverAct, false);
        matchesSelectors[i].addEventListener("mouseover", hoverAct, false);

    }
}
function posMatches(val, db)
{   
    const mtch = [];
    for(const x of db.keys()) {
        if (x.toString().includes(val)) {
            mtch.push(x.toString());
        }
    }
    return mtch;
}
function selectFromAC() {
    guessBox.value = this.innerHTML;
    guessBox.focus();
}
function focusedThenHover() {
    guessBox.focus();
    hoverAct();
}
function hoverDis() {
    var matchesSelectors = document.getElementsByClassName("match");
    for (i = 0; i < matchesSelectors.length; i++) {
        matchesSelectors[i].setAttribute("class", matchesSelectors[i].getAttribute("class") + " no-hover");
    }
}
function hoverAct() {
    var matchesSelectors = document.getElementsByClassName("match");
    for (i = 0; i < matchesSelectors.length; i++) {
        matchesSelectors[i].setAttribute("class", "match");
    }
}

sub.addEventListener("click", (e) => {
    let val = guessBox.value;
    e.preventDefault();
    try {
        if (!(pDB.has(val))) throw "לא נמצא שחקן";
        labelsCreate(guessCounter);
        boxesCreate();
        nameCreate(guessCounter, val);
        guessCounter++;
        if (guessWrapper.lastElementChild.getAttribute("id") === "ac-box") {
            const rmv = guessWrapper.lastElementChild;
            rmv.remove();
        }
    }
    catch(err) {
        document.getElementsByClassName("no-match")[0].innerHTML = err;
    }
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

/* IDEAS:
        * autocomplete box to be over the guesses
        * hovering makes arrow down,up or tab move from the last hovered
        * close autocomplete box after clicking somewhere else
        * close ac box after guess box has been emptied with arrow up
*/