Edgs = [];
Nods = [];
const switcher = document.querySelector('.swicher-btn');
let iter = 0;

switcher.addEventListener('change', ()=>{

if (switcher.checked) {
    canvas.removeEventListener('mousedown', DaDM);
    canvas.removeEventListener('click', DaDC);

    canvas.addEventListener('click', drawC);
}else if (!switcher.checked){
    canvas.removeEventListener('click', drawC);
    //Рисование путем Drag&Drop
    canvas.addEventListener('mousedown', DaDM);
    canvas.addEventListener('click', DaDC);
}
/////////////////////////
});

function addEdgs(src, tgt) { //Добавление ребра
    Edgs.push({ source: src, target: tgt });
};

function addNodes(id, x, y, label) { //Добавление вершины
    Nods.push({ id: id, X: x, Y: y, label: label });
};

function drawEdges(sX, sY, tX, tY) { //Функция отрисовки ребра
    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(tX, tY);
    ctx.stroke();
};

function drawNode(x, y, label) { //функция отрисовки одной вершины
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
};