const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let counter = 0;


const flipCard = function() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.style.cursor = "initial";
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
  resetBoard();
}

const unflipCards = function() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.style.cursor = "pointer";
    secondCard.style.cursor = "pointer";
    resetBoard();
  }, 500);
}

const resetBoard = function() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
;
(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 15);
    card.style.order = randomPosition;
  });
}());

cards.forEach(card => card.addEventListener('click', flipCard));