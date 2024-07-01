const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍍', '🥝', '🍏', '🍌', '🍊'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const messageElement = document.getElementById('message');

let spinningIntervals = [null, null, null];
let stopCount = 0;

const symbolHeight = 100; // Height of each symbol in pixels
const symbolsToShow = 3; // Number of symbols visible in the reel

// Define target symbols for each reel
const targetSymbols = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
];

function clearReelContent(reel) {
    const reelInner = reel.querySelector('.reel-inner');
    while (reelInner.firstChild) {
        reelInner.removeChild(reelInner.firstChild);
    }
}

function createReelContent(reel, targetSymbol) {
    const reelInner = reel.querySelector('.reel-inner');
    const index = symbols.indexOf(targetSymbol);
    const adjustedSymbols = symbols.slice(index).concat(symbols.slice(0, index));
    
    // Clear any existing content
    clearReelContent(reel);

    // Create symbols to fill the reel
    for (let i = 0; i < adjustedSymbols.length + symbolsToShow; i++) {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.textContent = adjustedSymbols[i % adjustedSymbols.length];
        reelInner.appendChild(symbolElement);
    }
}

// Initialize reels with fixed symbols and target positions
createReelContent(reel1, targetSymbols[0]);
createReelContent(reel2, targetSymbols[1]);
createReelContent(reel3, targetSymbols[2]);

startButton.addEventListener('click', function() {
    if (!spinningIntervals.some(interval => interval !== null)) {
        startSpin();
    }
});

stopButton.addEventListener('click', function() {
    if (stopCount < 3) {
        stopCount++;
        stopReel(stopCount);
        if (stopCount === 3) {
            stopButton.disabled = true;
            startButton.disabled = false;
        }
    }
});

function startSpin() {
    stopCount = 0;
    clearReelContent(reel1);
    clearReelContent(reel2);
    clearReelContent(reel3);
    createReelContent(reel1, targetSymbols[0]);
    createReelContent(reel2, targetSymbols[1]);
    createReelContent(reel3, targetSymbols[2]);

    startButton.disabled = true;
    stopButton.disabled = false;

    spinningIntervals[0] = setInterval(() => shiftSymbols(reel1), 300); // Adjusted interval for slower spin
    spinningIntervals[1] = setInterval(() => shiftSymbols(reel2), 300); // Adjusted interval for slower spin
    spinningIntervals[2] = setInterval(() => shiftSymbols(reel3), 300); // Adjusted interval for slower spin
}

function stopReel(count) {
    switch (count) {
        case 1:
            clearInterval(spinningIntervals[0]);
            spinningIntervals[0] = null;
            break;
        case 2:
            clearInterval(spinningIntervals[1]);
            spinningIntervals[1] = null;
            break;
        case 3:
            clearInterval(spinningIntervals[2]);
            spinningIntervals[2] = null;
            break;
    }
}

function shiftSymbols(reel) {
    const reelInner = reel.querySelector('.reel-inner');
    const firstSymbol = reelInner.firstElementChild;
    reelInner.appendChild(firstSymbol.cloneNode(true));
    reelInner.removeChild(firstSymbol);

    // Check if reel1 and reel2 symbols match
    if (reel === reel1 && reel1.querySelector('.symbol').textContent === reel2.querySelector('.symbol').textContent) {
        showChanceMessage();
    }
}

function showChanceMessage() {
    messageElement.textContent = 'CHANCE';
    messageElement.classList.add('show');
}

function hideChanceMessage() {
    messageElement.textContent = '';
    messageElement.classList.remove('show');
}

function shuffleSymbols() {
    for (let i = symbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
    }
}
