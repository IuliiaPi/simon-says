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
title.innerText = 'Welcome to Simon Says';
title.className = 'title';
pageContent.append(title);

// section Buttons Header

const sectionButtonsHeader = document.createElement('section');
sectionButtonsHeader.setAttribute('class', 'block-buttons');
pageContent.append(sectionButtonsHeader);

const buttonLevels = document.createElement('button');
buttonLevels.className = 'btn block-button button-level';
buttonLevels.innerText = 'Levels';

const buttonStart = document.createElement('button');
buttonStart.className = 'btn block-button button-start';
buttonStart.innerText = 'Start';

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
currentLevel.innerText = `Easy level`;

const roundsCounter = document.createElement('div');
roundsCounter.setAttribute('class', 'rounds-counter');

blockInfo.append(currentLevel, roundsCounter);

const roundsCounterTitle = document.createElement('p');
roundsCounterTitle.setAttribute('class', 'rounds-counter-title');
roundsCounterTitle.innerText = `Round: `;

const roundsCounterScore = document.createElement('p');
roundsCounterScore.setAttribute('class', 'rounds-counter-score');
roundsCounterScore.innerText = `1`;
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
blockInput.append(textarea);

textarea.focus();
// textarea.addEventListener('blur', () => textarea.focus());

validateOnlyNumbers();

let randomNumber1 = getRandomNumber(10, 99);
let randomNumber2 = getRandomNumber(1000, 9999);
let randomNumber3 = getRandomNumber(100000, 999999);
let randomNumber4 = getRandomNumber(10000000, 99999999);
let randomNumber5 = getRandomNumber(1000000000, 9999999999);

// let randomNumber1 = getRandomNumber(1, 1);
// let randomNumber2 = getRandomNumber(1, 1);
// let randomNumber3 = getRandomNumber(1, 1);
// let randomNumber4 = getRandomNumber(1, 1);
// let randomNumber5 = getRandomNumber(1, 1);

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
buttonRepeat.innerText = 'Repeat the sequence';
buttonRepeat.classList.add('hidden');

const buttonNewGame = document.createElement('button');
buttonNewGame.className = 'btn block-button button-new-game';
buttonNewGame.innerText = 'New game';
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
        buttonKey.innerText = key.text.en;
        rows.append(buttonKey);

        buttonKey.addEventListener('click', () => {
            textarea.innerHTML += buttonKey.innerText;

            if (textarea.innerHTML === textarea.placeholder) {
                buttonRepeat.innerText = 'Next';
                buttonRepeat.removeAttribute('disabled', '');
                buttonRepeat.classList.remove('disabled');

                showMessageCorrect();
            }

            // if (textarea.innerHTML !== textarea.placeholder) {
            //     popup.classList.add('_active');
            //     popupTitle.innerHTML = 'Incorrect!';
            //     popupTitle.classList.add('_lose');
            //     document.body.classList.add('_lock');

            //     setTimeout(() => {
            //         popup.classList.remove('_active');
            //         document.body.classList.remove('_lock');
            //         textarea.innerHTML = '';
            //         textarea.placeholder = '';
            //     }, 2000);
            // }
        });
    });
});

const buttonsKey = keyboard.querySelectorAll('.button-key');

disabledButtonsKey();

// let isBlocked = true;

// document.addEventListener('keydown', function (event) {
//     if (isBlocked) {
//         event.preventDefault();
//     }
// });

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
        popupLevelListItem.innerText = item.name;
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
popupTitle.innerText = 'Game Over!!';
popupContent.append(popupTitle);

const popupSubtitle = document.createElement('p');
popupSubtitle.className = 'popup__subtitle';
popupContent.append(popupSubtitle);

const buttonClosePopup = document.createElement('button');
buttonClosePopup.className = 'btn popup__button button-x';
buttonClosePopup.setAttribute('type', 'button');
buttonClosePopup.innerText = 'x';
popupContent.append(buttonClosePopup);

buttonClosePopup.addEventListener('click', () => {
    popup.classList.remove('_active');
    document.body.classList.remove('_lock');
});

// button Levels 

buttonLevels.addEventListener('click', () => {
    popupLevelList.classList.toggle('_active');
    // disabledButtonsKey();
    // buttonStart.setAttribute('disabled', '');
    // buttonStart.classList.add('disabled');
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

        // buttonStart.removeAttribute('disabled', '');
        // buttonStart.classList.remove('disabled');

        // document.body.classList.toggle('_lock');
        // document.body.classList.add('_lock');
        if (level.innerText === 'Easy') {
            buttonStart.classList.remove('hidden');

            currentLevel.innerText = `Easy level`;

            keyboard.innerText = '';

            keyboardData1.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerText = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.innerHTML += buttonKey.innerText;

                        if (textarea.innerHTML === textarea.placeholder) {
                            buttonRepeat.innerText = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');

                            showMessageCorrect();
                        }
                    });

                });
            });
            validateOnlyNumbers();
            // disabledButtonsKey();

        }
        if (level.innerText === 'Medium') {
            buttonStart.classList.remove('hidden');
            currentLevel.innerText = `Medium level`;
            keyboard.innerText = '';

            keyboardData2.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerText = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.innerHTML += buttonKey.innerText;

                        if (textarea.innerHTML === textarea.placeholder) {
                            buttonRepeat.innerText = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');

                            showMessageCorrect();
                        }
                    });

                });
            });

            // validateOnlyLetters();
        }
        if (level.innerText === 'Hard') {
            buttonStart.classList.remove('hidden');
            currentLevel.innerText = `Hard level`;
            keyboard.innerText = '';

            keyboardData.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerText = key.text.en;
                    rows.append(buttonKey);

                    buttonKey.addEventListener('click', () => {
                        textarea.innerHTML += buttonKey.innerText;

                        if (textarea.innerHTML === textarea.placeholder) {
                            buttonRepeat.innerText = 'Next';
                            buttonRepeat.removeAttribute('disabled', '');
                            buttonRepeat.classList.remove('disabled');

                            showMessageCorrect();
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
    roundsCounterScore.classList.remove('hidden');
    roundsCounterScore.innerText = ` 1`;
    buttonRepeat.classList.remove('hidden');
    buttonNewGame.classList.remove('hidden');

    // function showPlaceholder(elementId, placeholderText, duration) {
    //     const element = document.getElementById(elementId);
    //     element.placeholder = placeholderText;

    //     setTimeout(() => {
    //         element.placeholder = "";
    //     }, duration);
    // }

    // showPlaceholder("myInput", "Enter your name...", 3000);

    // let q = textarea.placeholder;
    if (currentLevel.innerText === `Easy level`) {
        textarea.placeholder = randomNumber1;
    }
    if (currentLevel.innerText === `Medium level`) {
        textarea.placeholder = randomLetter1;
    }
    if (currentLevel.innerText === `Hard level`) {
        textarea.placeholder = randomValue1;
    }

    // setTimeout(function () {
    //     q.classList.add('hidden');
    // }, 2000);

    // Disable the button
    buttonLevels.setAttribute('disabled', '');
    // buttonLevels.disabled = true;
    buttonLevels.classList.add('disabled');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');

    buttonsKey.forEach((key) => {
        key.removeAttribute('disabled', '');
    });
    // toggleBlock();
});

// if ((roundsCounterScore.innerText === '5') &&
//     (textarea.innerHTML === randomNumber5)) {
//     buttonRepeat.classList.add('hidden');
//     roundsCounterScore.innerText = '';
//     popup.classList.add('_active');
//     document.body.classList.add('_lock');
// }

// button Repeat the sequence

buttonRepeat.addEventListener('click', () => {

    if (buttonRepeat.innerText === 'Repeat the sequence') {

        buttonRepeat.setAttribute('disabled', '');
        buttonRepeat.classList.add('disabled');

        textarea.innerText = '';

        if (currentLevel.innerText === `Easy level`) {

            if (roundsCounterScore.innerText === '1') {
                textarea.placeholder = randomNumber1;
            }
            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomNumber2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomNumber3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomNumber4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomNumber5;
            }
        }

        if (currentLevel.innerText === `Medium level`) {

            if (roundsCounterScore.innerText === '1') {
                textarea.placeholder = randomLetter1;
            }
            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomLetter2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomLetter3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomLetter4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomLetter5;
            }
        }

        if (currentLevel.innerText === `Hard level`) {
            
            if (roundsCounterScore.innerText === '1') {
                textarea.placeholder = randomValue1;
            }
            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomValue2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomValue3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomValue4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomValue5;
            }
        }
    }

    if (buttonRepeat.innerText === 'Next') {
        roundsCounterScore.innerText++;
        buttonRepeat.innerText = 'Repeat the sequence';

        if (buttonRepeat.innerText === 'Repeat the sequence') {
            buttonRepeat.removeAttribute('disabled', '');
            buttonRepeat.classList.remove('disabled');
        }

        textarea.innerText = '';

        if (currentLevel.innerText === `Easy level`) {

            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomNumber2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomNumber3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomNumber4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomNumber5;
            }
        }

        if (currentLevel.innerText === `Medium level`) {

            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomLetter2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomLetter3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomLetter4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomLetter5;
            }
        }

        if (currentLevel.innerText === `Hard level`) {

            if (roundsCounterScore.innerText === '2') {
                textarea.placeholder = randomValue2;
            }
            if (roundsCounterScore.innerText === '3') {
                textarea.placeholder = randomValue3;
            }
            if (roundsCounterScore.innerText === '4') {
                textarea.placeholder = randomValue4;
            }
            if (roundsCounterScore.innerText === '5') {
                textarea.placeholder = randomValue5;
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
    textarea.innerText = '';
    buttonLevels.removeAttribute('disabled', '');
    buttonLevels.classList.remove('disabled');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');
    disabledButtonsKey();

});

// function getRandomNumber(min, max)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function showGameOver() {
    const audioWin = new Audio();
    audioWin.src = './assets/audio/win-sound.wav';
    audioWin.volume = volume;
    audioWin.play();

    setTimeout(() => {
        popup.classList.add('_active');
    }, 1000);
    popupSubtitle.innerText = `Great!`;
    document.body.classList.add('_lock');
}

function showMessageCorrect() {
    popup.classList.add('_active');
    popupTitle.innerText = 'Correct!';
    popupTitle.classList.add('_win');
    document.body.classList.add('_lock');

    setTimeout(() => {
        popup.classList.remove('_active');
        document.body.classList.remove('_lock');
    }, 2000);
}

function disabledButtonsKey() {
    buttonsKey.forEach((key) => {
        key.setAttribute('disabled', '');
        key.classList.add('disabled');
    });
}

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
