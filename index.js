const cardsArray = [
    { name: 'image1', img: 'Images/banana.jpg' },
    { name: 'image2', img: 'Images/cherryy.jpg' },
    { name: 'image3', img: 'Images/kiwi.jpg' },
    { name: 'image4', img: 'Images/mango2.jpg' },
    { name: 'image5', img: 'Images/orange.jpg' },
    { name: 'image6', img: 'Images/pineapple.jpg' },
    { name: 'image7', img: 'Images/pomegranet.png' },
    { name: 'image8', img: 'Images/strawberry.jpg' },
    // Add other images in a similar format
  ];
  
  const gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
  
  let firstCard = null;
  let secondCard = null;
  
  function createBoard() {
    const game = document.querySelector('.memory-game');
    gameGrid.forEach((card, index) => {
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.dataset.name = card.name;
  
      const cardInner = document.createElement('div');
      cardInner.classList.add('inner');
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.style.backgroundColor = 'darksalmon'; // Setting a default background color for the front
  
      const back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = `url(${card.img})`; // Set background image for the back
  
      cardInner.appendChild(front);
      cardInner.appendChild(back);
      newCard.appendChild(cardInner);
  
      newCard.addEventListener('click', flipCard);
  
      game.appendChild(newCard);
    });
  }
  
  
  let canFlip = true;

let hasFlipped = false;

function flipCard() {
  if (!canFlip || this === firstCard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) {
    disableCards();
  } else {
    canFlip = false;
    setTimeout(() => {
      unflipCards();
    }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  resetBoard();
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  canFlip = true;
}

createBoard();
