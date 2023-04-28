// What the script does: Creating a simple game for the user to play.

// Game Description:
// Creating a Game with a character, block, platform, and a score.
// Character is left of the screen and the block is right of the screen.
// The block is moving towards the character.
// The character goal is to jump over a block moving towards them.
// If the character accomplishes this, the score increases by 1.
// If the character touches the block, the game ends.
// By pressing space bar the character can jump.
// By pressing R the game can be restarted.


// Creating the character, block, best score, and score variables.
const character = document.querySelector("[data-character]");
const block = document.querySelector("[data-block]");
let bestScore = document.querySelector("[data-best-score]");
let currentScore = document.querySelector("[data-score]");
const highScoreText = document.getElementById("highScoreText");
const currentScoreText = document.getElementById("currentScoreText");
let score = 0;
let highScore = 0;
const gameOver = document.getElementById("gameOver");
// Initializing the game.
blockJumpGame();
function blockJumpGame() {
    // Character functions.
    characterFunctionality();
    // Check if the character is touching the block.
    checkIsCharacterTouchingBlock();
    // Increase the score by 100 every second.
    increaseScore();
    // Load the high score.
    loadHighScore();

    // Create a function to give the player the ability to control the character.
    function characterFunctionality() {
        // An event listener for the space bar to add then remove the animate class.
        document.addEventListener('keydown', e => {
            if (e.key === ' ' && !character.classList.contains("animate")) {
                character.classList.add("animate");
                setTimeout(function(){
                    character.classList.remove("animate");
                },500);
            }
        });
    };
    // Create a function to check if the character is touching the block.
    function checkIsCharacterTouchingBlock() {
        // An interval to check if the character is touching the block.
        setInterval(function(){
            // Getting the character and block position.
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            // Checking if the character is touching the block.
            if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
                // Set the score to the high score if the score is higher than the high score.
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("highScore", highScore);
                }
                // If the character is touching the block, the game ends.
                gameOverFunctionality();
            }
        }, 10);
    };
    // Create a function to increae the score 100 every second.
    function increaseScore() {
        setInterval(function(){
            score += 100;
            currentScore.innerText = score;
        }, 1000);
    }
    // Create a function to load the high score.
    function loadHighScore(){
        // Check if the high score is in the local storage.
        if (localStorage.getItem("highScore") !== null) {
            highScore = localStorage.getItem("highScore");
            bestScore.innerText = highScore;
        }
    }
    // Create a function to display with GAME OVER and allow the user to restart the game by pressing R.
    function gameOverFunctionality() {
        // Display GAME OVER by removing hide class from gameOver.
        gameOver.classList.remove("hide");
        // Remove the character and block from the screen.
        character.style.display = "none";
        block.style.display = "none";
        // Hide the current score
        currentScoreText.classList.add("hide");
        // Stop the score from increasing.
        clearInterval(increaseScore);
        // Center the GAME OVER and highScoreText text.
        gameOver.classList.add("centerText");
        highScoreText.classList.add("centerText");
        // Allow the user to restart the game by pressing R.
        document.addEventListener('keydown', e => {
            if (e.key === 'r') {
                location.reload();
            }
        });
    }
}