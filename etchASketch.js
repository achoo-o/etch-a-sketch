const body = document.querySelector('body');

let i = 0,
    cells = 16,
    color = 'hsl(0, 0%, ' + '13%)',
    containerLength = 480;

//Container
const container = document.getElementById('grid');
function styleContainer(cells) {
    container.style.gridTemplateColumns = 'repeat(' + cells + ', 1fr)';
    container.style.gridAutoRows = containerLength/cells + 'px';
};

//Create colors
let colorOption = document.getElementsByClassName('color');

colorOption[0].onclick = function() { color = 'hsl(0, 0%, 13%)'; };
colorOption[1].onclick = function() { color = 'random'; };
colorOption[2].onclick = function() { color = 'shade'; };
colorOption[3].onclick = function() { color = 'hsl(0, 0%, 100%)'; };

function randomColor() {
    let h = Math.floor(Math.random() * 361);
    let s = Math.floor(Math.random() * 101 + 50);
    let l = 70 //Math.floor(Math.random() * 101);
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}

//Create Grid
function createGrid(cells) {
    let currentCells = document.getElementsByClassName('gridItem');
    while (i < currentCells.length) {
        container.removeChild(currentCells[0]);
    };
    for (let i = 0; i < cells*cells; i++) {
        let div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.style.opacity = '1';
        div.setAttribute('class','gridItem');
        div.addEventListener('mouseover',changeColor, false);
        container.appendChild(div);
    };
};

//Clear canvas
document.getElementById('reset').onclick = function(){
    let cellList = document.getElementsByClassName('gridItem');
    for (let i = 0; i < cells * cells; i++) {
        cellList[i].style.backgroundColor = 'white';
        cellList[i].style.opacity = '1';
    };
};

//Size change request
document.getElementById('sizeChange').onclick = function(){
    const origCells = cells;
    cells = prompt("What length would you like your new canvas? (MAX: 80)");
    
    while (isNaN(cells) == true || cells > 80) {
        cells = Number(prompt("Please enter a valid number (MAX: 80)"));
    }
    
    //if user cancels request
    if (cells === null) {cells = origCells; return;};
    
    createGrid(cells);
    styleContainer(cells);
};

//Event
function changeColor(event) {
    if (color === 'random') {
        this.style.opacity = '1';
        this.style.backgroundColor = randomColor();
    } else if (color === 'shade') {
        this.style.opacity = Number(this.style.opacity) - 0.1;
    } else {
        this.style.opacity = '1';
        this.style.backgroundColor = color;  
    }
};

function main() {
    createGrid(cells);
    styleContainer(cells);
};

main();

