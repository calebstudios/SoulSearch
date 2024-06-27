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
    let isSelecting = false;
    let selectedCells = [];
    let startCell = null;
    let direction = null;

    // Create the game board
    function createBoard(size) {
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-letter', '');
            cell.addEventListener('mousedown', startSelection);
            cell.addEventListener('mouseover', continueSelection);
            cell.addEventListener('mouseup', endSelection);
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

    // Start selecting cells
    function startSelection(event) {
        isSelecting = true;
        selectedCells = [];
        startCell = event.target;
        direction = null;
        selectCell(event.target);
    }

    // Continue selecting cells
    function continueSelection(event) {
        if (isSelecting && startCell) {
            const cell = event.target;
            if (!direction) {
                direction = determineDirection(startCell, cell);
            }
            if (isValidSelection(cell)) {
                selectCell(cell);
            }
        }
    }

    // End selecting cells
    function endSelection() {
        isSelecting = false;
        checkSelectedWord();
    }

    // Select a cell
    function selectCell(cell) {
        if (!selectedCells.includes(cell) && cell.classList.contains('cell')) {
            cell.classList.add('selected');
            selectedCells.push(cell);
        }
    }

    // Check if the selected cells form a valid word
    function checkSelectedWord() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        const selectedWordReversed = selectedCells.map(cell => cell.textContent).reverse().join('');

        if (words.includes(selectedWord) || words.includes(selectedWordReversed)) {
            selectedCells.forEach(cell => {
                cell.classList.add('found');
                cell.classList.remove('selected');
            });
        } else {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
        }
        selectedCells = [];
    }

    // Determine the direction of the selection
    function determineDirection(start, end) {
        const startIdx = Array.prototype.indexOf.call(board.children, start);
        const endIdx = Array.prototype.indexOf.call(board.children, end);

        const startRow = Math.floor(startIdx / boardSize);
        const startCol = startIdx % boardSize;
        const endRow = Math.floor(endIdx / boardSize);
        const endCol = endIdx % boardSize;

        if (startRow === endRow) {
            return 'horizontal';
        } else if (startCol === endCol) {
            return 'vertical';
        }
        return null;
    }

    // Validate the selection
    function isValidSelection(cell) {
        const lastCell = selectedCells[selectedCells.length - 1];
        if (!lastCell) return true;

        const lastIdx = Array.prototype.indexOf.call(board.children, lastCell);
        const cellIdx = Array.prototype.indexOf.call(board.children, cell);

        if (direction === 'horizontal') {
            return Math.floor(lastIdx / boardSize) === Math.floor(cellIdx / boardSize);
        } else if (direction === 'vertical') {
            return lastIdx % boardSize === cellIdx % boardSize;
        }
        return false;
    }

    initGame();
});