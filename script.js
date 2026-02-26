const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function calculate(value) {
    if (value === "C") {
        display.value = "";
    } else if (value === "=") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    } else {
        display.value += value;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        calculate(button.textContent);
    });
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if ("0123456789+-*/.".includes(key)) {
        display.value += key;
    } else if (key === "Enter") {
        display.value = eval(display.value);
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
});