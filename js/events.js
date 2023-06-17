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
    //clearAll();
    removeEventDrawMode();
    btnDrawedges.classList.remove('visible');
    if (drawMode.selectedIndex == 1) {

        canvas.addEventListener('click', drawC);
    } else if (drawMode.selectedIndex == 0) {

        //Рисование путем Drag&Drop
        canvas.addEventListener('mousedown', DaDM);
        canvas.addEventListener('click', DaDC);
        /////////////////////////
    } else if (drawMode.selectedIndex == 2) {

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

///////Перемещение вершин
const btnMove = document.querySelector('.btn-move');
let moveActive = false;
btnMove.addEventListener("click", () => {
    if (!moveActive) {
        canvas.removeEventListener("mousedown", DaDM);
        canvas.removeEventListener("click", DaDC);
        canvas.removeEventListener("click", drawC);
        canvas.removeEventListener("click", drawNodesCoG);
        btnDrawedges.removeEventListener("click", drawEdgesCoG);

        canvas.addEventListener("mousedown", startDragging);
        canvas.addEventListener("mousemove", drag);
        canvas.addEventListener("mouseup", stopDragging);

        moveActive = true;

        btnMove.classList.add('active-move');
    } else {
        btnMove.classList.remove('active-move');

        canvas.removeEventListener("mousedown", startDragging);
        canvas.removeEventListener("mousemove", drag);
        canvas.removeEventListener("mouseup", stopDragging);

        moveActive = false;
    }
});

////////////////Алгоритмы
const algoritm = document.querySelector('#algorithms');
console.log();

algoritm.addEventListener('change', () => {
    switch (algoritm.selectedIndex) {
        case 1:
            canvas.removeEventListener("mousedown", DaDM);
            canvas.removeEventListener("click", DaDC);
            canvas.removeEventListener("click", drawC);
            canvas.removeEventListener("click", drawNodesCoG);
            btnDrawedges.removeEventListener("click", drawEdgesCoG);

            printTip('Выберите начальную вершину', true)

            let startNode = null;

            canvas.addEventListener('click', searchDepth);

            break;

        default:
            break;
    }
})