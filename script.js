const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            updateDisplay();

        } else if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();

        } else if (value === "%") {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();

        } else if (value === "x²") {
            currentInput = (parseFloat(currentInput) ** 2).toString();
            updateDisplay();

        } else if (value === "√") {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
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


const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});