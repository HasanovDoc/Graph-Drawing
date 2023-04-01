Edgs = [];
Nods = [];
const drawMode = document.querySelector('#draw-select');
const btnDrawedges = document.querySelector('.btn-draw');
let iter = 0;
let iterCoGr = 0;

document.querySelector('.btn-clear').addEventListener('click', clearAll);

canvas.addEventListener('mousedown', DaDM);
canvas.addEventListener('click', DaDC);

drawMode.addEventListener('change', () => {
    clearAll();
    btnDrawedges.classList.remove('visible');
    if (drawMode.selectedIndex == 1) {
        canvas.removeEventListener('mousedown', DaDM);
        canvas.removeEventListener('click', DaDC);
        canvas.removeEventListener('click', drawNodesCoG);

        canvas.addEventListener('click', drawC);
    } else if (drawMode.selectedIndex == 0) {
        canvas.removeEventListener('click', drawC);
        canvas.removeEventListener('click', drawNodesCoG);

        //Рисование путем Drag&Drop
        canvas.addEventListener('mousedown', DaDM);
        canvas.addEventListener('click', DaDC);
        /////////////////////////
    } else if (drawMode.selectedIndex == 2) {
        canvas.removeEventListener('click', drawC);
        canvas.removeEventListener('mousedown', DaDM);
        canvas.removeEventListener('click', DaDC);

        canvas.addEventListener('click', drawNodesCoG);
        btnDrawedges.addEventListener('click', drawEdgesCoG);
    }
});