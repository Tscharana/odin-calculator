const calculator = {
    handleInput (input) {
        console.log(input);
    }
}

const clicked = document.querySelector("#calculator");
clicked.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") { 
    calculator.handleInput(e.target.textContent);
    }
})