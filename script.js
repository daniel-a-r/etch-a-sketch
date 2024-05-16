const grid = document.querySelector('.grid');

let gridSize = 27;

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.flexBasis = `${100 / gridSize}%`
        grid.appendChild(tile);
    }
}
