const boardEl = document.getElementById("board");
const redPlayerEl = document.getElementById("redPlayer");
const yellowPlayerEl = document.getElementById("yellowPlayer");
const alertEl = document.getElementById("alert");

let board = {};
let columnClicks = {}; // Track the number of clicks in each column
let count = 0;
let redPoints = 0;
let yellowPoints = 0;

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
    let repetition = 0;
    let verticalRepetition = 0;
    let horizontalRepetition = 0;
    let diagonal1Repetition = 0;
    let diagonal2Repetition = 0;

    function updateRepetitions(column, row, connectionType) {
        if (board[column][row] === color) {
            switch (connectionType) {
                case "vertical":
                    verticalRepetition++;
                    repetition = verticalRepetition;
                    break;
                case "horizontal":
                    horizontalRepetition++;
                    repetition = horizontalRepetition;
                    break;
                case "diagonal1":
                    diagonal1Repetition++;
                    repetition = diagonal1Repetition;
                    break;
                case "diagonal2":
                    diagonal2Repetition++;
                    repetition = diagonal2Repetition;
                    break;
            }
            if (repetition === 4) return true;
        } else {
            switch (connectionType) {
                case "vertical":
                    verticalRepetition = 0;
                    break;
                case "horizontal":
                    horizontalRepetition = 0;
                    break;
                case "diagonal1":
                    diagonal1Repetition = 0;
                    break;
                case "diagonal2":
                    diagonal2Repetition = 0;
                    break;
            }
        }
        return false;
    }



    // ------ Check for VERTICAL Repetitions ----------
    for (let i = 1; i <= 6; i++) {
        if (updateRepetitions(columnNum, i, "vertical")) return color;
    }

    // ------ Check for HORIZONTAL Repetitions --------
    for (let i = 1; i < 8; i++) {
        if (updateRepetitions(i, rowNum, "horizontal")) return color;
    }

    // -------- DIAGONAL1 ↘↖ (top-left to bottom-right) -----------
    // Get lineNumber corresponding to column and row given by the user
    function getLineNum(column, row) {
        let sum = column + row;
        return sum - 1;
    }

    // Check circle positions according to the lineNum argument(⏬) & use updateRepetitions()
    function checkCircles(lineNumber, c, r) {
        let result = false;
        if (lineNumber <= 6) { // If lineNumber is equal or less than 6
            c = 1;
            r = lineNumber;
        } else { // If lineNumber is higher than 6
            c = lineNumber - 6 + 1;
            r = 6;
        }

        while (c <= 7 && r >= 1) { // column(until 7) and row(from 1) ranks
            //console.log(`Column: ${c}, Row: ${r}`);
            if (updateRepetitions(c, r, "diagonal1")) {
                result = true;
                break;
            }
            c++;
            r--;
        }
        return result;
    }
    // Run above functions to get the results of ↘↖
    let lineNum = getLineNum(columnNum, rowNum)
    //console.log("1. Line Num: " + lineNum);
    let isRepetition = checkCircles(lineNum);
    console.log(isRepetition);
    if (isRepetition) return color;



    // ------- DIAGONAL2 ↙↗ (top-right to bottom-left) -----------
    function getLineNum2(column, row) {
        let subtraction = row - column;
        return 7 + subtraction;
    } 

    // Check circle positions according to the lineNum argument(⏬) & use updateRepetitions()
    function checkCircles2(lineNumber, c, r) {
        let result = false;
        if (lineNumber <= 6) { // If lineNumber is equal or less than 6
            c = 7;
            r = lineNumber;
        } else { // If lineNumber is higher than 6
            c = 13 - lineNumber;
            r = 6;
        }

        while (c >= 1 && r >= 1) { // column(from 1) and row(from 1) ranks
            //console.log(`2. Column: ${c}, Row: ${r}`);
            if (updateRepetitions(c, r, "diagonal2")) {
                result = true;
                break;
            }
            c--;
            r--;
        }
        return result;
    }
    // Run above functions to get the results of ↙↗
    let lineNum2 = getLineNum2(columnNum, rowNum)
    //console.log("Line Num 2: " + lineNum2);
    let isRepetition2 = checkCircles2(lineNum2);
    console.log(isRepetition2);
    if (isRepetition2) return color;

    return false;
}

// Stop Game
function stopGame(winnerColor) {
    // Set the winner & Update the DOM
    (winnerColor === "red") ? redPoints += 1 : yellowPoints += 1
    redPlayerEl.textContent = redPoints;
    yellowPlayerEl.textContent = yellowPoints;

    // Display alert
    const h2 = document.createElement('h2');
    h2.textContent = `Winner: ${winnerColor}`;
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