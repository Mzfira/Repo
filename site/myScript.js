let guessCounter = 1;
let originTxt = "";
const sub = document.getElementById("guess-submit");
const guessBox = document.getElementById("guess-box");
const wrongGuesses = document.getElementById("wrong-guesses");
const guessWrapper = document.getElementById("guess-box-wrapper");
const pDB = new Map([
    ["אופיר מרציאנו", ["il", "Ashdod", "GK", "33", "1"]],
    ["מיגל ויטור", ["pt", "HBS", "DF", "33", "4"]],
    ["שרן ייני", ["il", "MTA", "DF", "36", "21"]],
    ["ליאור רפאלוב", ["il", "MHA", "MF", "37", "10"]],
    // ["דן איינבדר", ["il", "HTA", "MF", "34", "8"]],
    ["עיאד חוטבה", ["il", "Reineh", "DF", "29", "18"]],
    // ["רם לוי", ["il", "HPT", "MF", "27", "23"]],
    ["יונס מלדה", ["il", "BJFC", "FW", "23", "9"]],
    ["מוחמד הינדי", ["il", "MPT", "DF", "24", "4"]],
    ["אופק ביטון", ["il", "HJE", "MF", "22", "6"]],
    ["תומר יוספי", ["il", "HapoelHaifa", "MF", "25", "17"]],
    ["אביב אברהם", ["il", "MNT", "MF", "27", "19"]],
    ["מראון גנטוס", ["il", "Sakhnin", "DF", "25", "5"]],
    ["אלי דסה", ["il", "Hedera", "DF", "30", "2"]],
    ["עומר אצילי", ["il", "Hedera", "FW", "29", "7"]],
    ["נטע לביא", ["il", "Hedera", "MF", "27", "6"]],
    ["אילון אלמוג", ["il", "MTA", "FW", "23", "17"]],
    ["דן גלזר", ["il", "MTA", "MF", "26", "6"]],
    ["ערן זהבי", ["il", "MTA", "FW", "35", "7"]],
    // ["בן ביטון", ["il", "HTA", "DF", "31", "2"]],
])
let pToday = "אופיר מרציאנו";
let today = pDB.get(pToday);
const cDB = new Map([
    ["pt", "פורטוגל"],
    ["il", "ישראל"]
])
const fDB = new Map([
    ["pt", "pt.svg"],
    ["il", "il.svg"]
])

const tDB = new Map([
    ["Ashdod", ["Ashdod.webp", "אשדוד"]],
    ["HBS", ["HBS.webp", "הפועל באר שבע"]],
    ["MTA", ["MTA.webp", "מכבי תל אביב"]],
    ["BJFC", ["BJFC.webp", "בית&quotר ירושלים"]],
    ["HapoelHaifa", ["HapoelHaifa.webp", "הפועל חיפה"]],
    ["Sakhnin", ["Sakhnin.webp", "בני סכנין"]],
    ["Hedera", ["Hedera.webp", "הפועל חדרה"]],
    ["MNT", ["MNT.webp", "מכבי נתניה"]],
    ["MPT", ["MPT.webp", "מכבי פתח תקווה"]],
    ["HJE", ["HJE.webp", "הפועל ירושלים"]],
    ["KiryatShmona", ["KiryatShmona.webp", "עירוני קריית שמונה"]],
    ["Tiberiya", ["Tiberiya.webp", "עירוני טבריה"]],
    ["Reineh", ["Reineh.webp", "מכבי בני ריינה"]],
    ["MHA", ["MHA.webp", "מכבי חיפה"]]
])
window.addEventListener("keydown", (eve) => {
    // eve.preventDefault();
    const fcs = document.activeElement;
    let key = eve.key;
    if ((key === "ArrowDown" || key === "Tab") && fcs.getAttribute("id") == "guess-box") {
        eve.preventDefault();
        const newFcs = fcs.parentElement.lastElementChild.firstElementChild.nextElementSibling;
        newFcs.focus();
        originTxt = guessBox.value;
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
            guessBox.value = originTxt;
        }
        else {
            const newFcs = fcs.previousElementSibling;
            newFcs.focus();
            guessBox.value = newFcs.innerHTML;
        }
    }
    if (key === "Enter") {
        if (fcs.getAttribute("class") == "match no-hover")
            guessBox.focus();
        if (fcs.getAttribute("id") == "guess-box" && document.getElementsByClassName("match").length == 1)
            guessBox.value = document.getElementsByClassName("match")[0].innerHTML;
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
    const matches = posMatches(val, pDB);
    if (matches.length == 0)
        nomatch.innerHTML = "לא נמצא שחקן";
    ac.appendChild(nomatch);
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
function posMatches(val, db) {
    const mtch = [];
    for (const x of db.keys()) {
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
function gueesCheck(val) {
    const rightWrong = [];
    for (var i = 0; i < 3; i++) {
        if (today[i] == pDB.get(val)[i])
            rightWrong[i] = "Right";
        else
            rightWrong[i] = "Wrong";
    }
    for (var i = 3; i < 5; i++) {
        if (today[i] == pDB.get(val)[i])
            rightWrong[i] = "Right";
        else if (today[i] > pDB.get(val)[i])
            rightWrong[i] = "WrongUp";
        else 
            rightWrong[i] = "WrongDown";

    }
    return rightWrong;
}
sub.addEventListener("click", (e) => {
    let val = guessBox.value;
    e.preventDefault();
    try {
        if (!(pDB.has(val))) throw "exit";
        labelsCreate(guessCounter);
        boxesCreate(val);
        nameCreate(guessCounter, val);
        guessCounter++;
        if (guessWrapper.lastElementChild.getAttribute("id") === "ac-box") {
            const rmv = guessWrapper.lastElementChild;
            rmv.remove();
        }
    }
    catch (err) {

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

function boxesCreate(val) {
    const rightWrong = gueesCheck(val);
    let i = 0;
    const boxes = Object.assign(document.createElement("div"), { className: "container" });
    const natBox = Object.assign(document.createElement("div"), {
        className: "box", style: "animation-delay: 0.2s;",
        innerHTML: "<div class='nat-box'><img src='images/flags/" + fDB.get(pDB.get(val)[i]) + "' border='2.5' alt='" + cDB.get(pDB.get(val)[i]) + "' width='59' height='45' ></div>"
    });
    natBox.style.animationName = "boxFlip" + rightWrong[i]; i++;
    const teamBox = Object.assign(document.createElement("div"), {
        className: "box", style: "animation-delay: 0.7s;",
        innerHTML: "<div class='team-box'><img src='images/teams/" + tDB.get(pDB.get(val)[i])[0] + "' alt='" + tDB.get(pDB.get(val)[i])[1] +
            "' width='60' height='60'></div>"
    });
    teamBox.style.animationName = "boxFlip" + rightWrong[i]; i++;
    const posBox = Object.assign(document.createElement("div"), {
        className: "box ", style: "animation-delay: 1.2s;",
        innerHTML: "<div class='pos-box'>" + pDB.get(val)[i] + "</div>"
    });
    posBox.style.animationName = "boxFlip" + rightWrong[i]; i++;
    const ageBox = Object.assign(document.createElement("div"), {
        className: "box ", style: "animation-delay: 1.7s;",
        innerHTML: "<div class='age-box'>" + pDB.get(val)[i] + "</div>"
    });
    ageBox.style.animationName = "boxFlip" + rightWrong[i]; i++;
    const shirtBox = Object.assign(document.createElement("div"), {
        className: "box ", style: "animation-delay: 2.2s;",
        innerHTML: "<div class='shirt-box'>" + pDB.get(val)[i] + "</div>"
    });
    shirtBox.style.animationName = "boxFlip" + rightWrong[i]; i++;
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
        * -"-    -"-     -"-      -"-  pressing the esc key
        * pressing backspace focuses on guess box and deletes value (?)
        * close ac box after choosing a player
        * remove players from ac box and from mathces array after guessing
        * right guess animations, stoping beign able to guess
*/