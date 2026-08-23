
let result = document.getElementById("result");
let guessNumber = document.getElementById("guessNumber");
const resetButton = document.getElementById("resetButton");
const submitButton = document.getElementById("submitButton");
const customInputs = document.querySelectorAll(".custom");
const homePage = document.getElementById("homePage");
const theGame = document.getElementById("theGame");
const levels = document.querySelectorAll(".level");
const startButton = document.getElementById("start");
const levelRange = document.getElementById("levelRange");
const backButton = document.getElementById("back");
const errorMessage = document.createElement("h1");
let number;
let attemptsCount = 0;
let chosenLevel = 1;
let customMin;
let customMax;

function main() {
    customInputs.forEach(input => {
        input.setAttribute("hidden", "");
    });
    theGame.setAttribute("hidden", "");
    levels[1].classList.add("selected");
}

function selectLevel(selectedLevel) {
    levels.forEach(level => {
        level.classList.remove("selected");
    });
    levels[selectedLevel].classList.add("selected");
    chosenLevel = selectedLevel;
    if (selectedLevel == 3) {
        customInputs.forEach(input => {
            input.removeAttribute("hidden");
        });
    } else {
        customInputs.forEach(input => {
            input.setAttribute("hidden", "");
        });
    }
    homePage.removeChild(errorMessage);
}

function start() {
    console.log("i am working");
    switch (chosenLevel) {
        case 0:
            number = Math.floor(Math.random() * 10) + 1;
            levelRange.textContent = "Easy: Guess the number from 1 to 10";
            break;
        case 1:
            number = Math.floor(Math.random() * 100) + 1;
            levelRange.textContent = "Normal: Guess the number from 1 to 100";
            break;
        case 2:
            number = Math.floor(Math.random() * 1000) + 1;
            levelRange.textContent = "Hard: Guess the number from 1 to 1000";
            console.log(number);
            break;
        case 3:
            if (!customInputs[1].value || !customInputs[3].value) {
                homePage.appendChild(errorMessage);
                errorMessage.textContent = "Input a Min and Max number";
                return;
            } else {
                customMin = customInputs[1].value;
                customMax = customInputs[3].value;
                number = Math.floor(Math.random() * Number(customMax - customMin + 1)) + Number(customMin);
                levelRange.textContent = `Custom: Guess the number from ${customMin} to ${customMax}`;
                break;
            }
    }
    if (!errorMessage) {
        homePage.removeChild(errorMessage);
    }
    theGame.removeAttribute("hidden");
    homePage.setAttribute("hidden", "");
}

function submit() {
    if (guessNumber.value != 0) {
        attemptsCount++;
        document.getElementById("attemptsCount").textContent = attemptsCount;
        if (guessNumber.value > number) {
            result.textContent = "Too High";
        } else if (guessNumber.value < number) {
            result.textContent = "Too Low";
        } else {
            result.textContent = "Correct!";
            submitButton.setAttribute("hidden", "");
            guessNumber.setAttribute("hidden", "");
        }
    }
}

function reset() {
    result.textContent = "Start Guessing";
    submitButton.removeAttribute("hidden");
    guessNumber.removeAttribute("hidden");
    guessNumber.value = 0;
    attemptsCount = 0;
    document.getElementById("attemptsCount").textContent = attemptsCount;
    start();
}

function back() {
    number;
    attemptsCount = 0;
    chosenLevel = 1;
    customMin;
    customMax;
    levels.forEach(level => {
        level.classList.remove("selected");
    });
    homePage.removeAttribute("hidden");
    main();
}

main();

levels[0].addEventListener("click", () => selectLevel(0));
levels[1].addEventListener("click", () => selectLevel(1));
levels[2].addEventListener("click", () => selectLevel(2));
levels[3].addEventListener("click", () => selectLevel(3));

startButton.addEventListener("click", start);
submitButton.addEventListener("click", submit);
resetButton.addEventListener("click", reset);
backButton.addEventListener("click", back);
