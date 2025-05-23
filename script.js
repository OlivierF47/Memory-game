let cardElements = document.querySelectorAll('.card');
const resGameBtn = document.getElementById("reset-game-btn");
const chronoText = document.getElementById("chronoText");
const winTxt = document.querySelector(".wintext");
const movementsTxt = document.querySelector(".movements");
const scoreText = document.querySelector(".scoretext");
const bestScoreText = document.querySelector(".bestscore");
const diff = document.querySelector(".difficulty");

let card1 = null;
let card2 = null;
let cardFlipped = false;
let loackBoard = false;

let minutes = 0;
let seconds = 0;
let timeout;
let isStopped = true;

let matchpairs = 0;
let totalPairs = 4;
let score = 0;
let movements = 0;

addEventListener("load", () => shuffle());

// Charger le meilleur score depuis localStorage
let bestScore = localStorage.getItem("bestScore") || 0;
bestScoreText.innerText = `Best Score: ${bestScore}`;

// Chronomètre
const start = () => {
  if (isStopped) {
    isStopped = false;
    passTime();
  }
};

const stop = () => {
  if (!isStopped) {
    isStopped = true;
    clearTimeout(timeout);
  }
};

const passTime = () => {
  if (isStopped) return;
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  const displaySec = seconds < 10 ? `0${seconds}` : seconds;
  const displayMin = minutes < 10 ? `0${minutes}` : minutes;
  chronoText.textContent = `${displayMin}:${displaySec}`;
  timeout = setTimeout(passTime, 1000);
};

const resetChrono = () => {
  chronoText.textContent = "00:00";
  isStopped = true;
  seconds = 0;
  minutes = 0;
  clearTimeout(timeout);
};

// Mise à jour des stats
function updateStats() {
  scoreText.innerText = `Score: ${score}`;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    bestScoreText.innerText = `Best Score: ${bestScore}`;
  }
}

// Reset complet
resGameBtn.addEventListener("click", () => {
  resetChrono();
  shuffle();
  document.querySelectorAll('.card').forEach(card => card.classList.remove('flip'));
  resetText();
  movements = 0;
  matchpairs = 0;
  loackBoard = false;
  score = 0;
  updateStats();
  movementsTxt.innerText = "";
});


// Fonction flip
function flip(card) {
  if (card.classList.contains('flip') || cardFlipped && card === card1 || loackBoard) return;

  card.classList.add('flip');

  if (!cardFlipped) {
    card1 = card;
    cardFlipped = true;
    movements++;
  } else {
    card2 = card;
    cardFlipped = false;
    loackBoard = true;
    checkMatch();
    movements++;
  }
  updateStats();
}

// Vérification de la paire
function checkMatch() {
  const img1 = card1.dataset.image;
  const img2 = card2.dataset.image;

  if (img1 !== img2) {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      card1 = null;
      card2 = null;
      loackBoard = false;
      score = Math.max(0, score - 1);
      updateStats();
    }, 1000);
  } else {
    card1 = null;
    card2 = null;
    loackBoard = false;
    matchpairs++;
    score += 10;
    updateStats();
  }

  if (matchpairs === totalPairs) {
    setTimeout(() => {
      win();
      stop();
    }, 1000);
    matchpairs = 0;
  }
}

// Mélange des cartes
function shuffle() {
  cardElements.forEach(card => {
    card.style.order = Math.floor(Math.random() * cardElements.length);
  });
}

// Lier les cartes aux événements
cardElements.forEach(card => {
  card.addEventListener('click', () => {
    flip(card);
    start();
  });
});

// Texte de victoire
function win() {
  const currentSec = seconds < 10 ? `0${seconds}` : seconds;
  const currentMin = minutes < 10 ? `0${minutes}` : minutes;

  if (diff.value === "easy") {
    if (seconds <= 15 && minutes === 0) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — You are the GOAT!`;
    } else if (seconds <= 30 && minutes === 0) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — That's very good!`;
    } else if (seconds <= 45 && minutes === 0) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — That's good enough!`;
    } else {
      winTxt.innerText = `You finished in ${currentMin}:${currentSec} — You really need to train!`;
    }
  } else {
    if (seconds <= 30 && minutes === 0) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — You are the GOAT!`;
    } else if (seconds <= 45 && minutes === 0) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — That's very good!`;
    } else if (seconds >= 0 && minutes === 1) {
      winTxt.innerText = `Well done! You win in ${currentMin}:${currentSec} — That's good enough!`;
    } else if (seconds >= 30 && minutes === 1) {
      winTxt.innerText = `You finished in ${currentMin}:${currentSec} — You really need to train!`;
    } else if (minutes >= 2) {
      winTxt.innerText = `You finished in ${currentMin}:${currentSec} — Bro... you're sleeping or what?`;
    }
  }
  movementsTxt.innerText = `Moves: ${movements / 2}`
}

// Réinitialiser le texte de victoire
function resetText() {
  winTxt.innerText = ``;
}

// Changement de difficulté
const hard = document.querySelectorAll(".hard");
const hard1 = document.querySelector("#hard1");
const hard2 = document.querySelector("#hard2");
const hard3 = document.querySelector("#hard3");
const hard4 = document.querySelector("#hard4");
const hard5 = document.querySelector("#hard5");
const hard6 = document.querySelector("#hard6");
const hard7 = document.querySelector("#hard7");
const hard8 = document.querySelector("#hard8");

diff.addEventListener("change", () => {
  diffChange();
});

function diffChange() {
  if (diff.value === "hard") {
    totalPairs = 8;
    score = 0;
    hard.forEach(card => card.classList.add("visible"));
    resetChrono();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movements = 0;
    updateStats();

    hard1.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/panther.jpg"></div></div>`;
    hard2.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/eagle.jpg"></div></div>`;
    hard3.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/elephant.jpg"></div></div>`;
    hard4.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/panther.jpg"></div></div>`;
    hard5.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/elephant.jpg"></div></div>`;
    hard6.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/giraffe.jpg"></div></div>`;
    hard7.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/giraffe.jpg"></div></div>`;
    hard8.innerHTML = `<div class="card-inner"><div class="back-card"><img src="images/question-mark.jpg"></div><div class="front-card"><img src="images/eagle.jpg"></div></div>`;

    cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
      card.addEventListener('click', () => {
        flip(card);
        start();
      });
    });

    shuffle();
  } else {
    hard.forEach(card => card.classList.remove("visible"));
    totalPairs = 4;
    score = 0;
    resetChrono();
    shuffle();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movements = 0;
    updateStats();
  }
}