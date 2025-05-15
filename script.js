const back = document.getElementsByClassName('back-card');
const front = document.getElementsByClassName('front-card');
const card = document.querySelectorAll('.card');
let chrono = document.getElementsByClassName('chronometre');
const resBtn = document.getElementsById('reset-game-btn');


let card1;
let card2; 
let cardFlipped = false;



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

card.addEventListener("click", flip)
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