'use strict'
////////// Description //////////



////////// Elements //////////
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const curScoreEl0 = document.getElementById('current--0');
const curScoreEl1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnElNew = document.querySelector('.btn--new');
const btnElRoll = document.querySelector('.btn--roll');
const btnElHold = document.querySelector('.btn--hold');

diceEl.classList.add('hidden');

let activePlayer = 0;
let score, curScore, isPlaying;


////////// Function //////////
const init = function() {
    btnElNew.disabled = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    curScoreEl0.textContent = 0;
    curScoreEl1.textContent = 0;

    score = [0, 0];
    curScore = 0;
    isPlaying = true;
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    curScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

const setWinner = function() {
    document.querySelector(`.player--${activePlayer}`).classList.toggle(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.toggle(`player--active`);
};

////////// Handlers //////////
// Roll dice
btnElRoll.addEventListener('click', function() {
    if(isPlaying) {
        const randomNum = Math.floor(Math.random() * 6 + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${randomNum}.png`;

        if(randomNum !== 1) {
            curScore += randomNum;
            document.getElementById(`current--${activePlayer}`).textContent = curScore;
        };

        if(randomNum === 1) switchPlayer();
    }
});

// Hold score
btnElHold.addEventListener('click', function() {
    if(isPlaying) {
        score[`${activePlayer}`] += curScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[`${activePlayer}`];
    }


    if(score[`${activePlayer}`] >= 100) {
        isPlaying = false;
        diceEl.classList.add('hidden');
        setWinner();
        btnElNew.disabled = false;
    } else {
        switchPlayer();
    }

});

// Reset game
btnElNew.addEventListener('click', function() {
    setWinner();
    init();
});
