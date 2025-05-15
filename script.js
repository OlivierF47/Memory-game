const back = document.getElementsByClassName('back-card');
const front = document.getElementsByClassName('front-card');
const card = document.querySelectorAll('.card');
let chrono = document.getElementsByClassName('chronometre');
const resBtn = document.getElementsById('reset-game-btn');

let card1;
let card2; 

function shuffle() {
  card.forEach(cards => {
    let ramdomPos = Math.floor(Math.random() * 8);
    card.style.order = ramdomPos;
  });
}

function flip(card){
    card.classList.add('flip');
}


function isSame(){
    if (card1.data.image === card2.data.image){
        return;
    }else{
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        return;
    }
}

function win(){
   alert("Well done you win the game");
}
 
function reset(){
    if (card.forEach(cards => card.classList = 'flip')){
        card.classList.remove('flip');
    }
    shuffle();
    
}

card.addEventListener("click", flip)
resBtn.addEventListener("click", reset);