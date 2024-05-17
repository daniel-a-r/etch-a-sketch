const grid = document.querySelector('.grid');
const sizeBtn = document.querySelector('#update-grid-btn');
const clearBtn = document.querySelector('#clear-brid-btn');
const modeBtn = document.querySelector('#mode-btn');
let gridSize = 16;
const modes = ['Black', 'Random RGB', 'Darken']
let currentMode = 0;

createGrid(gridSize, currentMode);

sizeBtn.addEventListener('click', () => {
    gridSize = getUserInput();
    clearGrid();
});

clearBtn.addEventListener('click', () => {
    clearGrid();
});

modeBtn.addEventListener('click', () => {
    changeMode();
    clearGrid();
});

modeBtn.textContent = modes[currentMode];

function getUserInput() {
    let input;
    do {
        input = Number(prompt('Enter a number between 1 and 100'));
    } while (isNaN(input))

    if (input < 1) {
        input = 1;
    } else if (input > 100) {
        input = 100;
    } else {
        input = Math.round(input);
    }

    return input;
}

function changeMode() {
    currentMode === modes.length - 1 ? currentMode = 0 : currentMode++;
    modeBtn.textContent = modes[currentMode];
}

function clearGrid() {
    removeGrid();
    createGrid(gridSize, currentMode);
}

function removeGrid() {
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}

function createGrid(gridSize, mode) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            createTile(gridSize, mode);
        }
    }
};

function createTile(gridSize, mode) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.flexBasis = `${100 / gridSize}%`;
    switch (modes[currentMode]) {
        case 'Black':
            blackenTile(tile);
            break;
        case 'Random RGB':
            randomizeRGBTile(tile);
            break;
        case 'Darken':
            darkenTile(tile);
            break;
    }

    grid.appendChild(tile);
}

function addTileEventListener(tile, action) {
    tile.addEventListener('mouseover', () => {
        action(tile);
    });
}

function blackenTile(tile) {
    addTileEventListener(tile, blackenAction);
}

function blackenAction(tile) {
    if (tile.style.backgroundColor === '') {
        tile.style.backgroundColor = 'black';
    }
}

function randomizeRGBTile(tile) {
    addTileEventListener(tile, randomizeRGBAction);
}

function randomizeRGBAction(tile) {
    rgbValString = `rgb(${randomizeRGBValue()}, ${randomizeRGBValue()}, ${randomizeRGBValue()})`
    tile.style.backgroundColor = rgbValString;
}

function randomizeRGBValue() {
    rgbValue = Math.floor(Math.random() * 256);
    return rgbValue;
}

function darkenTile(tile) {
    tile.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    addTileEventListener(tile, darkenAction);
}

function darkenAction(tile) {
    const colorValueName = tile.style.backgroundColor.slice(0, 4)

    if (colorValueName === 'rgba') {
        const opacity = Number(tile.style.backgroundColor.at(-2));
        if (opacity === 9) {
            tile.style.backgroundColor = 'rgb(0, 0, 0)';
        } else {
            tile.style.backgroundColor = `rgba(0, 0, 0, 0.${opacity + 1})`;
        }
    }
}
