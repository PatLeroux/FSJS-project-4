/******************************************
Treehouse Techdegree:
FSJS project 4 - OOP Game App
By: Patrick  Leroux
Treehouse profile name: patleroux 
******************************************/

/************************************************************************       
Class: Game
    
 Game management
************************************************************************/
class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = 0;
        this.phrases = this.createPhraseObj();
        this.activePhrase = null;
    }

    /************************************************************************       
    Method: createPhraseObj()
    
     - Create an array of Phrase objects.
    ************************************************************************/
    createPhraseObj() {
            const phrases = [];
            phrases.push(new Phrase('In this project you will '));
            phrases.push(new Phrase('Using JavaScript you will '));
            phrases.push(new Phrase('Your code will choose a random '));
            phrases.push(new Phrase('Each time the player guesses a '));
            phrases.push(new Phrase('A player continues to select '));
            return phrases;
        } // createPhraseObj checked

    /************************************************************************       
    Method: startGame()
    
     - Hides the start screen overlay
     - Call the getRandomPhrase() method 
     - Sets the activePhrase property with the chosen phrase
     - Adds that phrase to the board by calling the addPhraseToDisplay() 
       method on the active Phrase object
    ************************************************************************/
    startGame() {
            this.newGame();
            // Hides the start screen overlay
            const overlayScreen = document.querySelector('#overlay');
            overlayScreen.style.display = 'none';

            // Call the getRandomPhrase() method 
            const phraseIndex = this.getRandomNumber(this.phrases.length)

            // Sets the activePhrase property with the chosen phrase
            this.activePhrase = this.getRandomPhrase(phraseIndex);
            // Adds that phrase to the board by calling the addPhraseToDisplay() 
            // method on the active Phrase object
            this.activePhrase.addPhraseToDisplay();
        } // startGame checked

    /************************************************************************       
    Method: getRandomPhrase()
    
     - Randomly retrieves one of the phrases stored in the 
       phrases array and returns it.Hides the start screen overlay
    ************************************************************************/
    getRandomPhrase(phraseIndex) {
            const ramdomPhrase = this.phrases[phraseIndex];
            return ramdomPhrase;
        } //getRandomPhrase checked

    /************************************************************************       
    Method: handleInteraction()
    
     This method controls most of the game logic. It checks to see if the 
     button clicked by the player matches a letter in the phrase, and then 
     directs the game based on a correct or incorrect guess.

     - Disable the selected letter’s onscreen keyboard button
     - If the phrase does not include the guessed letter, add the wrong CSS 
       class to the selected letter's keyboard button and call the 
       removeLife() method
    ************************************************************************/
    handleInteraction(key) {
            //Disable the selected letter’s onscreen keyboard button
            if (key.className !== 'keyrow') {
                key.setAttribute('disabled', true);
                let textContent = key.textContent;
                let isKeyIncluded = this.activePhrase.checkLetter(textContent);
                if (isKeyIncluded) {
                    key.className = 'chosen';
                    this.checkForWin();
                    // key.setAttribute('disabled', false);
                } else {
                    key.className = 'wrong';
                    this.removeLife();

                }
            }
        } // handleInteraction checked

    /************************************************************************       
    Method: removeLife()
    
    This method removes a life from the scoreboard.

    - Get the image elements from the scoreboard (class '.tries')
    - Replace one of the liveHeart.png images with a lostHeart.png image
    - Increments the missed property
    - If the player has five missed guesses then call the gameOver() method.

    ************************************************************************/
    removeLife() {
            // Get the image elements from the scoreboard (class '.tries')
            const heartsImage = document.querySelectorAll('.tries img');

            // Replace one of the liveHeart.png images with a lostHeart.png image
            heartsImage[this.missed].src = "images/lostHeart.png";

            // Increments the missed property
            this.missed += 1;

            // If the player has five missed guesses then call the gameOver() method.
            if (this.missed === tries) {
                this.gameOver();
            }
        } // removeLife checked

    /************************************************************************       
    Method: checkForWin()
    
    This method checks to see if the player has revealed all of the letters 
    in the active phrase.
    
    - Select all elements that as a CSS class '.hide'
    - Check there is 0 letters left
    - Call gameOver
    *************************************************************************/
    checkForWin() {
            // Select all elements that as a CSS class '.hide'
            const wordLetters = document.querySelectorAll('.hide');

            // Check there is 0 letters left
            if (wordLetters.length === 0) {
                // Call gameOver
                this.gameOver();
            }
        } // checkForWin checked

    /************************************************************************       
    Method: gameOver()

    This method displays the original start screen overlay, and depending on 
    the outcome of the game, updates the overlay h1 element with a friendly 
    win or loss message, and replaces the overlay’s start CSS class with 
    either the win or lose CSS class.

    - Get the elements #overlay and #game-over-message
    - Displays the original start screen overlay
    - Update the overlay h1 element with a message (win or lose) based
      on the number of missedUpdate the overlay h1 element with a message 
      (win or lose)
    *************************************************************************/
    gameOver() {
            // Get the elements #overlay and #game-over-message
            let overlay = document.querySelector('#overlay');
            let gameOverMessage = document.querySelector("#game-over-message");

            // Displays the original start screen overlay
            overlay.style.display = 'block';

            // Update the overlay h1 element with a message (win or lose) based
            // on the number of missed
            if (this.missed === tries) {
                gameOverMessage.textContent = "We are sorry that you lost all yours hearts. Maybe try again?"
                overlay.className = "lose"
            } else {
                gameOverMessage.textContent = "Congratulations you guess right! Good show!"
                overlay.className = "win"
            }

        } // gameOver checked

    /************************************************************************       
    Method: getRandomNumber()

    This method generate a random number and returns it. It use the max 
    parameter enabling the use of any number of Phrase object.
    *************************************************************************/
    getRandomNumber(max) {
            return Math.floor(Math.random() * Math.floor(max));
        } // getRandomNumber checked


    /************************************************************************       
    Method: newGame()

    This method re-initalize the game.

    - Reset the keyboard keys
    - Reset the phrase place holder
    - Reset the score board
    *************************************************************************/
    newGame() {
            // Reset the keyboard keys 
            let keyRow = document.querySelectorAll('button');
            keyRow.forEach(function(key) {
                key.className = "key";
                key.removeAttribute('disabled');
            });

            // Reset the phrase place holder
            const placeHolderUL = document.querySelector('ul');
            placeHolderUL.innerHTML = '<li></li>';

            // Reset the score board
            // Get the image elements from the scoreboard (class '.tries')
            const heartsImage = document.querySelectorAll('.tries img');
            for (let i = 0; i < heartsImage.length; i++) {
                heartsImage[i].src = "images/liveHeart.png";
            }
        } // newGame checkec
}