const back = document.getElementsByClassName('back-card');
const front = document.getElementsByClassName('front-card');
const card = document.querySelectorAll('.card');
let chrono = document.getElementsByClassName('chronometre');
const resBtn = document.getElementById('reset-game-btn');
const chronoText = document.getElementById("chronoText");


<<<<<<< HEAD
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");



let card1;
let card2; 
let cardFlipped = false;

//chrono
let minutes = 0;
let seconds = 0;
let timeout;
let isStopped = true;

const start = () => {
  if(isStopped) {
    isStopped = false;
    passTime();
  }
};

=======
>>>>>>> 1488775868cc9df55f4029364e88b8bbbc7d03d7
const stop = () => {
  if(!isStopped) {
    isStopped = true;
    clearTimeout(timeout);
  }
}

const passTime = () => {
  if(isStopped) {
    return;
  }
  seconds = parseInt(seconds);
  minutes = parseInt(minutes);
  
  seconds++;
  if(seconds === 60) {
    minutes++;
    seconds = 0;
  }

  if(minutes === 60) {
    minutes = 0;
  }

  //affichage 
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  chronoText.textContent = `${minutes}:${seconds}`;
  timeout = setTimeout(passTime, 1000);
}

const reset = () => {
  chronoText.textContent = `00:00`;
  isStopped = true;
  seconds = 0;
  minutes = 0;
  clearTimeout(timeout);
}
<<<<<<< HEAD
//le bouton start sera remplacé par un addEvent(click) sur une image
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resBtn.addEventListener("click", reset); // quand on resetera une game, le chrono sera reset aussi
//fin chrono
=======

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

>>>>>>> 1488775868cc9df55f4029364e88b8bbbc7d03d7

function shuffle() {
  card.forEach(cards => {
    let ramdomPos = Math.floor(Math.random() * 8);
    card.style.order = ramdomPos;
  });
}

function flip(card){
    cardFlipped = true;
    card.classList.add('flip');
}

<<<<<<< HEAD
card.addEventListener("click", flip);
=======
card.addEventListener("click", flip)
>>>>>>> 1488775868cc9df55f4029364e88b8bbbc7d03d7
resBtn.addEventListener("click", shuffle);

function isSame(){
    if (card1.className = card2.className){
        return;
    }else{
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        return;
    }

}