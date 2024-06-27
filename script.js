document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 10;
    const words = [
        "JAVASCRIPT",
        "HTML",
        "CSS",
        "PYTHON",
        "JAVA",
        "RUBY",
        "SWIFT",
        "KOTLIN",
        "REACT",
        "ANGULAR"
    ];

    const board = document.getElementById('board');
    const wordList = document.getElementById('word-list');

    // Create the game board
    function createBoard(size) {
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-letter', '');
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
        fillEmptyCells();
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
 // Fill empty cells with random letters
    function fillEmptyCells() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = board.children[i];
            if (cell.textContent === '') {
                const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
                cell.textContent = randomLetter;
            }
        }
    }

    initGame();
});
    initGame();
});