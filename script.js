const clickSound = new Audio();
clickSound.src = "/Audio/click.wav";
clickSound.preload = "auto";

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}


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

    else if (value === "⌫") {
        display.value = display.value.slice(0, -1);
    }

    else {
        display.value += value;
    }

    playSound();
}

const historyContainer = document.getElementById("history");

function calculate() {
    try {
        const expression = display.value;

        if (!expression) return;

        // Only allow safe characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        const result = Function('"use strict";return (' + expression + ')')();

        if (!isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Add to history
        const historyItem = document.createElement("div");
        historyItem.textContent = `${expression} = ${result}`;
        historyContainer.appendChild(historyItem);

        historyContainer.scrollTop = historyContainer.scrollHeight;

        display.value = result;
        display.classList.add("result-animate");
        setTimeout(() => {
            display.classList.remove("result-animate");
        }, 300);

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