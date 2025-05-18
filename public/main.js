const grid = document.getElementById('attempt-grid');
const messageDiv = document.getElementById('message');
const nextWordBtn = document.getElementById('next-word');
const restartBtn = document.getElementById('restart-game');

let wordToGuess = '';
let currentAttempt = [];
let currentRow = 0;
let maxAttempts = 6;
let gameOver = false;

const fetchWord = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/random-word');
        const data = await response.json();
        wordToGuess = data.word.toUpperCase();
        resetGame();
        initializeGrid();
        initializeSampleLetters();
    } catch (error) {
        messageDiv.textContent = 'Failed to fetch word.';
        messageDiv.style.color = 'red';
    }
};

const initializeSampleLetters = () => {
    const size = (wordToGuess.length * 3) - 1;
    let lettersArray = [...wordToGuess.toUpperCase()];
    const uppercaseAlphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    while (lettersArray.length < size) {
        lettersArray.push(uppercaseAlphabets[Math.floor(Math.random() * uppercaseAlphabets.length)]);
    }
    const lettersShuffledArray = shuffleArray(lettersArray);
    const sampleLettersDiv = document.getElementById('sample-letters');
    sampleLettersDiv.innerHTML = '';
    lettersShuffledArray.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.innerText = letter;
        letterDiv.classList.add('letter-box', 'filled');
        sampleLettersDiv.appendChild(letterDiv);
    });
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const initializeGrid = () => {
    grid.innerHTML = '';
    const wordLength = wordToGuess.length;
    for (let i = 0; i < maxAttempts; i++) {
        const attemptRow = document.createElement('div');
        attemptRow.classList.add('attempt-row');
        for (let j = 0; j < wordLength; j++) {
            const letterBox = document.createElement('div');
            letterBox.classList.add('letter-box', 'empty');
            attemptRow.appendChild(letterBox);
        }
        grid.appendChild(attemptRow);
    }
};

const resetGame = () => {
    currentAttempt = [];
    currentRow = 0;
    gameOver = false;
    messageDiv.textContent = '';
};

const handleBackspace = () => {
    if (currentAttempt.length > 0 && !gameOver) {
        const rowElements = grid.children[currentRow].children;
        const position = currentAttempt.length - 1;
        rowElements[position].textContent = '';
        rowElements[position].classList.add('empty');
        rowElements[position].classList.remove('filled');
        currentAttempt.pop();
    }
};

const addLetter = (letter) => {
    if (currentAttempt.length < wordToGuess.length && !gameOver) {
        const rowElements = grid.children[currentRow].children;
        const position = currentAttempt.length;
        rowElements[position].textContent = letter.toUpperCase();
        rowElements[position].classList.remove('empty');
        rowElements[position].classList.add('filled');
        currentAttempt.push(letter.toUpperCase());
    }
};

const validateSampleLetters = () => {
    if (currentAttempt.length !== wordToGuess.length || gameOver) return;
    const sampleLettersDiv = document.getElementById("sample-letters");
    const attemptWord = currentAttempt.join('');
    Array.from(sampleLettersDiv.children).forEach(child => {
        if (attemptWord.includes(child.textContent)) {
            if (wordToGuess.includes(child.textContent) && wordToGuess[attemptWord.indexOf(child.textContent)] === child.textContent) {
                child.classList.add('correct');
                child.classList.remove('filled');
            } else {
                child.classList.add('present');
                child.classList.remove('filled');
            }
        }
    });
};

const validateAttempt = () => {
    if (currentAttempt.length !== wordToGuess.length || gameOver) return;
    const rowElements = grid.children[currentRow].children;
    const attemptWord = currentAttempt.join('');
    let correctCount = 0;
    const letterFrequency = {};
    for (const letter of wordToGuess) {
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
    }
    for (let i = 0; i < currentAttempt.length; i++) {
        const letter = currentAttempt[i];
        if (letter === wordToGuess[i]) {
            rowElements[i].classList.add('correct');
            rowElements[i].classList.remove('filled');
            letterFrequency[letter]--;
            correctCount++;
        }
    }
    for (let i = 0; i < currentAttempt.length; i++) {
        const letter = currentAttempt[i];
        if (letter === wordToGuess[i]) continue;
        else if (wordToGuess.includes(letter) && letterFrequency[letter] > 0) {
            rowElements[i].classList.add('present');
            rowElements[i].classList.remove('filled');
            letterFrequency[letter]--;
        } else {
            rowElements[i].classList.add('absent');
            rowElements[i].classList.remove('filled');
        }
    }
    if (correctCount === wordToGuess.length) {
        messageDiv.textContent = 'You won!';
        messageDiv.className = 'win-message';
        gameOver = true;
        return;
    }
    currentRow++;
    currentAttempt = [];
    if (currentRow >= maxAttempts) {
        messageDiv.textContent = `Game over! The word was ${wordToGuess}`;
        messageDiv.className = 'lose-message';
        gameOver = true;
    }
};

window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'enter') {
        validateAttempt();
        validateSampleLetters();
    } else if (key === 'backspace') {
        handleBackspace();
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        addLetter(key);
    }
});

nextWordBtn.addEventListener('click', fetchWord);
restartBtn.addEventListener('click', fetchWord);
window.onload = fetchWord;
