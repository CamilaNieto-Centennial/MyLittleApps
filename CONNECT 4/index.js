const boardEl = document.getElementById("board");

// Create Columns & Circles
for (let i = 0; i < 7; i++) {
    // Columns
    let column = document.createElement('div');
    column.className = "column";
    column.setAttribute("id",`column-${i}`);
    boardEl.appendChild(column);

    let columnEl = document.getElementById(`column-${i}`)

    // Circles
    for (let j = 0; j < 6; j++) {
        let circle = document.createElement('div');
        circle.className = "circle";
        circle.setAttribute("id",`circle-${i}-${j}`);
        columnEl.appendChild(circle);
    }
}

