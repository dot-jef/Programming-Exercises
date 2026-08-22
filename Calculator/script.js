
let currentNumberDisplay = document.getElementById("currentNumberDisplay");
let previousNumberDisplay = document.getElementById("previousNumberDisplay");
let operationDisplay = document.getElementById("operationDisplay");
let previousNumber;
let currentNumber = "0";
let operation;

function display() {
    previousNumberDisplay.textContent = previousNumber;
    currentNumberDisplay.textContent = currentNumber;
    operationDisplay.textContent = operation;
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
    } else if (!isNaN(currentNumber) && currentNumber % 1 == 0 && !String(currentNumber).includes('.')) {
        currentNumber += ".";
    }
}

function selectOperation(input) {
    previousNumber = Number(currentNumber);
    currentNumber = 0;
    operation = input;
    display();
}

function clearAll() {
    previousNumber = null;
    currentNumber = "0";
    operation = null;
    display();
}

function calculate() {
    switch (operation) {
        case '+':
            currentNumber = previousNumber + Number(currentNumber);
            break;
        case "-":
            currentNumber = previousNumber - Number(currentNumber);
            break;
        case "*":
            currentNumber = previousNumber * Number(currentNumber);
            break;
        case "/":
            currentNumber = previousNumber / Number(currentNumber);
            break;
    }
    previousNumber = null;
    operation = "=";
    display();
}

display();