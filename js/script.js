const calculator = {
    firstValue: null,
    firstOperator: null,
    secondValue: null,
    secondOperator: null,

    allowedNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    allowedOperators: ["+", "-", "*", "/", "="],

    handleInput (input) {
        if (this.allowedNumbers.includes(input)) {
            this.processNumber(input);
        } else if (this.allowedOperators.includes(input)) {
            this.processOperator(input);
        }
    },
    processNumber (number) {
    console.log("Number recieved: " + number);
    },

    processOperator (operator) {
    console.log("Operator recieved: " + operator);
    },

}

const clicked = document.querySelector("#calculator");
clicked.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-calc-input")) { 
    calculator.handleInput(e.target.dataset.value);
    }
})