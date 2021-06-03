const cards = document.querySelectorAll('.card');
const aboutModalRef = document.querySelector(".main__start__modal-about");
const openAboutModalBtn = document.querySelector(".burger");
const closeAboutModalBtn = document.querySelector(".modal-about__wrapper-btn");
const coupAudioRef = document.querySelector(".card_coup");
const matchAudioRef = document.querySelector(".card_match");
const notMatchAudioRef = document.querySelector(".card_not_match");
const bgAudioRef = document.querySelector(".bg-music");
const rangeRef = document.querySelector(".input_sound");
const loseModal = document.querySelector(".main__start__modal-window-lose");
const selectLoseDifficult = document.querySelector(".modal-window__wrapper-select-lose");
const restartLoseBtn = document.querySelector(".modal-window__wrapper-btn-lose");
const winModal = document.querySelector(".main__start__modal-window-win");
const winModalBtn = document.querySelector(".modal-window__wrapper-btn-win");
const winModalSelect = document.querySelector(".modal-window__wrapper-select-win");
const startModalRef = document.querySelector(".main__start__modal-window");
const startModalSelectRef = document.querySelector(".modal-window__wrapper-select");
const startModalBtn = document.querySelector(".modal-window__wrapper-btn");
const timeSound = document.querySelector(".time-is-up");
const winSound = document.querySelector(".win");


startModalRef.classList.add("show_modal");
let x = 200;
let diff1 = startModalSelectRef.value;
startModalSelectRef.addEventListener("change", ()=>{
  diff1 = startModalSelectRef.value;
});

startModalBtn.addEventListener("click", ()=>{
  startModalRef.classList.remove("show_modal");
  countdown();
  if(diff1 === "Easy"){
    x = 300;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  
  else if(diff1 === "Normal"){
    x = 200;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
    cards.forEach(elem => {if(elem.dataset.card > 8){
        elem.classList.add("card3")}});
  }
  else if(diff1 === "15 second"){
    x = 15;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  else{
    x = 100;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
  }
});

selectLoseDifficult.addEventListener("input", () => {
  
  diff1 = selectLoseDifficult.value;
  if(diff1 === "Easy" ){
    x = 300;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  
  else if(diff1 === "Normal"){
    x = 200;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
    cards.forEach(elem => {if(elem.dataset.card > 8){
        elem.classList.add("card3")}});
  }

  else if(diff1 === "15 second"){
    x = 15;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }

  else{
    x = 100;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
  }
  
});

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let counter = 0;
let winCards = 0;

const changeVolume = () =>{
  bgAudioRef.volume = rangeRef.value / 100;
};

const flipCard = function() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  coupAudioRef.play();
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.style.cursor = "initial";
    coupAudioRef.play();
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  secondCard.style.cursor = "initial";
  checkForMatch();
}

const checkForMatch = function() {
  if (firstCard.dataset.card === secondCard.dataset.card) {

    disableCards();
    return;
  }

  unflipCards();
}

const disableCards = function() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.style.cursor = "initial";
  secondCard.style.cursor = "initial";
  counter++;
  winCards++;
  
  if(diff1 === "Easy"){
    if(winCards === 5){
      winModal.classList.add("show_modal");
      clearTimeout(timer);
      winSound.play();
    }
  }
  
  else if(diff1 === "Normal"){
    if(winCards === 8){
      winModal.classList.add("show_modal");
      clearTimeout(timer);
      winSound.play();
    }
  }
  else if(diff1 === "15 second"){
    if(winCards === 5){
      winModal.classList.add("show_modal");
      clearTimeout(timer);
      winSound.play();
    }
  }
  else {
    if(winCards === 11){
      winModal.classList.add("show_modal");
      clearTimeout(timer);
      winSound.play();
    }
  };
  resetBoard();
  setTimeout(()=>{matchAudioRef.play()}, 1000);
}

const unflipCards = function() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.style.cursor = "pointer";
    secondCard.style.cursor = "pointer";
    resetBoard();
    notMatchAudioRef.play();
  }, 1000);
};

const resetBoard = function() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  // cards.forEach(elem => elem.style.pointerEvents = "unset");
};

(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 15);
    card.style.order = randomPosition;
    bgAudioRef.play();
  });
}());

const openAboutModal = ()=>{
  window.addEventListener('keydown', onPressEscape);
  aboutModalRef.classList.add('show_modal');
  clearTimeout(timer);
}

const onAboutCloseModal = function() {
  window.removeEventListener('keydown', onPressEscape);
  aboutModalRef.classList.remove('show_modal');
  timer = setTimeout(countdown, 1000);
};

const onAboutBackdropClick = function(event) {
  if(event.target === event.currentTarget) {
      onAboutCloseModal();
  }
};
const onAboutCloseClick = function(event) {
  if(event.target === event.currentTarget) {
      onAboutCloseModal();
  }
};
function onPressEscape(event){
  if(event.code === 'Escape'){
      onAboutCloseModal();
  }
};

let timer;

const closeRestartModal = ()=>{
  loseModal.classList.remove('show_modal');
  resetBoard();
  diff1 = selectLoseDifficult.value;
  if(diff1 === "Easy"){
    x = 300;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  
  else if(diff1 === "Normal"){
    x = 200;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
    cards.forEach(elem => {if(elem.dataset.card > 8){
        elem.classList.add("card3")}});
  }
  else if(diff1 === "15 second"){
    x = 15;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  else{
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
    x = 100;
  };
  cards.forEach(card => {card.addEventListener('click', flipCard)
  card.style.cursor = "pointer"});
  countdown();
  cards.forEach(elem => elem.classList.remove("flip"));
  (function shuffle() {
    cards.forEach(card => {
      let randomPosition = Math.floor(Math.random() * 15);
      card.style.order = randomPosition;
      bgAudioRef.play();
    });
  }());

};

const closeWinRestartModal = ()=>{
  winModal.classList.remove('show_modal');
  resetBoard();
  diff1 = winModalSelect.value;
  if(diff1 === "Easy"){
    x = 300;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }
  
  else if(diff1 === "Normal"){
    x = 200;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
    cards.forEach(elem => {if(elem.dataset.card > 8){
        elem.classList.add("card3")}});
  }
  else if(diff1 === "15 second"){
    x = 15;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.add("card3")}});
  }

  else{
    x = 100;
    cards.forEach(elem => {if(elem.dataset.card > 5){
      elem.classList.remove("card3")}});
  };
  cards.forEach(card => {card.addEventListener('click', flipCard)
  card.style.cursor = "pointer"});
  countdown();
  cards.forEach(elem => elem.classList.remove("flip"));
  (function shuffle() {
    cards.forEach(card => {
      let randomPosition = Math.floor(Math.random() * 15);
      card.style.order = randomPosition;
      bgAudioRef.play();
    });
  }());

};
function countdown(){
  document.getElementById('timer').innerHTML = x;
  x--;
  if (x<0){
    setTimeout(clearTimeout(timer), 3000);
    // cards.forEach(elem => elem.style.pointerEvents = "none");
    loseModal.classList.add('show_modal');
    timeSound.play();
    bgAudioRef.pause();
  }
  else {
    timer = setTimeout(countdown, 1000);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));
openAboutModalBtn.addEventListener("click", openAboutModal);
aboutModalRef.addEventListener('click', onAboutBackdropClick);
closeAboutModalBtn.addEventListener('click', onAboutCloseClick);
rangeRef.addEventListener('input', changeVolume);
restartLoseBtn.addEventListener('click', closeRestartModal);
winModalBtn.addEventListener('click', ()=>{
  closeWinRestartModal();
})

winModalSelect.addEventListener("change", ()=>{
  diff1 = winModalSelect.value;
})