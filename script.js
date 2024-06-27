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

    createBoard(boardSize);
    displayWords(words);
});