Edgs = [];
Nods = [];
const drawMode = document.querySelector('#draw-select');
const btnDrawedges = document.querySelector('.btn-draw');
let iter = 0;
let iterCoGr = 0;

canvas.addEventListener('mousedown', DaDM);
canvas.addEventListener('click', DaDC);

drawMode.addEventListener('change', () => {
    if (drawMode.selectedIndex == 1) {
        canvas.removeEventListener('mousedown', DaDM);
        canvas.removeEventListener('click', DaDC);

        canvas.addEventListener('click', drawC);
    } else if (drawMode.selectedIndex == 0) {
        canvas.removeEventListener('click', drawC);
        //Рисование путем Drag&Drop
        canvas.addEventListener('mousedown', DaDM);
        canvas.addEventListener('click', DaDC);
        /////////////////////////
    } else if (drawMode.selectedIndex == 2) {
        canvas.removeEventListener('click', drawC);
        canvas.removeEventListener('mousedown', DaDM);
        canvas.removeEventListener('click', DaDC);

        canvas.addEventListener('click', drawNodesCoG);
    }
});