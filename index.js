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
title.innerHTML = 'Welcome to Simon Says';
title.className = 'title';
pageContent.append(title);

// section Buttons Header

const sectionButtonsHeader = document.createElement('section');
sectionButtonsHeader.setAttribute('class', 'block-buttons');
pageContent.append(sectionButtonsHeader);

const buttonLevels = document.createElement('button');
buttonLevels.className = 'btn block-button button-level';
buttonLevels.innerHTML = 'Levels';

const buttonStart = document.createElement('button');
buttonStart.className = 'btn block-button button-start';
buttonStart.innerHTML = 'Start';

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

textarea.addEventListener('input', (e) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^0-9]/g, '');

    if (onlyNumbers !== value) {
        e.target.value = onlyNumbers;
    }
});

// function validateValue(elem) {
//     const value = elem.value;
//     const numVal = value.replace(/[^\d\n]+/g, "");
//     elem.value = numVal;
// }

// let randomNumber1 = getRandomNumber(10, 99);
// let randomNumber2 = getRandomNumber(10, 99);
// let randomNumber3 = getRandomNumber(10, 99);
// let randomNumber4 = getRandomNumber(10, 99);
// let randomNumber5 = getRandomNumber(10, 99);

let randomNumber1 = getRandomNumber(1, 1);
let randomNumber2 = getRandomNumber(1, 1);
let randomNumber3 = getRandomNumber(1, 1);
let randomNumber4 = getRandomNumber(1, 1);
let randomNumber5 = getRandomNumber(1, 1);

// section Buttons Footer

const sectionButtonsFooter = document.createElement('section');
sectionButtonsFooter.setAttribute('class', 'block-buttons');
sectionInput.append(sectionButtonsFooter);

const buttonRepeat = document.createElement('button');
buttonRepeat.className = 'btn block-button button-repeat';
buttonRepeat.innerHTML = 'Repeat the sequence';
buttonRepeat.classList.add('hidden');

const buttonNewGame = document.createElement('button');
buttonNewGame.className = 'btn block-button button-new-game';
buttonNewGame.innerHTML = 'New game';
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
        buttonKey.innerHTML = key.text.en;
        rows.append(buttonKey);

        buttonKey.addEventListener('click', () => {
            textarea.innerHTML += buttonKey.innerText;

            if (textarea.innerHTML === textarea.placeholder) {
                buttonRepeat.innerHTML = 'Next';
                // buttonRepeat.removeAttribute('disabled', '');
                buttonRepeat.classList.remove('disabled');
            }
        });
    });
});

const buttonsKey = keyboard.querySelectorAll('.button-key');

// function getRandomNumber(min, max)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// popup Levels

const popupLevelList = document.createElement('ul');
popupLevelList.className = 'popup-level__list';
buttonLevels.append(popupLevelList);

function displayLevels() {
    frameSizesData.forEach((item, index) => {
        const popupLevelListItem = document.createElement('li');
        popupLevelListItem.className = 'btn popup-level__list-item';
        popupLevelListItem.innerHTML = item.name;
        popupLevelList.append(popupLevelListItem);
    });
};
displayLevels();

const popupLevelListItems = popupLevelList.querySelectorAll('.popup-level__list-item');

// button Levels 

buttonLevels.addEventListener('click', () => {
    popupLevelList.classList.toggle('_active');
    document.body.classList.add('_lock');
});

popupLevelListItems.forEach(level => {
    level.addEventListener("click", () => {
        // resetGame();
        if (level.innerHTML === 'Easy') {
            buttonStart.classList.remove('hidden');
            currentLevel.innerText = `Easy level`;

            keyboard.innerHTML = '';

            keyboardData1.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerHTML = key.text.en;
                    rows.append(buttonKey);
                });
            });
        }
        if (level.innerHTML === 'Medium') {
            buttonStart.classList.remove('hidden');
            currentLevel.innerText = `Medium level`;
            keyboard.innerHTML = '';

            keyboardData2.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerHTML = key.text.en;
                    rows.append(buttonKey);
                });
            });
        }
        if (level.innerHTML === 'Hard') {
            buttonStart.classList.remove('hidden');
            currentLevel.innerText = `Hard level`;
            keyboard.innerHTML = '';

            keyboardData.forEach((row) => {
                const rows = document.createElement('div');
                rows.setAttribute('class', 'row');
                keyboard.append(rows);

                row.forEach((key) => {
                    const buttonKey = document.createElement('button');
                    buttonKey.className = 'btn button-key';
                    buttonKey.setAttribute('type', 'button');
                    buttonKey.innerHTML = key.text.en;
                    rows.append(buttonKey);
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

    setTimeout(function () {
        textarea.placeholder = randomNumber1;
    }, 300);

    // Disable the button
    buttonLevels.setAttribute('disabled', '');
    // buttonLevels.disabled = true;
    buttonLevels.classList.add('disabled');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');
});

// button Repeat the sequence

buttonRepeat.addEventListener('click', () => {
    //  buttonRepeat.removeAttribute('disabled', '');
    //     buttonRepeat.classList.remove('disabled');

    if (buttonRepeat.innerHTML === 'Repeat the sequence') {

        // buttonRepeat.setAttribute('disabled', '');
        buttonRepeat.classList.add('disabled');

        textarea.innerHTML = '';
        textarea.placeholder = randomNumber1;
        if (roundsCounterScore.innerText === '2') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}`;
        }
        if (roundsCounterScore.innerText === '3') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}`;
        }
        if (roundsCounterScore.innerText === '4') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}`;
        }
        if (roundsCounterScore.innerText === '5') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}${randomNumber5}`;
        }
    }

    if (buttonRepeat.innerHTML === 'Next') {
        roundsCounterScore.innerText++;
        buttonRepeat.innerHTML = 'Repeat the sequence';

        if (buttonRepeat.innerHTML === 'Repeat the sequence') {

            // buttonRepeat.removeAttribute('disabled', '');
            buttonRepeat.classList.remove('disabled');
        }

        // buttonRepeat.removeAttribute('disabled', '');
        // buttonRepeat.classList.remove('disabled');
        textarea.innerHTML = '';
        textarea.placeholder = `${randomNumber1}${randomNumber2}`;
        if (roundsCounterScore.innerText === '3') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}`;
        }
        if (roundsCounterScore.innerText === '4') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}`;
        }
        if (roundsCounterScore.innerText === '5') {
            textarea.placeholder = `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}${randomNumber5}`;

            if (textarea.innerHTML === textarea.placeholder) {
                buttonRepeat.classList.add('hidden');
                roundsCounterScore.innerText = '5';
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
    textarea.innerHTML = '';
    buttonLevels.removeAttribute('disabled', '');
    buttonLevels.classList.remove('disabled');
    buttonRepeat.removeAttribute('disabled', '');
    buttonRepeat.classList.remove('disabled');
});


function showGameOver() {
    const audioWin = new Audio();
    audioWin.src = './assets/audio/win-sound.wav';
    audioWin.volume = volume;
    audioWin.play();

    setTimeout(() => {
        popup.classList.add('_active');
    }, 1000);
    popupSubtitle.innerHTML = `Great!`;
    document.body.classList.add('_lock');
}
