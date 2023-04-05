Edgs = [];
Nods = [];
NodsLU = [];
NodsLD = [];
NodsC = [];

const drawMode = document.querySelector('#draw-select');
const btnDrawedges = document.querySelector('.btn-draw');
const bipBtn = document.querySelector('.bip-btn');

let iter = 0;
let iterCoGr = 0;

document.querySelector('.btn-clear').addEventListener('click', clearAll);

canvas.addEventListener('mousedown', DaDM);
canvas.addEventListener('click', DaDC);

drawMode.addEventListener('change', () => { //Режим рисования графов
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

bipBtn.addEventListener('click', drawBipGraph); //Полный двудольный граф

const librGraph = document.querySelector('.libr-graphs');
const confBtn_1 = document.querySelector('.configs_btn-1');
const confItems = document.querySelectorAll('.configs__item');
const inputConf = document.querySelector('.configs_input-1');

inputConf.addEventListener('change', drawL_1);
librGraph.addEventListener('change', () => {
    confItems.forEach(item => {
        item.classList.remove('visible');
    });

    if (librGraph.selectedIndex == 0) {
        confItems[0].classList.add('visible');
        inputConf.addEventListener('change', drawL_1);

    } else if (librGraph.selectedIndex == 1) {
        confItems[1].classList.add('visible');

    }
});