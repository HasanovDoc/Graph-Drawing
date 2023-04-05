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
        //addEdgs(iter - 1, iter);
        drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
    }

    iter++
};

function drawC(event) { //По клику рисовать вершины.
    let label = "Node - " + iter;

    drawNode(event.offsetX, event.offsetY, label);
    addNodes(iter, event.offsetX, event.offsetY, label);
    if (iter >= 1) {
        //addEdgs(iter - 1, iter);
        drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
    }
    iter++;

};

function drawNodesCoG(event) { //Рисовать вершины по клику для отрисовки полного графа
    let label = "CG: " + iterCoGr;

    drawNode(event.offsetX, event.offsetY, label);
    addNodes(iterCoGr, event.offsetX, event.offsetY, label);
    if (iterCoGr >= 0) {
        for (let index = 0; index < iterCoGr; index++) {
            addEdgs(iterCoGr, index);
            //drawEdges(Nods[iterCoGr].X, Nods[iterCoGr].Y, Nods[index].X, Nods[index].Y);
            btnDrawedges.classList.add('visible');
        }
    }

    iterCoGr++;
}

function drawEdgesCoG() {
    for (let i = 0; i < iterCoGr; i++)
        for (let j = 0; j < i; j++)
            drawEdges(Nods[j].X, Nods[j].Y, Nods[i].X, Nods[i].Y);

}

function drawBipGraph() { //Рисование двудольного графа
    clearAll();
    let aVar = document.querySelector('#aValue').valueAsNumber;
    let bVar = document.querySelector('#bValue').valueAsNumber;
    let iterBip = 0;
    if (aVar >= 1 && bVar >= 1) {

        for (let i = 0; i < aVar; i++) { //Верхня линия
            addNodesLU(i, (canvas.width / (aVar + 1)) * (i + 1), canvas.height / 3, "A - " + i);
            drawNode(NodsLU[i].X, NodsLU[i].Y, NodsLU[i].label);
            iterBip++;
        }

        for (let j = 0; j < bVar; j++) { //Нижняя линия
            addNodesLD(j, (canvas.width / (bVar + 1)) * (j + 1), canvas.height / 1.2, "B - " + j);
            drawNode(NodsLD[j].X, NodsLD[j].Y, NodsLD[j].label);
            iterBip++;
        }

        for (let i = 0; i < NodsLU.length; i++)
            for (let j = 0; j < NodsLD.length; j++)
                drawEdges(NodsLU[i].X, NodsLU[i].Y, NodsLD[j].X, NodsLD[j].Y)
    } else {
        alert("Incorrect values for a bipartite graph")
    }


}

/////////////////////////////////////////////
function addEdgs(src, tgt) { //Добавление ребра
    Edgs.push({ source: src, target: tgt });
};

function addNodesLU(id, x, y, label) { //Добавление вершины для двудольного графа, верхняя линия
    NodsLU.push({ id: id, X: x, Y: y, label: label });
};

function addNodesLD(id, x, y, label) { //Добавление вершины для двудольного графа, нижняя линия
    NodsLD.push({ id: id, X: x, Y: y, label: label });
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

function clearAll() { //Функция очистки всех массивов и холста
    iter = 0;
    iterCoGr = 0;
    Nods.splice(0, Nods.length);
    Edgs.splice(0, Edgs.length);
    NodsLD.splice(0, NodsLD.length);
    NodsLU.splice(0, NodsLU.length);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//Для Отрисовки полного графа по кол - ву вершин
// let x_0 = canvas.width / 2;
// let y_0 = canvas.height / 2;
// let r = (canvas.height / 2) - 30;
// let ver = 15

// for (let i = 0; i < ver; i++) {
//     let XX = (x_0 + (r * Math.cos(2 * Math.PI * i / ver)));
//     let YY = (y_0 + (r * Math.sin(2 * Math.PI * i / ver)));
//     drawNode(XX, YY, "Circle - 1");
// }