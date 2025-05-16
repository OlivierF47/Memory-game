const cardElements = document.querySelectorAll('.card');
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const resGameBtn = document.getElementById("reset-game-btn");
const chronoText = document.getElementById("chronoText");

let card1 = null;
let card2 = null;
let cardFlipped = false;

// Chrono
let minutes = 0;
let seconds = 0;
let timeout;
let isStopped = true;

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

  let displaySec = seconds < 10 ? `0${seconds}` : seconds;
  let displayMin = minutes < 10 ? `0${minutes}` : minutes;

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

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", resetChrono);
resGameBtn.addEventListener("click", () => {
  resetChrono();
  shuffle();
  cardElements.forEach(card => card.classList.remove('flip'));
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
  },1000)
  matchpairs = 0;
  }
}

function shuffle() {
  cardElements.forEach(card => {
    card.style.order = Math.floor(Math.random() * cardElements.length);
  });
}

cardElements.forEach(card => {
  card.addEventListener('click', () => flip(card));
});

function win(){
    alert(``);
}