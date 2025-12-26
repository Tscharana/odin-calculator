const calculator = {
    firstValue: null,
    firstOperator: null,
    secondValue: null,
    secondOperator: null,
    waitingForSecondValue: false,

    allowedNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    allowedOperators: ["+", "-", "*", "/", "="],
    allowedFunctions: ["CLEAR"],

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
            if (this.firstValue === null) {
                this.firstValue = number;
            } else {
                this.firstValue += number;
            }
        }
        console.log("FirstValue is " + this.firstValue);
    },

        processOperator (operator) {
        console.log("Operator recieved: " + operator + ".");
    },

    processFunction (func) {
        console.log("Function key recieved: " + func + ".");
    },

}

const clicked = document.querySelector("#calculator");
clicked.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-calc-input")) { 
    calculator.handleInput(e.target.dataset.value);
    }
})