const boardEl = document.getElementById("board");
const redPlayerEl = document.getElementById("redPlayer");
const yellowPlayerEl = document.getElementById("yellowPlayer");
const alertEl = document.getElementById("alert");

let board = {};
let columnClicks = {}; // Track the number of clicks in each column
let count = 0;
let redPoints = 0;
let yellowPoints = 0;
let repetition = 0;

// Create Columns & Circles & Handle clicks in the Columns
for (let i = 1; i < 8; i++) {
    // Columns
    const column = document.createElement('div');
    column.className = "column";
    column.setAttribute("id", `column-${i}`);
    boardEl.appendChild(column);
    board[i] = {}; // Initialize object
    columnClicks[i] = 0; // Initialize column click count

    const columnEl = document.getElementById(`column-${i}`)

    // Circles
    for (let j = 6; j > 0; j--) {
        const circle = document.createElement('div');
        circle.className = "circle";
        circle.setAttribute("id", `circle-${i}-${j}`);
        columnEl.appendChild(circle);
        board[i][j] = "none"; // Set default values for circles keys to "none"
    }

    // Handle click(s) by the user
    columnEl.addEventListener("click", handleClick);
    function handleClick() {
        count += 1;
        const circleNum = columnClicks[i] + 1; // Calculate circle number based on click count
        if (board[i][circleNum] === "none") {
            if (count % 2 === 1) {
                board[i][circleNum] = "red";
                renderCircle(i, circleNum, "red")
            } else {
                board[i][circleNum] = "yellow";
                renderCircle(i, circleNum, "yellow")
            }
            columnClicks[i] += 1; // Increment the click count for the column
        }
        //console.log(listenGame(i, circleNum));
        let winnerColor = listenGame(i, circleNum)
        console.log(winnerColor);
        (winnerColor) ? stopGame(winnerColor) : console.log("Keep playing!")
    }
}

// Render the circle
function renderCircle(columnNum, circleNum, color) {
    const circleEl = document.getElementById(`circle-${columnNum}-${circleNum}`);
    circleEl.className = `circle ${color}`;
}

// Listen clicks of players to check if there's repetition
function listenGame(columnNum, rowNum) {
    const color = board[columnNum][rowNum];
    //console.log(color)

    function updateRepetitions(column, row) {
        if (board[column][row] === color) {
            repetition++;
            if (repetition === 4) return color;
        } else {
            repetition = 0;
        }
    }

    // Check for Vertical Repetitions
    for (let i = 1; i <= 6; i++) {
        updateRepetitions(columnNum, i);
    }

    // Check for Horizontal Repetitions
    for (let i = 1; i < 8; i++) {
        updateRepetitions(i, rowNum);
    }

    // TODO: Check for diagonal repetitions (top-left to bottom-right) ↘↖

    let badPairs = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [3, 1], [5, 6], [6, 6], [6, 5], [7, 6], [7, 5], [7, 4]]
    let currentPos = [columnNum, rowNum]
    for (let i = 0; i < badPairs.length; i++) {
        if (currentPos[0] === badPairs[i][0] && currentPos[1] === badPairs[i][1]) {
            return console.log("You'll be skipped!")
        }
    }

    console.log("You're okay");


    // Going through diagonal lines (12 lines in total)
    for (let lineNum = 1; lineNum < 13; lineNum++) {
        console.log(`lineNum: ${lineNum}`);
        displayCircles(lineNum)
    }

    // Display circle positions according to the lineNum argument(⏫)
    function displayCircles(lineNumber, i, j) {
        if (lineNumber <= 6) { // If lineNumber is equal or less than 6
            i = 1;
            j = lineNumber;
        } else { // If lineNumber is higher than 6
            i = lineNumber - 6 + 1;
            j = 6;
        }

        while (i <= 7 && j >= 1) { // column(until 7) and row(from 1) ranks
            console.log(`i: ${i}, j: ${j}`);
            //updateRepetitions(i, j); // TODO: Keep working on updating the repetitions, so color winner will be returned
            i++;
            j--;
        }
    }

    

    // TODO: Check for diagonal repetitions (top-right to bottom-left) ↙↗
    
}

// Stop Game
function stopGame(winnerColor) {
    // Set the winner & Update the DOM
    (winnerColor === "red") ? redPoints += 1 : yellowPoints += 1
    redPlayerEl.textContent = redPoints;
    yellowPlayerEl.textContent = yellowPoints;

    // Display alert
    const h2 = document.createElement('h2');
    h2.textContent = "Game Over!";
    h2.className = "message";
    alertEl.className = "container";
    alertEl.appendChild(h2);

    setTimeout(resetGame, 5000)
}

// Reset Game
function resetGame() {
    // Default Values
    for (let i = 1; i < 8; i++) {
        for (let j = 6; j > 0; j--) {
            const circle = document.getElementById(`circle-${i}-${j}`);
            circle.className = "circle";
            board[i][j] = "none";
            columnClicks[i] = 0;
        }
    }
    count = 0; // Next game, it will start with "red"

    // Remove Alert
    alertEl.className = "";
    alertEl.replaceChildren();
}

// ... TODO: Set page to be responsive