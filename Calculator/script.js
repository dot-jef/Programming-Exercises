
let numberDisplay = document.getElementById("numberDisplay");
let previousNumber = 0;
let currentNumber = "0";
let operation;

function display() {
    numberDisplay.textContent = currentNumber;
}

function putNumber(input) {
    if (currentNumber == 0) {
        currentNumber = input;
        display();
    } else {
        currentNumber += input;
        console.log(typeof currentNumber);
        display();
    }
}

function putDecimal() {
    if (currentNumber == 0) {;
        display();
    } else if (!isNaN(currentNumber) && currentNumber % 1 == 0) {
        currentNumber += ".";
    }
}

function selectOperation(input) {
    if (input == "+") {
        previousNumber = Number(currentNumber);
        currentNumber = 0;
        display();
    } else if (input == "-") {
        previousNumber = Number(currentNumber);
        currentNumber = 0;
        display();
    } else if (input == "*") {
        previousNumber = Number(currentNumber);
        currentNumber = 0;
        display();
    } else if (input == "/") {
        previousNumber = Number(currentNumber);
        currentNumber = 0;
        display();
    }
}

function clearAll() {
    previousNumber = 0;
    currentNumber = 0;
    display();
}

display();