const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.textContent));
});

function handleInput(value) {

    if (value === "=") {
        calculate();
    }

    else if (value === "C") {
        display.value = "";
    }

    else {
        display.value += value;
    }
}

function calculate() {
    try {
        display.value = Function('"use strict";return (' + display.value + ')')();
    } catch {
        display.value = "Error";
    }
}

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        toggleBtn.textContent = "🌙 Dark Mode";
    } else {
        toggleBtn.textContent = "☀ Light Mode";
    }
});