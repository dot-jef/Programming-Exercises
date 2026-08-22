
let result = document.getElementById("result");
let number = Math.floor(Math.random() * 100) + 1;
let attemptsCount = 0;
let guessNumber = document.getElementById("guessNumber");
const resetButton = document.getElementById("resetButton");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
    if (guessNumber.value != 0) {
        attemptsCount++;
        document.getElementById("attemptsCount").textContent = attemptsCount;
        if (guessNumber.value > number) {
            result.textContent = "Too High";
        } else if (guessNumber.value < number) {
            result.textContent = "Too Low";
        } else {
            result.textContent = "Correct!";
            submitButton.classList.toggle("hidden");
            guessNumber.classList.toggle("hidden");
        }
    }
});

resetButton.addEventListener("click", () => {
    result.textContent = "Start Guessing";
    number = Math.floor(Math.random() * 10) + 1
    submitButton.classList.remove("hidden");
    guessNumber.classList.remove("hidden");
    guessNumber.value = 0;
    attemptsCount = 0;
    document.getElementById("attemptsCount").textContent = attemptsCount;
});


console.log(number);