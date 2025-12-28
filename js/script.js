const calculator = {
    firstValue: null,
    firstOperator: null,
    secondValue: null,
    waitingForSecondValue: false,
    isResultShown: false,

    allowedNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    allowedOperators: ["+", "-", "*", "/", "="],
    allowedFunctions: ["CLEAR", "Backspace"],

    handleInput (input) {
        if (this.allowedNumbers.includes(input)) {
            this.processNumber(input);
        } else if (this.allowedOperators.includes(input)) {
            this.processOperator(input);
        } else if (this.allowedFunctions.includes(input)) {
            this.processFunction(input);
        }
    },

    processNumber (number) {
        console.log("Number recieved: " + number + ".");
        if (this.waitingForSecondValue === false) {
            if (number === "." && this.firstValue && this.firstValue.includes(".")) {
                return;
            } else if (this.firstValue === null || this.isResultShown === true) {
                this.firstValue = number;
                this.isResultShown = false;
            } else {
                this.firstValue += number;
            }
        } else {
            if (number === "." && this.secondValue && this.secondValue.includes(".")) {
                return;
            } else if (this.secondValue === null) {
                this.secondValue = number;
            } else {
                this.secondValue += number;
            }
        }
        console.log("firstValue is " + this.firstValue);
        console.log("secondValue is " + this.secondValue);
    },

    processOperator (operator) {
        console.log("Operator recieved: " + operator + ".");
        if (this.firstValue !== null) {
            if (this.secondValue === null && operator === "=") {
                return;
            } else if (this.secondValue === null) {
                this.firstOperator = operator;
            } else {
                this.firstValue = this.calculate().toString();
                if (operator !== "=") {
                    this.firstOperator = operator;
                } else {
                    this.firstOperator = null;
                    this.waitingForSecondValue = false;
                    this.isResultShown = true;
                }
                console.log("New firstValue is " + this.firstValue);
            }
            if (operator !== "=") {
                this.waitingForSecondValue = true;
            }
        }
        console.log("firstOperator is " + this.firstOperator);
        console.log("waitingForSecondValue is " + this.waitingForSecondValue);
    },

    processFunction (func) {
        console.log("Function key recieved: " + func + ".");
        if (func === "CLEAR") {
            this.firstValue = "0";
            this.firstOperator = null;
            this.secondValue = null;
            this.waitingForSecondValue = false;
            this.isResultShown = true;
            console.log("Calculator reset.")
        }
        if (func === "Backspace") {
            if (this.isResultShown === true) {
                this.processFunction("CLEAR");
            } else if (this.secondValue !== null) {
                this.secondValue = this.secondValue.slice(0, -1);
                if (this.secondValue === "") {
                    this.secondValue = null;
                }
            } else if (this.firstOperator !== null) {
                this.firstOperator = null;
                this.waitingForSecondValue = false;
            } else if (this.firstValue !== null) {
                this.firstValue = this.firstValue.slice(0, -1);
                if (this.firstValue === "") {
                    this.firstValue = null;
                }
            }
        }
    },

    calculate () {
        console.log("Calculation started.");
        let result = 0;
        if (this.firstOperator === "+") {
            result = parseFloat(this.firstValue) + parseFloat(this.secondValue);
        } else if (this.firstOperator === "-") {
            result = parseFloat(this.firstValue) - parseFloat(this.secondValue);
        } else if (this.firstOperator === "*") {
            result = parseFloat(this.firstValue) * parseFloat(this.secondValue);
        } else if (this.firstOperator === "/" && this.secondValue === "0") {
            result = "Error. Division by 0.";
        } else if (this.firstOperator === "/" ) {
            result = parseFloat(this.firstValue) / parseFloat(this.secondValue);
        }
        this.secondValue = null;
        return result;
    }

}

const clicked = document.querySelector("#calculator");
const output = document.querySelector("#output");
const outputCalc = document.querySelector("#output-calculation");

clicked.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-calc-input")) { 
        calculator.handleInput(e.target.dataset.value);
        updateOutput();
    }
})

window.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Enter") {key = "="};
    if (key === "Escape") {key = "CLEAR"};
    if (key === ",") {key = "."};
    if (calculator.allowedNumbers.includes(key) || calculator.allowedOperators.includes(key) || calculator.allowedFunctions.includes(key)) {
        calculator.handleInput(key);
        updateOutput();
    }
})

function updateOutput () {
    if (calculator.waitingForSecondValue === false || calculator.secondValue === null) {
        output.textContent = calculator.firstValue;
        if (calculator.firstOperator === null) {
            outputCalc.textContent = calculator.firstValue;
        } else {
            outputCalc.textContent = calculator.firstValue + " " + calculator.firstOperator;
        }
    } else {
        output.textContent = calculator.secondValue;
        outputCalc.textContent = calculator.firstValue + " " + calculator.firstOperator + " " + calculator.secondValue;
    }
}