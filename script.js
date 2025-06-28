'use strict';
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; // Add playing state variable at the top with other state variables
// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//Events
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `assets/images/dice/dice-${diceNumber}.png`; // FIXED: was diceValue, should be diceNumber
    // 3. Check for rolled 1: if true, switch player
    if (diceNumber !== 1) {
      // Add dice to the current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Finish the game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch player
      switchPlayer();
    }
  }
});

// Add new game initialization function
const init = function () {
  // Reset scores
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  // Remove winner class and reset active player
  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

// Add new game button event listener
btnNew.addEventListener('click', init);

// Initialize game when script loads
init();
