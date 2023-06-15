const boardEl = document.getElementById("board");
const redPlayerEl = document.getElementById("redPlayer");
const yellowPlayerEl = document.getElementById("yellowPlayer");

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
    column.setAttribute("id",`column-${i}`);
    boardEl.appendChild(column);
    board[i] = {}; // Initialize object
    columnClicks[i] = 0; // Initialize column click count

    const columnEl = document.getElementById(`column-${i}`)

    // Circles
    for (let j = 6; j > 0; j--) {
        const circle = document.createElement('div');
        circle.className = "circle";
        circle.setAttribute("id",`circle-${i}-${j}`);
        columnEl.appendChild(circle);
        board[i][j] = "none"; // Set default values for circles keys to "none"
    }
    
    // Handle click by the user
    columnEl.addEventListener("click", handleClick);
    function handleClick() {
        count += 1;
        const circleNum = columnClicks[i]+1; // Calculate circle number based on click count
        if (board[i][circleNum] === "none"){
            if (count % 2 === 1) {
                board[i][circleNum] = "red";
                renderCircle(i, circleNum, "red")
            } else {
                board[i][circleNum] = "yellow";
                renderCircle(i, circleNum, "yellow")
            }
            columnClicks[i] += 1; // Increment the click count for the column
        }
    }
}

function renderCircle(columnNum, circleNum, color) {
    let circleEl = document.getElementById(`circle-${columnNum}-${circleNum}`);
    circleEl.className = `circle ${color}`;
}