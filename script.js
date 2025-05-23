let cardElements = document.querySelectorAll('.card');
const resGameBtn = document.getElementById("reset-game-btn");
const chronoText = document.getElementById("chronoText");
const winTxt = document.querySelector(".wintext");


let card1 = null;
let card2 = null;
let cardFlipped = false;
let loackBoard = false;


// Chrono
let minutes = 0;
let seconds = 0;
let timeout;
let isStopped = true;
let displayMin;
let displaySec;

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

   displaySec = seconds < 10 ? `0${seconds}` : seconds;
   displayMin = minutes < 10 ? `0${minutes}` : minutes;

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

//Reset avec appel des fonctions nécessaires

resGameBtn.addEventListener("click", () => {
  resetChrono();
  shuffle();
  document.querySelectorAll('.card').forEach(card => card.classList.remove('flip'));
  resetText();
  movementsTxt.innerText = "";
  movements = 0;
  matchpairs = 0;
  loackBoard = false;
  score = 0;
  scoreText.innerText =`Score: ${score}`;
});

//Fonction flip

function flip(card) {
  if (card.classList.contains('flip') || cardFlipped && card === card1 || loackBoard) return;

  card.classList.add('flip');

  if (!cardFlipped) {
    card1 = card;
    cardFlipped = true;
  } else {
    card2 = card;
    cardFlipped = false;
    loackBoard = true;
    checkMatch();
  }
}

//Fonction checkMatch

let matchpairs = 0;
let totalPairs = 4;
let scoreText = document.querySelector(".scoretext");
function checkMatch() {
  let img1 = card1.dataset.image;
  let img2 = card2.dataset.image;
  
  if (img1 !== img2) {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      card1 = null;
      card2 = null;
      loackBoard = false;
      score = Math.max(0, score - 1);
    scoreText.innerText =`Score: ${score}`;
    }, 1000);
    
  } else {
    card1 = null;
    card2 = null;
    loackBoard = false;
    matchpairs++;
    score += 10;
    scoreText.innerText =`Score: ${score}`;
  } 
  if (matchpairs === totalPairs){
    setTimeout(() =>{
    win();
    stop();
    countMovments();
   
  },1000)
  matchpairs = 0;
  
  }
}

//Mélange des cartes 

function shuffle() {
  setTimeout(() => {
  cardElements.forEach(card => {
    card.style.order = Math.floor(Math.random() * cardElements.length);
  });
}, 1000)
}

//Event pour flip les cartes

let movements = 0;

cardElements.forEach(card => {
  card.addEventListener('click', () => {
    flip(card);
    movements++;
  });
  card.addEventListener('click', () => {
    start();
  });
});

//Function win
localStorage.setItem("bestScore", score);
let bestScore = localStorage.getItem("bestScore") || 0;
let bestText = document.getElementById("bestscore");
let score = 0;

scoreText.innerText =`Score: ${score}`;
function win(){

  // Mise à jour des minutes/secondes si nécessaire
  const currentSec = seconds < 10 ? `0${seconds}` : seconds;
  const currentMin = minutes < 10 ? `0${minutes}` : minutes;
if(diff.value === "easy"){
  if (seconds <= 15 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — You are the GOAT!`;
  } else if (seconds <= 30 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's very good!`;
  } else if (seconds <= 45 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's good enough!`;
  } else {
    winTxt.innerText = `You finished in ${currentMin} minutes : ${currentSec} seconds — You really need to train!`;
  }
}else{
  if (seconds <= 30 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — You are the GOAT!`;
  } else if (seconds <= 45 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's very good!`;
  } else if (seconds >= 0 && minutes === 1) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's good enough!`;
  } else if (seconds >= 30 && minutes === 1){
    winTxt.innerText = `You finished in ${currentMin} minutes : ${currentSec} seconds — You really need to train!`;
  } else if (minutes >= 2){
    winTxt.innerText = `You finished in ${currentMin} minutes : ${currentSec} seconds — Bro... you sleeping or what ?`
  }
}
  movementsTxt.innerText = `Moves: ${movements / 2}`;

  if(score > bestScore){
    localStorage.setItem("bestScore", score);
    bestText.innerText = bestScore;
  }
}

//Reset du texte de victoire

function resetText(){
   winTxt.innerText = ``;
} 

//Function du changement de difficulté
const hard = document.querySelectorAll(".hard")
const hard1 = document.querySelector("#hard1");
const hard2 = document.querySelector("#hard2");
const hard3 = document.querySelector("#hard3");
const hard4 = document.querySelector("#hard4");
const hard5 = document.querySelector("#hard5");
const hard6 = document.querySelector("#hard6");
const hard7 = document.querySelector("#hard7");
const hard8 = document.querySelector("#hard8");
const diff = document.querySelector(".difficulty");

diff.addEventListener("change",(e) => {
  diffChange();
});

function diffChange(){
  if(diff.value === "hard"){
    totalPairs = 8;
    score = 0;
    hard.forEach(card => card.classList.add("visible"));
    resetChrono();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movementsTxt.innerText = "";
    movements = 0;
    hard1.innerHTML = `
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/panther.jpg"></div>
        </div>`
    hard2.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/eagle.jpg"></div>
        </div>`
      hard3.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/elephant.jpg"></div>
        </div>`
      hard4.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/panther.jpg"></div>
        </div>
    `
      hard5.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/elephant.jpg"></div>
        </div>`
      hard6.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/giraffe.jpg"></div>
        </div>`
      hard7.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/giraffe.jpg"></div>
        </div>`
      hard8.innerHTML=`
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/eagle.jpg"></div>
        </div>
      `
    
    cardElements = document.querySelectorAll('.card');
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        flip(card);
      });
      card.addEventListener('click', () => {
        start();
      });
    });
    shuffle();
  }else{
    hard.forEach(card => card.classList.remove("visible"));
    totalPairs = 4;
    score = 0;
    resetChrono();
    shuffle();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movementsTxt.innerText = "";
    movements = 0;
  }
}

let movementsTxt = document.querySelector(".movements");





