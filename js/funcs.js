function DaDM(event) {
    let label = "Node - " + iter;

    addNodes(iter, event.offsetX, event.offsetY, label);
    drawNode(event.offsetX, event.offsetY, label);

    iter++
};

function DaDC(event) {
    let label = "Node - " + iter;

    addNodes(iter, event.offsetX, event.offsetY, label);
    drawNode(event.offsetX, event.offsetY, label);

    if (Nods.length >= 2) {
        addEdgs(iter - 1, iter);
        drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
    }

    iter++
};

function drawC(event) { //По клику рисовать вершины.
    let label = "Node - " + iter;

    drawNode(event.offsetX, event.offsetY, label);
    addNodes(iter, event.offsetX, event.offsetY, label);
    if (Nods.length >= 2) {
        addEdgs(iter - 1, iter);
        drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
    }
    iter++;

};

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