const cardElements = document.querySelectorAll('.card');
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const resGameBtn = document.getElementById("reset-game-btn");
const chronoText = document.getElementById("chronoText");
const winTxt = document.querySelector(".wintext");


let card1 = null;
let card2 = null;
let cardFlipped = false;

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

resGameBtn.addEventListener("click", () => {
  resetChrono();
  shuffle();
  cardElements.forEach(card => card.classList.remove('flip'));
  resetText();
  movementsTxt.innerText = "";
  movements = 0;
});

function flip(card) {
  if (card.classList.contains('flip') || cardFlipped && card === card1) return;

  card.classList.add('flip');

  if (!cardFlipped) {
    card1 = card;
    cardFlipped = true;
  } else {
    card2 = card;
    cardFlipped = false;
    checkMatch();
  }
}

let matchpairs = 0;

function checkMatch() {
  let img1 = card1.dataset.image;
  let img2 = card2.dataset.image;
  
  if (img1 !== img2) {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      card1 = null;
      card2 = null;
    }, 1000);
  } else {
    card1 = null;
    card2 = null;
    matchpairs++;
  } 
  if (matchpairs === 4){
    setTimeout(() =>{
    win();
    stop();
    countMovments();
  },1000)
  matchpairs = 0;
  
  }
}



function shuffle() {
  cardElements.forEach(card => {
    card.style.order = Math.floor(Math.random() * cardElements.length);
  });
}

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

function win(){
  if(displaySec <= 15){
    winTxt.innerText = `Well done you win in ${displayMin} : ${displaySec} you are the goat`
     ;}else if (displaySec <= 30){
       winTxt.innerText = `Well done you win in ${displayMin} : ${displaySec} that's very good`
     }else if (displaySec <=45){
       winTxt.innerText = `Well done you win in ${displayMin} : ${displaySec} that's good enough`
     }else if (displayMin >= 1){
      winTxt.innerText = `You finish in ${displayMin} : ${displaySec} you really need to train`
     }

     movementsTxt.innerText = `moves: ${movements / 2}`
}
function resetText(){
   winTxt.innerText = ``;
}
const hard = document.querySelector("#hard");
const diff = document.querySelector(".difficulty");

diff.addEventListener("change",(e) => {
  diffChange();
});

function diffChange(){
  if(diff.value === "hard"){
    resetChrono();
  shuffle();
  cardElements.forEach(card => card.classList.remove('flip'));
  resetText();
  movementsTxt.innerText = "";
  movements = 0;
    hard.innerHTML = `<div class="row">
      <div class="card" data-image="cat">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/cat.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="bear">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/bear.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="lion">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/lion.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="bear">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/bear.jpg"></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card" data-image="dogs">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/dogs.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="cat">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/cat.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="lion">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/lion.jpg"></div>
        </div>
      </div>
      <div class="card" data-image="dogs">
        <div class="card-inner">
          <div class="back-card"><img src="images/question-mark.jpg"></div>
          <div class="front-card"><img src="images/dogs.jpg"></div>
        </div>
      </div>
    </div>
`
 document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        flip(card);
        movements++;
      });
      card.addEventListener('click', () => {
        start();
      });
    });

  }else{
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





