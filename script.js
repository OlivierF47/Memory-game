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
    }, 1000);
  } else {
    card1 = null;
    card2 = null;
    loackBoard = false;
    matchpairs++;

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
  cardElements.forEach(card => {
    card.style.order = Math.floor(Math.random() * cardElements.length);
  });
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

function win(){
  // Mise à jour des minutes/secondes si nécessaire
  const currentSec = seconds < 10 ? `0${seconds}` : seconds;
  const currentMin = minutes < 10 ? `0${minutes}` : minutes;

  if (seconds <= 15 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — You are the GOAT!`;
  } else if (seconds <= 30 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's very good!`;
  } else if (seconds <= 45 && minutes === 0) {
    winTxt.innerText = `Well done! You win in ${currentMin} minutes : ${currentSec} seconds — That's good enough!`;
  } else {
    winTxt.innerText = `You finished in ${currentMin} minutes : ${currentSec} seconds — You really need to train!`;
  }

  movementsTxt.innerText = `Moves: ${movements / 2}`;
}

//Reset du texte de victoire

function resetText(){
   winTxt.innerText = ``;
} 

//Function du changement de difficulté

const hard = document.querySelector("#hard");
const diff = document.querySelector(".difficulty");

diff.addEventListener("change",(e) => {
  diffChange();
});

function diffChange(){
  if(diff.value === "hard"){
    totalPairs = 8;
    resetChrono();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movementsTxt.innerText = "";
    movements = 0;
    hard.innerHTML = `<div class="row">
      <div class="card" data-image="panther">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/panther.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="eagle">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/eagle.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="elephant">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/elephant.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="panther">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/panther.jpg"></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card" data-image="elephant">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/elephant.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="giraffe">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/giraffe.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="giraffe">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/giraffe.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="eagle">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/eagle.jpg"></div>
        </div>
      </div>
    </div>
`
    cardElements = document.querySelectorAll('.card');
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        flip(card);
        movements++;
      });
      card.addEventListener('click', () => {
        start();
      });
    });
    shuffle();
  }else{
    totalPairs = 4;
    hard.innerHTML = ``;
    resetChrono();
    shuffle();
    cardElements.forEach(card => card.classList.remove('flip'));
    resetText();
    movementsTxt.innerText = "";
    movements = 0;
  }
}

let movementsTxt = document.querySelector(".movements");





