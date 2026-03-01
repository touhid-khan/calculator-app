const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// Button Clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
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

// ✅ Keyboard Support
document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {
        display.value += key;
    }

    // Operators
    if (["+", "-", "*", "/", ".", "%"].includes(key)) {
        display.value += key;
    }

    // Enter
    if (key === "Enter") {
        calculate();
    }

    // Backspace
    if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // Escape = Clear
    if (key === "Escape") {
        display.value = "";
    }
});


// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {

    toggleBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            toggleBtn.textContent = "🌙 Dark Mode";
        } else {
            toggleBtn.textContent = "☀ Light Mode";
        }

    });

}