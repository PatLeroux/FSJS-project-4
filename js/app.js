/******************************************
Treehouse Techdegree:
FSJS project 4 - OOP Game App
By: Patrick  Leroux
Treehouse profile name: patleroux 
******************************************/

const tries = 5; // Max lifes
const startButton = document.querySelector('#btn__reset');
const screenKeyboard = document.querySelector('#qwerty')
let game;

startButton.addEventListener('click', (event) => {
    game = new Game();
    game.startGame();
});

screenKeyboard.addEventListener('click', (event) => {
    game.handleInteraction(event.target);
});