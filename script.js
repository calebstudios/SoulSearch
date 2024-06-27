document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 10;
    const words = [
        "arse", "arsehead", "arsehole", "ass", "ass hole", "asshole",
        "bastard", "bitch", "bloody", "bollocks", "brotherfucker", "bugger", "bullshit",
        "child-fucker", "Christ on a bike", "Christ on a cracker", "cock", "cocksucker", "crap", "cunt",
        "dammit", "damn", "damn it", "damned", "dick", "dick-head", "dickhead", "dumb ass", "dumb-ass", "dumbass", "dyke",
        "father-fucker", "fatherfucker", "frigger", "fuck", "fucker", "fucking",
        "god dammit", "God damn", "god damn", "goddammit", "goddamn", "Goddamn", "goddamned", "goddamnit", "godsdamn",
        "hell", "holy shit", "horseshit",
        "in shit",
        "jack-ass", "jackarse", "jackass", "Jesus Christ", "Jesus fuck", "Jesus H. Christ", "Jesus Harold Christ", "Jesus, Mary and Joseph", "Jesus wept",
        "kike",
        "mother fucker", "mother-fucker", "motherfucker",
        "nigga", "nigra",
        "pigfucker", "piss", "prick", "pussy",
        "shit", "shit ass", "shite", "sibling fucker", "sisterfuck", "sisterfucker", "slut", "son of a whore", "son of a bitch", "spastic", "sweet Jesus",
        "twat",
        "wanker"
    ];

    const board = document.getElementById('board');
    const wordList = document.getElementById('word-list');

    // Create the game board
    function createBoard(size) {
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = '';
            board.appendChild(cell);
        }
    }

    // Display the words to find
    function displayWords(words) {
        words.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.classList.add('word');
            wordElement.textContent = word;
            wordList.appendChild(wordElement);
        });
    }

    // Initialize game
    function initGame() {
        createBoard(boardSize);
        displayWords(words);
        placeWords(words);
    }

    // Place words on the board
    function placeWords(words) {
        words.forEach(word => {
            let placed = false;
            while (!placed) {
                const direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
                const row = Math.floor(Math.random() * boardSize);
                const col = Math.floor(Math.random() * boardSize);

                if (direction === 0 && col + word.length <= boardSize) {
                    // Place horizontally
                    let canPlace = true;
                    for (let i = 0; i < word.length; i++) {
                        const cell = board.children[row * boardSize + col + i];
                        if (cell.textContent !== '') {
                            canPlace = false;
                            break;
                        }
                    }
                    if (canPlace) {
                        for (let i = 0; i < word.length; i++) {
                            const cell = board.children[row * boardSize + col + i];
                            cell.textContent = word[i];
                        }
                        placed = true;
                    }
                } else if (direction === 1 && row + word.length <= boardSize) {
                    // Place vertically
                    let canPlace = true;
                    for (let i = 0; i < word.length; i++) {
                        const cell = board.children[(row + i) * boardSize + col];
                        if (cell.textContent !== '') {
                            canPlace = false;
                            break;
                        }
                    }
                    if (canPlace) {
                        for (let i = 0; i < word.length; i++) {
                            const cell = board.children[(row + i) * boardSize + col];
                            cell.textContent = word[i];
                        }
                        placed = true;
                    }
                }
            }
        });
    }

    initGame();
});