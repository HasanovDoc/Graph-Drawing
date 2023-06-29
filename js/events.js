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
        btnDrawedges.classList.add('visible');
        btnDrawedges.addEventListener('click', drawEdgesCoG);
        printTip('Нажмите что-бы нарисовать вершину.', true);

    } else if (drawMode.selectedIndex == 0) {

        //Рисование путем Drag&Drop
        canvas.addEventListener('mousedown', DaDM);
        canvas.addEventListener('click', DaDC);
        printTip('Нажмите и удерживайте что-бы нарисовать две вершины с ребром между ними.', true);
        /////////////////////////
    } else if (drawMode.selectedIndex == 2) {

        printTip("Нажмите и удерживайте, чтобы соединить вершины", true)
        canvas.addEventListener('mousedown', drawEdgeDrag);
        canvas.addEventListener('mouseup', drawEdgeDrop);


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
        removeEventDrawMode();

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
const algChild = document.querySelectorAll('#algorithms option');

algoritm.addEventListener('change', () => { //Алгоритмы
    switch (algoritm.selectedIndex) {
        case 1:
            removeEventDrawMode();
            printTip('Выберите начальную вершину', true)

            canvas.addEventListener('click', searchDepth);
            algoritm.selectedIndex = 0;
            break;
        case 2:
            removeEventDrawMode();
            printTip('Выберите начальную вершину', true);
            canvas.addEventListener('click', searchBreadth);
            algoritm.selectedIndex = 0;
            break;

        case 3:
            const parosch = maxPairsOfGraph(transform(Edgs));
            printTip("Паросочетание:", true);
            for (const pairNodes of parosch) {
                printTip("{" + pairNodes + "}");
                ctx.lineWidth = 8;
                ctx.strokeStyle = "red";

                const sourceNode = getNodeById(Number(pairNodes[0]));
                const targetNode = getNodeById(pairNodes[1]);

                if (sourceNode && targetNode) {
                    drawEdges(sourceNode.X, sourceNode.Y, targetNode.X, targetNode.Y);
                }
            }

            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            redrawNodes();
            algoritm.selectedIndex = 0;

            break;

        case 4:
            //const parosch1 = finalMaxPairs(transform(Edgs));
            finalMaxPairs(transform(Edgs));
            printTip("Паросочетание:", true);

            answer.splice(2, answer.length);
            answer[0] = [answer[0][0], answer[0][1]];
            answer[1] = answer[1].filter(function(item) {
                return item !== -1;
            });
            //console.log(answer);

            printTip(answer);
            // for (const pairNodes in parosch1) {
            //     printTip("{" + pairNodes + "}");
            //     ctx.lineWidth = 8;
            //     ctx.strokeStyle = "red";

            //     const sourceNode = getNodeById(Number(pairNodes[0]));
            //     const targetNode = getNodeById(pairNodes[1]);

            //     if (sourceNode && targetNode) {
            //         drawEdges(sourceNode.X, sourceNode.Y, targetNode.X, targetNode.Y);
            //     }
            // }
            // console.log(answer[0]);


            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            redrawNodes();
            algoritm.selectedIndex = 0;

            break;

        default:
            break;
    }
})