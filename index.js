import frameSizesData from './data/frame-levels.js';
import keyboardData1 from "./data/keyboard-level1.js";
import keyboardData2 from "./data/keyboard-level2.js";
import keyboardData from "./data/keyboard.js";

document.body.setAttribute('class', 'page');

const pageContainer = document.createElement('div');
pageContainer.className = 'page__container';
document.body.append(pageContainer);

const pageContent = document.createElement('div');
pageContent.className = 'page__content';
pageContainer.append(pageContent);

const title = document.createElement('h1');
title.textContent = 'Welcome to Simon Says';
title.className = 'title';
pageContent.append(title);

// section Buttons Header

const sectionButtonsHeader = document.createElement('section');
sectionButtonsHeader.setAttribute('class', 'block-buttons');
pageContent.append(sectionButtonsHeader);

const buttonLevels = document.createElement('button');
buttonLevels.className = 'btn block-button button-level';
buttonLevels.textContent = 'Levels';

const buttonStart = document.createElement('button');
buttonStart.className = 'btn block-button button-start';
buttonStart.textContent = 'Start';

sectionButtonsHeader.append(buttonLevels, buttonStart);

// section Input

const sectionInput = document.createElement('section');
sectionInput.setAttribute('class', 'section-input');
pageContent.append(sectionInput);

const blockInfo = document.createElement('div');
blockInfo.setAttribute('class', 'current-info');
sectionInput.append(blockInfo);

const currentLevel = document.createElement('div');
currentLevel.setAttribute('class', 'current-level');
currentLevel.textContent = `Easy level`;

const roundsCounter = document.createElement('div');
roundsCounter.setAttribute('class', 'rounds-counter');

blockInfo.append(currentLevel, roundsCounter);

const roundsCounterTitle = document.createElement('p');
roundsCounterTitle.setAttribute('class', 'rounds-counter-title');
roundsCounterTitle.textContent = `Round: `;

const roundsCounterScore = document.createElement('p');
roundsCounterScore.setAttribute('class', 'rounds-counter-score');
roundsCounterScore.textContent = `1`;
roundsCounterScore.classList.add('hidden');

roundsCounter.append(roundsCounterTitle, roundsCounterScore);

// counter

// let round = roundsCounterScore.innerText;
// round = 1;

let audio;
let volume = 0.1;

// textarea

const blockInput = document.createElement('div');
blockInput.setAttribute('class', 'block-input');
sectionInput.append(blockInput);

const textarea = document.createElement('textarea');
textarea.setAttribute('class', 'input-textarea');
textarea.placeholder = '';
textarea.maxLength = '2';
blockInput.append(textarea);

textarea.focus();
// textarea.addEventListener('blur', () => textarea.focus());

let randomNumber1 = getRandomNumber(10, 99);
let randomNumber2 = getRandomNumber(1000, 9999);
let randomNumber3 = getRandomNumber(100000, 999999);
let randomNumber4 = getRandomNumber(10000000, 99999999);
let randomNumber5 = getRandomNumber(1000000000, 9999999999);

let randomLetter1 = getRandomLetter(2);
let randomLetter2 = getRandomLetter(4);
let randomLetter3 = getRandomLetter(6);
let randomLetter4 = getRandomLetter(8);
let randomLetter5 = getRandomLetter(10);

let randomValue1 = getRandomValue(2);
let randomValue2 = getRandomValue(4);
let randomValue3 = getRandomValue(6);
let randomValue4 = getRandomValue(8);
let randomValue5 = getRandomValue(10);

// section Buttons Footer

const sectionButtonsFooter = document.createElement('section');
sectionButtonsFooter.setAttribute('class', 'block-buttons');
sectionInput.append(sectionButtonsFooter);

const buttonRepeat = document.createElement('button');
buttonRepeat.className = 'btn block-button button-repeat';
buttonRepeat.textContent = 'Repeat the sequence';
buttonRepeat.classList.add('hidden');
buttonRepeat.setAttribute('disabled', '');
buttonRepeat.classList.add('disabled');

const buttonNewGame = document.createElement('button');
buttonNewGame.className = 'btn block-button button-new-game';
buttonNewGame.textContent = 'New game';
buttonNewGame.classList.add('hidden');

sectionButtonsFooter.append(buttonRepeat, buttonNewGame);

// section Keyboard

const keyboard = document.createElement('section');
keyboard.className = 'keyboard';
pageContent.append(keyboard);

keyboardData1.forEach((row) => {
    const rows = document.createElement('div');
    rows.setAttribute('class', 'row');
    keyboard.append(rows);

    row.forEach((key) => {
        const buttonKey = document.createElement('button');
        buttonKey.className = 'btn button-key';
        buttonKey.setAttribute('type', 'button');
        buttonKey.textContent = key.text.en;
        rows.append(buttonKey);

        buttonKey.addEventListener('click', () => {
            textarea.textContent += buttonKey.textContent;

            if (textarea.textContent === textarea.placeholder) {
                buttonRepeat.textContent = 'Next';
                buttonRepeat.removeAttribute('disabled', '');
                buttonRepeat.classList.remove('disabled');
                showMessageCorrect();
            }

            if (textarea.textContent !== textarea.placeholder && textarea.textContent.length === textarea.placeholder.length) {
                showMessageIncorrect();
                // buttonRepeat.removeAttribute('disabled', '');
                // buttonRepeat.classList.remove('disabled');
            }

            if (textarea.textContent === textarea.placeholder && roundsCounterScore.innerText === '5') {
                showGameOver();
            }

        });
    });
});

const buttonsKey = keyboard.querySelectorAll('.button-key');

disabledButtonsKey();

let isBlocked = true;

document.addEventListener('keydown', function (event) {
    if (isBlocked) {
        event.preventDefault();
    }
});

// Function to toggle blocking
function toggleBlock() {
    isBlocked = !isBlocked;
}

// popup Levels

const popupLevelList = document.createElement('ul');
popupLevelList.className = 'popup-level__list';
buttonLevels.append(popupLevelList);

function displayLevels() {
    frameSizesData.forEach((item, index) => {
        const popupLevelListItem = document.createElement('li');
        popupLevelListItem.className = 'btn popup-level__list-item';
        popupLevelListItem.textContent = item.name;
        popupLevelList.append(popupLevelListItem);
    });
};
displayLevels();

const popupLevelListItems = popupLevelList.querySelectorAll('.popup-level__list-item');

// popup Game Over

const popup = document.createElement('div');
popup.className = 'popup';
document.body.append(popup);

const popupContainer = document.createElement('div');
popupContainer.className = 'popup__container';
popup.append(popupContainer);

const popupContent = document.createElement('div');
popupContent.className = 'popup__content';
popupContainer.append(popupContent);

const popupTitle = document.createElement('p');
popupTitle.className = 'popup__title';
popupTitle.textContent = 'Game Over!!';
popupContent.append(popupTitle);

const popupSubtitle = document.createElement('p');
popupSubtitle.className = 'popup__subtitle';
popupContent.append(popupSubtitle);

const buttonClosePopup = document.createElement('button');
buttonClosePopup.className = 'btn popup__button button-x';
buttonClosePopup.setAttribute('type', 'button');
buttonClosePopup.textContent = 'x';
popupContent.append(buttonClosePopup);

// button Close Popup

buttonClosePopup.addEventListener('click', () => {
    textarea.textContent = '';
    textarea.classList.remove('_correct');
    textarea.placeholder = '';
    popup.classList.remove('_active');
    document.body.classList.remove('_lock');
    buttonRepeat.classList.add('hidden');
    roundsCounterScore.textContent = '';
    buttonLevels.removeAttribute('disabled', '');
    buttonLevels.classList.remove('disabled');
    buttonStart.classList.remove('hidden');
})

// button Levels 

buttonLevels.addEventListener('click', () => {
    // disabledButtonsKey();
    popupLevelList.classList.toggle('_active');
    
    // buttonStart.setAttribute('disabled', '');
    // buttonStart.classList.add('disabled');
    // buttonStart.classList.add('hidden');
    // document.body.classList.add('_lock');
});

// document.addEventListener('click', (e) => {
//     // const click = e.composedPath().includes(popupLevelListItems);
//     // if (!click) {
//         popupLevelList.addEventListener("click", (e) => {
//             popupLevelList.classList.remove('_active');
//         });
//     // }
// });

popupLevelListItems.forEach(level => {
    level.addEventListener("click", () => {
       
        if (level.textContent === 'Easy') {
            currentLevel.textContent = `Easy level`;
            keyboard.textContent = '';
            
            keyboardData1.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.textContent = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.textContent += buttonKey.textContent;

                        if (textarea.textContent === textarea.placeholder) {
                            buttonRepeat.textContent = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');
                            showMessageCorrect();
                        }

                        if (textarea.textContent !== textarea.placeholder && textarea.textContent.length === textarea.placeholder.length) {
                            showMessageIncorrect();
                            // buttonRepeat.removeAttribute('disabled', '');
                            // buttonRepeat.classList.remove('disabled');
                        }

                        if (textarea.textContent === textarea.placeholder && roundsCounterScore.innerText === '5') {
                            showGameOver();
                        }

                    });
                    
                });
                
            });
            validateOnlyNumbers();            
        }
        
        if (level.textContent === 'Medium') {
            buttonStart.classList.remove('hidden');
            currentLevel.textContent = `Medium level`;
            keyboard.textContent = '';

            keyboardData2.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.textContent = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.textContent += buttonKey.textContent;

                        if (textarea.textContent === textarea.placeholder) {
                            buttonRepeat.textContent = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');
                            showMessageCorrect();
                        }
                        if (textarea.textContent !== textarea.placeholder && textarea.textContent.length === textarea.placeholder.length) {
                            showMessageIncorrect();
                            // buttonRepeat.removeAttribute('disabled', '');
                            // buttonRepeat.classList.remove('disabled');
                        }

                        if (textarea.textContent === textarea.placeholder && roundsCounterScore.innerText === '5') {
                            showGameOver();
                        }
                    });

                });
            });

            validateOnlyLetters();
        }
        if (level.textContent === 'Hard') {
            buttonStart.classList.remove('hidden');
            currentLevel.textContent = `Hard level`;
            keyboard.textContent = '';

            keyboardData.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.textContent = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.textContent += buttonKey.textContent;

                        if (textarea.textContent === textarea.placeholder) {
                            buttonRepeat.textContent = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');

                            showMessageCorrect();
                        }
                        if (textarea.textContent !== textarea.placeholder && textarea.textContent.length === textarea.placeholder.length) {
                            showMessageIncorrect();
                            // buttonRepeat.removeAttribute('disabled', '');
                            // buttonRepeat.classList.remove('disabled');
                        }

                        if (textarea.textContent === textarea.placeholder && roundsCounterScore.innerText === '5') {
                            showGameOver();
                        }
                    });

                });
            });
        }
       
    });
    
});

// button Start 

buttonStart.addEventListener("click", () => {
    buttonStart.classList.add('hidden');
    buttonLevels.setAttribute('disabled', '');
    buttonLevels.classList.add('disabled');
    roundsCounterScore.classList.remove('hidden');
    roundsCounterScore.textContent = ` 1`;
    buttonRepeat.classList.remove('hidden');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');
    buttonNewGame.classList.remove('hidden');
    undisabledButtonsKey();
    toggleBlock();
    popupLevelList.classList.remove('_active');

    // function showPlaceholder(elementId, placeholderText, duration) {
    //     const element = document.getElementById(elementId);
    //     element.placeholder = placeholderText;

    //     setTimeout(() => {
    //         element.placeholder = "";
    //     }, duration);
    // }

    // showPlaceholder("myInput", "Enter your name...", 3000);

    // let q = textarea.placeholder;
    if (currentLevel.textContent === `Easy level`) {
        // setTimeout(function () {
        textarea.placeholder = randomNumber1;
        validateOnlyNumbers();
        // }, 2000); 
    }
    if (currentLevel.textContent === `Medium level`) {
        textarea.placeholder = randomLetter1;
        validateOnlyLetters();
    }
    if (currentLevel.textContent === `Hard level`) {
        textarea.placeholder = randomValue1;
    }

    // setTimeout(function () {
    //     q.classList.add('hidden');
    // }, 2000);  
});

// button Repeat the sequence

buttonRepeat.addEventListener('click', () => {

    if (buttonRepeat.textContent === 'Repeat the sequence') {

        buttonRepeat.setAttribute('disabled', '');
        buttonRepeat.classList.add('disabled');
        textarea.textContent = '';
        textarea.classList.remove('_incorrect');
        undisabledButtonsKey();

        if (currentLevel.textContent === `Easy level`) {

            if (roundsCounterScore.textContent === '1') {
                textarea.placeholder = randomNumber1;
            }
            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomNumber2;
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomNumber3;
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomNumber4;
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomNumber5;
            }
        }

        if (currentLevel.textContent === `Medium level`) {

            if (roundsCounterScore.textContent === '1') {
                textarea.placeholder = randomLetter1;
            }
            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomLetter2;
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomLetter3;
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomLetter4;
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomLetter5;
            }
        }

        if (currentLevel.textContent === `Hard level`) {

            if (roundsCounterScore.textContent === '1') {
                textarea.placeholder = randomValue1;
            }
            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomValue2;
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomValue3;
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomValue4;
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomValue5;
            }
        }
    }

    if (buttonRepeat.textContent === 'Next') {
        roundsCounterScore.textContent++;
        buttonRepeat.textContent = 'Repeat the sequence';
        textarea.textContent = '';
        textarea.classList.remove('_correct');
        undisabledButtonsKey();

        if (buttonRepeat.textContent === 'Repeat the sequence') {
            buttonRepeat.removeAttribute('disabled', '');
            buttonRepeat.classList.remove('disabled');
        }

        if (currentLevel.textContent === `Easy level`) {

            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomNumber2;
                textarea.maxLength = '4';
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomNumber3;
                textarea.maxLength = '6';
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomNumber4;
                textarea.maxLength = '8';
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomNumber5;
                textarea.maxLength = '10';
            }
        }

        if (currentLevel.textContent === `Medium level`) {

            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomLetter2;
                textarea.maxLength = '4';
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomLetter3;
                textarea.maxLength = '6';
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomLetter4;
                textarea.maxLength = '8';
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomLetter5;
                textarea.maxLength = '10';
            }
        }

        if (currentLevel.textContent === `Hard level`) {

            if (roundsCounterScore.textContent === '2') {
                textarea.placeholder = randomValue2;
                textarea.maxLength = '4';
            }
            if (roundsCounterScore.textContent === '3') {
                textarea.placeholder = randomValue3;
                textarea.maxLength = '6';
            }
            if (roundsCounterScore.textContent === '4') {
                textarea.placeholder = randomValue4;
                textarea.maxLength = '8';
            }
            if (roundsCounterScore.textContent === '5') {
                textarea.placeholder = randomValue5;
                textarea.maxLength = '10';
            }
        }
    }
});

// button New Game 

buttonNewGame.addEventListener("click", () => {
    buttonStart.classList.remove('hidden');
    roundsCounterScore.classList.add('hidden');
    buttonRepeat.classList.add('hidden');
    buttonNewGame.classList.add('hidden');
    textarea.placeholder = '';
    textarea.textContent = '';
    textarea.classList.remove('_correct');
    textarea.classList.remove('_incorrect');
    buttonLevels.removeAttribute('disabled', '');
    buttonLevels.classList.remove('disabled');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');
    disabledButtonsKey();

    randomNumber1 = getRandomNumber(10, 99);
    randomNumber2 = getRandomNumber(1000, 9999);
    randomNumber3 = getRandomNumber(100000, 999999);
    randomNumber4 = getRandomNumber(10000000, 99999999);
    randomNumber5 = getRandomNumber(1000000000, 9999999999);

    randomLetter2 = getRandomLetter(4);
    randomLetter3 = getRandomLetter(6);
    randomLetter4 = getRandomLetter(8);
    randomLetter5 = getRandomLetter(10);
    randomLetter1 = getRandomLetter(2);

    randomValue1 = getRandomValue(2);
    randomValue2 = getRandomValue(4);
    randomValue3 = getRandomValue(6);
    randomValue4 = getRandomValue(8);
    randomValue5 = getRandomValue(10);
});

// function getRandomNumber(min, max)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function getRandomLetter(length)

function getRandomLetter(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

// function getRandomValue(length)

function getRandomValue(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

// function showGameOver

function showGameOver() {
    // const audioWin = new Audio();
    // audioWin.src = './assets/audio/win-sound.wav';
    // audioWin.volume = volume;
    // audioWin.play();

    disabledButtonsKey();
    setTimeout(() => {
        popup.classList.add('_active');
    }, 500);
    popupTitle.classList.add('_win');
    popupSubtitle.textContent = `Great job!`;
    document.body.classList.add('_lock');
}

// function showMessageCorrect

function showMessageCorrect() {
    disabledButtonsKey();
    setTimeout(() => {
        textarea.textContent = 'Correct!';
        textarea.classList.add('_correct');
    }, 300);
}

function showMessageIncorrect() {
    disabledButtonsKey();
    setTimeout(() => {
        textarea.textContent = 'Incorrect!';
        textarea.classList.add('_incorrect');
    }, 100);
}

// function disabledButtonsKey

function disabledButtonsKey() {
    buttonsKey.forEach((key) => {
        key.setAttribute('disabled', '');
        key.classList.add('disabled');
    });
}

function undisabledButtonsKey() {
    buttonsKey.forEach((key) => {
        key.removeAttribute('disabled', '');
    });
}

// function validateOnlyNumbers

function validateOnlyNumbers() {
    textarea.addEventListener('input', (e) => {
        const value = e.target.value;
        const onlyNumbers = value.replace(/[^0-9]/g, '');

        if (onlyNumbers !== value) {
            e.target.value = onlyNumbers;
        }
    });
}

function validateOnlyLetters() {
    textarea.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z]/g, '');
    });
}

// function validateValue(elem) {
//     const value = elem.value;
//     const numVal = value.replace(/[^\d\n]+/g, "");
//     elem.value = numVal;
// }
