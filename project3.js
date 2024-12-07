document.addEventListener("DOMContentLoaded", () => {
    const maxDigits = 3;
    const keyDisplay = document.getElementById("key");
    const guessDisplay = document.getElementById("guess");
    const tbodyStat = document.getElementById("tbody-stat");
    const digitButtons = document.querySelectorAll(".digit");
    const newButton = document.getElementById("new");

    const game = new BaseballGame(maxDigits);

    function updateKeyDisplay() {
        keyDisplay.textContent = game.secretKey.join(", ");
    }

    function updateGuessDisplay() {
        guessDisplay.textContent = game.currentGuess.join(", ");
    }

    function updateStatsTable(balls, strikes) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${game.currentGuess.join(", ")}</td>
            <td>${balls}</td>
            <td>${strikes}</td>
        `;
        tbodyStat.appendChild(row);
    }

    function checkGuess() {
        const { strikes, balls } = game.checkGuess();

        updateStatsTable(balls, strikes);

        if (strikes === maxDigits) {
            endGame(true);
            alert("Strike Out ---\nThe Key was " + game.secretKey.join(", ") + "\n<New> to play again");
        } else {
            game.currentGuess = [];
            updateGuessDisplay();

            digitButtons.forEach(button => {
                button.disabled = false;
                button.classList.remove("disabled"); 
            });
        }
    }
    function endGame(isWin = false) {
        digitButtons.forEach(button => {
            button.disabled = true;
            button.classList.add("disabled");
        });

        newButton.disabled = false;
    }

    function newGame() {
        game.newGame();
        updateKeyDisplay();
        updateGuessDisplay();
        tbodyStat.innerHTML = "";

        digitButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove("disabled"); 
        });
    }

    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            const digit = Number(button.textContent);

            if (game.addToGuess(digit)) {
                updateGuessDisplay();
                button.disabled = true; 
                button.classList.add("disabled"); 

                checkGuess();
            } else {
                updateGuessDisplay(); 
            }
        });
    });

    newButton.addEventListener("click", newGame);

    newGame();
});
