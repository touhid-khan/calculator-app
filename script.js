const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            updateDisplay();
        } else if (value === "=") {
            calculateResult();
        } else {
            currentInput += value;
            updateDisplay();
        }
    });
});

function updateDisplay() {
    display.value = currentInput;
}

function calculateResult() {
    try {
        currentInput = Function('"use strict";return (' + currentInput + ')')();
        updateDisplay();
    } catch {
        display.value = "Error";
        currentInput = "";
    }
}