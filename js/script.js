const calculator = {
    handleInput (input) {
        console.log(input);
    }
}

const clicked = document.querySelector("#calculator");
clicked.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-calc-input")) { 
    calculator.handleInput(e.target.dataset.value);
    }
})