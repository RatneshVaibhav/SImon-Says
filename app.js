const h2 = document.querySelector('h2');
const h3 = document.querySelector('.H3');
let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let randColor = ['red', 'green', 'orange', 'purple'];
let prevLevel = 0;
let userAllowedToClick = false; // Flag to control user clicks during sequence display

// Load highest score from localStorage or initialize it to 0
let highestScore = localStorage.getItem('highestScore') ? parseInt(localStorage.getItem('highestScore')) : 0;
h3.innerText = `Highest Score: ${highestScore}`;

// Start the game on any key press
document.addEventListener('keypress', function () {
  if (!started) {
   highestScore= 0;
    started = true;
    levelUp();
  }
});

// Flash a button visually
function flash(btn) {
  btn.classList.add('flash');
  setTimeout(function () {
    btn.classList.remove('flash');
  }, 250);
}

// Add a random color to the sequence and update the display
function levelUp() {
  userseq = []; // Reset the user sequence
  h2.innerText = `Level ${level}`;
  userAllowedToClick = false; // Disable user clicks during sequence play

  let randInd = Math.floor(Math.random() * randColor.length); // Get a random color index
  let randCol = randColor[randInd];
  let randBtn = document.querySelector(`.${randCol}`);
  flash(randBtn);

  gameseq.push(randCol); // Add to the game sequence
  setTimeout(() => {
    userAllowedToClick = true; // Allow user clicks after the sequence finishes
  }, 1000);
}

// Check the user's sequence input against the game sequence
function checkSeq(n) {
  if (gameseq[n] === userseq[n]) {
    if (n === gameseq.length - 1) {
      level++; // User completed the sequence correctly
      if (level > highestScore) {
        highestScore = level; // Update highest score if necessary
        localStorage.setItem('highestScore', highestScore);
      }
      setTimeout(levelUp, 1000); // Move to next level
    }
  } else {
    gameOver(); // If user sequence is wrong, game over
  }
}

// Handle the Game Over state
function gameOver() {
  h2.innerText = 'Game Over! Press any key to start a new game';
  started = false;
  if (level > highestScore) {
    highestScore = level;
    localStorage.setItem('highestScore', highestScore); // Save highest score to localStorage
  }
  h3.innerText = `Highest Score: ${highestScore}`;
  level = 0;
  gameseq = [];
  userseq = [];
}

// Handle the button click by the user
function btnClicked() {
  if (!userAllowedToClick) return; // Ignore clicks if the user is not allowed to interact

  let btn = this;
  flash(btn);
  let allClasses = Array.from(btn.classList);
  let col = allClasses[1]; // Extract the color from the button class
  userseq.push(col);
  checkSeq(userseq.length - 1); // Check if the sequence is correct
}

// Set up event listeners for each button
let btns = document.querySelectorAll('.box');
for (let btn of btns) {
  btn.addEventListener('click', btnClicked);
}
