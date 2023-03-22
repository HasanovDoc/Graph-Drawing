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

function drawC(event){ //По клику рисовать вершины.
    let label = "Node - " + iter;

    drawNode(event.offsetX, event.offsetY, label);
    addNodes(iter, event.offsetX, event.offsetY, label);
    if (Nods.length >= 2) {
        addEdgs(iter - 1, iter);
        drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
    }
    iter++;

}