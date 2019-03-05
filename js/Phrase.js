/******************************************
Treehouse Techdegree:
FSJS project 4 - OOP Game App
By: Patrick  Leroux
Treehouse profile name: patleroux 
******************************************/


/************************************************************************       
Class: Phrase
    
 Phrase management
************************************************************************/
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /************************************************************************       
    Method: addPhraseToDisplay()
    
     - Adds letter placeholders to the display when the game starts 
     - Each letter is presented by an empty box, one li element for each 
       letter. 
    ************************************************************************/
    addPhraseToDisplay() {
            const numberOfLetters = this.phrase.length;
            const placeHolderUL = document.querySelector('ul');
            for (let i = 0; i < numberOfLetters; i++) {
                let placeHolderLI = document.createElement('li');
                placeHolderLI.textContent = this.phrase[i];
                if (placeHolderLI.textContent === ' ') {
                    placeHolderLI.className = 'space';
                } else {
                    placeHolderLI.className = 'hide letter ' + this.phrase[i];
                }
                placeHolderUL.appendChild(placeHolderLI);
            }

        } // addPhraseToDisplay checked

    /************************************************************************       
    Method: checkLetter()
    
    Checks to see if the letter selected by the player matches a letter in 
    the phrase.

    - Start with the state that the letter is not found
    - Create an array 'phrase' of eache letter
    - Check if a letter match
    - Show the found letter
    ************************************************************************/
    checkLetter(selectedLetter) {
            // Start with the state that the letter is not found
            let letterInPhrase = false;

            // Create an array 'phrase' of eache letter
            let phrase = this.phrase.split('');

            phrase.filter(letters => {
                // Check if a letter match
                if (letters === selectedLetter) {
                    // Show the found letter
                    this.showMatchedLetter(selectedLetter);
                    letterInPhrase = true;
                }
            });
            return letterInPhrase;
        } // checkLetter checked

    /************************************************************************       
    Method: showMatchedLetter()
    
    Reveals the letter(s) on the board that matches the player's selection. 
            
    - Select all elements that as a CSS class '.hide'
    - Parse found all elements with a CSS class '.hide'
    - Replace CSS class '.hide' with the '.show' CSS class
    ************************************************************************/
    showMatchedLetter(selectedLetter) {
            // Select all elements that as a CSS class '.hide'
            const list = document.querySelectorAll('.hide');
            // Parse found all elements with a CSS class '.hide'
            list.forEach(letter => {
                if (letter.textContent === selectedLetter) {
                    // Replace CSS class '.hide' with the '.show' CSS class.
                    letter.className = 'show letter ' + selectedLetter;
                }
            });
        } // showMatchedLetter ckecked
}