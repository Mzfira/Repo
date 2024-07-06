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
    ["מתן חוזז", ["il", "Sakhnin", "MF", "27", "11"]],
    ["גיא מזרחי", ["il", "Sakhnin", "DF", "22", "2"]],
    ["גיל כהן", ["il", "Hedera", "DF", "24", "3"]],
    ["שובל גוזלן", ["il", "Hedera", "FW", "29", "9"]],
    ["עומרי בן הרוש", ["il", "Hedera", "DF", "34", "20"]],
    ["ממוחמד כנען", ["il", "Hedera", "MF", "22", "77"]],
    ["רועי זיכרי", ["il", "BJFC", "FW", "29", "20"]],
    ["אוריאל דגני", ["il", "BJFC", "DF", "34", "5"]],
    ["תומר חמד", ["il", "BJFC", "FW", "36", "10"]],
    ["רוי רביבו", ["il", "MPT", "DF", "23", "3"]],
    ["אבי ריקן", ["il", "MPT", "MF", "34", "8"]],
    ["דולב חזיזה", ["il", "HBS", "MF", "28", "10"]],
    ["תומר אלטמן", ["il", "HBS", "MF", "23", "15"]],
    ["רז שלמה", ["il", "HBS", "DF", "25", "5"]],
    ["רועי קהת", ["il", "KiryatShmona", "MF", "28", "6"]],
    ["שי בן דוד", ["il", "KiryatShmona", "DF", "27", "3"]],
    ["ניב אנטמן", ["il", "KiryatShmona", "GK", "28", "1"]],
    ["גיא הדר", ["il", "KiryatShmona", "FW", "25", "9"]],
    ["תומר אהרון", ["il", "Tiberiya", "MF", "26", "8"]],
    ["אליאל פרץ", ["il", "Tiberiya", "MF", "27", "7"]],
    ["יוגב בורג", ["il", "Tiberiya", "DF", "29", "4"]],
    ["גיא חפיאני", ["il", "Tiberiya", "FW", "23", "11"]],
    ["אופיר דוידזאדה", ["il", "MTA", "DF", "30", "27"]],
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
    let margin = 28.44;
    const ac = Object.assign(document.createElement("div"), { className: "container", id: "ac-box" });
    ac.addEventListener("mousemove", focusedThenHover, false);
    const nomatch = Object.assign(document.createElement("div"), { className: "no-match" });
    const matches = posMatches(val, pDB);
    if (matches.length == 0) {
        nomatch.innerHTML = "לא נמצא שחקן";
        nomatch.style.padding = "2px";
    }
    ac.appendChild(nomatch);
    for (x in matches) {
        const match = Object.assign(document.createElement("div"), { className: "match", innerHTML: matches[x] });
        match.setAttribute("tabindex", "0");
        ac.appendChild(match);
    }
    if (matches.length >= 4)
        ac.style.marginBottom = (-40 - (margin * 3)) + "px";
    else if (matches.length != 0)
        ac.style.marginBottom = (-40 - (margin * (matches.length - 1))) + "px";
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
        * autocomplete box to be over the guesses - DONE!
        * hovering makes arrow down,up or tab move from the last hovered
        * close autocomplete box after clicking somewhere else
        * -"-    -"-     -"-      -"-  pressing the esc key
        * pressing backspace focuses on guess box and deletes value (?)
        * close ac box after choosing a player
        * remove players from ac box and from mathces array after guessing
        * right guess animations, stoping beign able to guess
*/

// ["Ofir Marciano",["il", "MSA", "GK",  "33", "1"],
// ["Miguel Vítor",["Portugal", "HBS", "DF",  "33", "4"],
// ["Sheran Yeini",["il", "MTA", "DF",  "36", "21"],
// ["Lior Refaelov",["il", "MHDR", "MF",  "37", "10"],
// ["Dan Einbinder",["il", "HTA", "MF",  "34", "8"],
// ["Eyad Hutba",["il", "MBR", "DF",  "29", "18"],
// ["Ram Levy",["il", "HPT", "MF",  "27", "23"],
// ["Yonas Malede",["il", "BJFC", "FW",  "23", "9"],
// ["Mohammed Hindy",["il", "MPT", "DF",  "24", "4"],
// ["Ofek Bitton",["il", "HJE", "MF",  "22", "6"],
// ["Tomer Josefi",["il", "HPFC", "MF",  "25", "17"],
// ["Aviv Avraham",["il", "MNT", "MF",  "27", "19"],
// ["Maroun Gantous",["il", "Sakhnin", "DF",  "25", "5"],
// ["Barak Bachar",["il", "MHDR", "Man Ar",  "43", ""],
// ["Eli Dasa",["il", "MHDR", "DF",  "30", "2"],
// ["Omer Atzili",["il", "MHDR", "FW",  "29", "7"],
// ["Neta Lavi",["il", "MHDR", "MF",  "27", "6"],
// ["Eylon Almog",["il", "MTA", "FW",  "23", "17"],
// ["Dan Glazer",["il", "MTA", "MF",  "26", "6"],
// ["Stipe Perica",["Croatia", "MTA", "FW",  "28", "99"],
// ["Eran Zahavi",["il", "MTA", "FW",  "35", "7"],
// ["Ben Bitton",["il", "HTA", "DF",  "31", "2"],
// 23",["Omer Damari",["il", "HTA", "FW",  "34", "16"],
// 24",["Mahmoud Jaber",["il", "HTA", "MF",  "24", "6"],
// 25",["Ayid Habshi",["il", "Sakhnin", "DF",  "29", "5"],
// 26",["Matan Hozez",["il", "Sakhnin", "MF",  "27", "11"],
// 27",["Guy Mizrahi",["il", "Sakhnin", "DF",  "22", "2"],
// 28",["Gil Cohen",["il", "HDR", "DF",  "24", "3"],
// 29",["Shoval Gozlan",["il", "HDR", "FW",  "29", "9"],
// 30",["Omri Ben Harush",["il", "HDR", "DF",  "34", "20"],
// 31",["Muhammad Kna'an",["il", "HDR", "MF",  "22", "77"],
// 32",["Roei Zikri",["il", "BJFC", "FW",  "29", "20"],
// 33",["Uriel Degani",["il", "BJFC", "DF",  "34", "5"],
// 34",["Tomer Hemed",["il", "BJFC", "FW",  "36", "10"],
// 35",["Roy Revivo",["il", "MPT", "DF",  "23", "3"],
// 36",["Avi Rikan",["il", "MPT", "MF",  "34", "8"],
// 37",["Dolev Haziza",["il", "HBS", "MF",  "28", "10"],
// 38",["Tomer Altman",["il", "HBS", "MF",  "23", "15"],
// 39",["Raz Shlomo",["il", "HBS", "DF",  "25", "5"],
// 40",["Roy Kahat",["il", "KSH", "MF",  "28", "6"],
// 41",["Shay Ben David",["il", "KSH", "DF",  "27", "3"],
// 42",["Niv Antman",["il", "KSH", "GK",  "28", "1"],
// 43",["Guy Hadar",["il", "KSH", "FW",  "25", "9"],
// 44",["Tomer Aharon",["il", "TBS", "MF",  "26", "8"],
// 45",["Eliel Peretz",["il", "TBS", "MF",  "27", "7"],
// 46",["Yogev Burg",["il", "TBS", "DF",  "29", "4"],
// 47",["Guy Hafiani",["il", "TBS", "FW",  "23", "11"],
// 48",["Ofir Davidzada",["il", "MTA", "DF",  "30", "27"],
// 49",["Tal Ben Haim",["il", "MTA", "FW",  "34", "11"],
// 50",["Ben Mizrachi",["il", "MHDR", "MF",  "25", "14"],
// 51",["Suf Podgoreanu",["il", "MHDR", "FW",  "22", "27"],
// 52",["Nikita Rukavytsya",["Australia", "MHDR", "FW",  "35", "13"],
// 53",["Dolev Haziza",["il", "HBS", "MF",  "27", "10"],
// 54",["Miguel Silva",["Portugal", "HBS", "GK",  "28", "1"],
// 55",["Sagiv Jehezkel",["il", "HBS", "FW",  "28", "30"],
// 56",["Uri Dahan",["il", "HBS", "DF",  "24", "5"],
// 57",["Matan Berkowitz",["il", "HPFC", "MF",  "22", "23"],
// 58",["Eitan Tibi",["il", "HPFC", "DF",  "35", "18"],
// 59",["Tomer Jankelowitz",["il", "HPFC", "GK",  "25", "22"],
// 60",["Danilo Asprilla",["Colombia", "HPFC", "FW",  "34", "77"],
// 61",["Hatem Elhamed",["il", "HPFC", "DF",  "33", "44"],
// 62",["Gal Arel",["il", "HPFC", "MF",  "33", "6"],
// 63",["Omer Nachmani",["il", "HPFC", "FW",  "26", "15"],
// 64",["Eliel Peretz",["il", "TBS", "MF",  "27", "7"],
// 65",["Or Inbrum",["il", "TBS", "FW",  "28", "10"],
// 66",["Ya'akov Abu",["il", "TBS", "GK",  "29", "1"],
// 67",["Shlomi Azoulay",["il", "HTA", "MF",  "29", "7"],
// 68",["Eliezer Ilaraz",["il", "HTA", "FW",  "22", "16"],
// 69",["Gal Kaufman",["il", "HTA", "MF",  "24", "19"],
// 70",["Adi Tamir",["il", "HTA", "DF",  "25", "5"],
// 71",["David Fuxman",["il", "MNT", "GK",  "21", "1"],
// 72",["Raz Twizer",["il", "MNT", "FW",  "22", "19"],
// 73",["Idan Shriki",["il", "MNT", "MF",  "25", "7"],
// 74",["Shay Golan",["il", "MNT", "MF",  "27", "6"],
// 75",["Eliran Atar",["il", "Sakhnin", "FW",  "33", "16"],
// 76",["Itamar Nitzan",["il", "Sakhnin", "GK",  "32", "1"],
// 77",["Osama Khalaila",["il", "Sakhnin", "FW",  "26", "7"],
// 78",["Fadi Najar",["il", "Sakhnin", "MF",  "24", "8"],
// 79",["Mahamadou Sissoko",["Mali", "KSH", "DF",  "30", "4"],
// 80",["Ahmed Salman",["il", "KSH", "FW",  "23", "11"}
//   ],
// }