const body = document.querySelector('body');

let i = 0,
    cells = 16,
    color = '#212121',
    containerLength = 480;

//Container
const container = document.getElementById('grid');
function styleContainer(cells) {
    container.style.gridTemplateColumns = 'repeat(' + cells + ', 1fr)';
    container.style.gridAutoRows = containerLength/cells + 'px';
};

//Create colors
let colorOption = document.getElementsByClassName('color');

colorOption[0].onclick = function() { color = '#212121'; };
colorOption[1].onclick = function() { color = null; };
//colorOption[2].onclick = function() { color = 'green' };
colorOption[2].onclick = function() { color = 'white' };

function randomColor() {
    let r = Math.floor(Math.random() * 257) - 1;
    let g = Math.floor(Math.random() * 257) - 1;
    let b = Math.floor(Math.random() * 257) - 1;
    console.log(r + ' ' + g + ' ' + b);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
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
    };
};

//Size change request
document.getElementById('sizeChange').onclick = function(){
    //in case of cancel, saves orig cell count
    const origCells = cells;
    cells = prompt("What length would you like your new canvas? (MAX: 80)");
    
    while (isNaN(cells) == true || cells > 80 || cells <= 0) {
        cells = Number(prompt("Please enter a valid number (MAX: 80)"));
    }
    
    //if user cancels
    if (cells === null) {cells = origCells; return;};
    
    createGrid(cells);
    styleContainer(cells);
};

//Event
function changeColor(e) {
    if (isNaN(color)) {
        e.target.style.backgroundColor = color;  
    } else {
        e.target.style.backgroundColor = randomColor();
    }
};

function main() {
    createGrid(cells);
    styleContainer(cells);
};

main();

