let isSelect = false
let selNode = null

function DaDM(event) { //Рисовать drag&drop, drag
    isSelect = false
    selNode = null

    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    for (let node of Nods) {
        let distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            isSelect = true
            selNode = node;
            break;
        }
    }
    if (!isSelect) {
        let label = "Node - " + iter;

        addNodes(iter, event.offsetX, event.offsetY, label);
        drawNode(event.offsetX, event.offsetY, label);

        iter++
    }

};

function DaDC(event) { //Рисовать drag&drop, drop
    let label = "Node - " + iter;

    addNodes(iter, event.offsetX, event.offsetY, label);
    drawNode(event.offsetX, event.offsetY, label);

    if (!isSelect) {
        if (Nods.length >= 2) {
            addEdgs(iter - 1, iter);
            drawEdges(Nods[iter - 1].X, Nods[iter - 1].Y, Nods[iter].X, Nods[iter].Y);
        }
    } else {
        if (Nods.length >= 2) {
            addEdgs(selNode.id, iter);
            drawEdges(Nods[selNode.id].X, Nods[selNode.id].Y, Nods[iter].X, Nods[iter].Y);
        }
    }

    iter++
};

function drawC(event) { //По клику рисовать вершины.
    let label = "Node - " + iter;

    drawNode(event.offsetX, event.offsetY, label);
    addNodes(iter, event.offsetX, event.offsetY, label);

    iter++;

};

let [isSelect_1, selectNode_1] = [];
let [isSelect_2, selectNode_2] = [];

function drawEdgeDrag(event) { //Рисовать ребра между вершинами drag

    [isSelect_1, selectNode_1] = isSelected(event);

}

function drawEdgeDrop(event) { //Рисовать ребра между вершинами drop
    [isSelect_2, selectNode_2] = isSelected(event);

    if (isSelect_1 && isSelect_2) {

        addEdgs(selectNode_1.id, selectNode_2.id);
        drawEdges(Nods[selectNode_1.id].X, Nods[selectNode_1.id].Y, Nods[selectNode_2.id].X, Nods[selectNode_2.id].Y);

    }

}

function drawEdgesCoG() {
    for (let i = 0; i < iter; i++)
        for (let j = 0; j < i; j++) {
            addEdgs(j, i);
        }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawGraph();

}

function drawBipGraph() { //Рисование двудольного графа
    clearAll();
    let aVar = document.querySelector('#aValue').valueAsNumber;
    let bVar = document.querySelector('#bValue').valueAsNumber;
    let iterBip = 0;
    if (aVar >= 1 && bVar >= 1) {

        for (let i = 0; i < aVar; i++) { //Верхня линия
            addNodesC(NodsLU, i, (canvas.width / (aVar + 1)) * (i + 1), canvas.height / 3, "A - " + i);
            drawNode(NodsLU[i].X, NodsLU[i].Y, NodsLU[i].label);
            iterBip++;
        }

        for (let j = 0; j < bVar; j++) { //Нижняя линия
            addNodesC(NodsLD, j, (canvas.width / (bVar + 1)) * (j + 1), canvas.height / 1.2, "B - " + j);
            drawNode(NodsLD[j].X, NodsLD[j].Y, NodsLD[j].label);
            iterBip++;
        }

        for (let i = 0; i < NodsLU.length; i++)
            for (let j = 0; j < NodsLD.length; j++) {
                addEdgs(i, j);
                drawEdges(NodsLU[i].X, NodsLU[i].Y, NodsLD[j].X, NodsLD[j].Y);
            }
    } else {
        alert("Incorrect values for a bipartite graph")
    }


}

function drawL_1() {
    clearAll();
    let numVert = document.querySelector('.configs_input-1').valueAsNumber;

    //Для Отрисовки полного графа по кол - ву вершин
    let x_0 = canvas.width / 2;
    let y_0 = canvas.height / 2;
    let r = (canvas.height / 2) - 30;
    //let ver = 15

    for (let i = 0; i < numVert; i++) {
        let label = "Cir - " + i;
        let XX = (x_0 + (r * Math.cos(2 * Math.PI * i / numVert)));
        let YY = (y_0 + (r * Math.sin(2 * Math.PI * i / numVert)));
        addNodesC(NodsC, i, XX, YY, label);
    }

    for (let i = 0; i < numVert; i++) {
        for (let j = 0; j < i; j++) {
            addEdgs(j, i);
            drawEdges(NodsC[j].X, NodsC[j].Y, NodsC[i].X, NodsC[i].Y);
        }
    }
    for (let i = 0; i < numVert; i++)
        drawNode(NodsC[i].X, NodsC[i].Y, NodsC[i].label);
}
///////////Перемещение вершин
let isDragging = false;
let selectedNode = null;
let offsetX = 0;
let offsetY = 0;

function startDragging(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    // Проверяем, находится ли курсор над какой-либо вершиной
    for (let node of Nods) {
        let distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            isDragging = true;
            selectedNode = node;
            offsetX = mouseX - selectedNode.X;
            offsetY = mouseY - selectedNode.Y;
            break;
        }
    }

    for (let node of NodsC) {
        let distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            isDragging = true;
            selectedNode = node;
            offsetX = mouseX - selectedNode.X;
            offsetY = mouseY - selectedNode.Y;
            break;
        }
    }
}

function drag(event) {
    if (isDragging && selectedNode) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Обновляем координаты вершины
        selectedNode.X = mouseX - offsetX;
        selectedNode.Y = mouseY - offsetY;

        // Очищаем холст и перерисовываем граф
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawGraph();
    }
}

function stopDragging() {
    isDragging = false;
    selectedNode = null;
}

function redrawGraph() {
    for (const edge of Edgs) {
        const sourceNode = getNodeById(edge.source);
        const targetNode = getNodeById(edge.target);

        if (sourceNode && targetNode) {
            drawEdges(sourceNode.X, sourceNode.Y, targetNode.X, targetNode.Y);
        }
    }
    for (const node of Nods) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsLU) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsLD) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsC) {
        drawNode(node.X, node.Y, node.label);
    }
}

function getNodeById(id) {
    return Nods.find((node) => node.id === id) ||
        NodsLU.find((node) => node.id === id) ||
        NodsLD.find((node) => node.id === id) ||
        NodsC.find((node) => node.id === id);
}


/////////////////////////////////////////////
function addEdgs(src, tgt) { //Добавление ребра
    Edgs.push({
        source: src,
        target: tgt
    });
};

function addNodesLU(id, x, y, label) { //Добавление вершины для двудольного графа, верхняя линия
    NodsLU.push({ id: id, X: x, Y: y, label: label });
};

function addNodesC(vNods, id, x, y, label) { //Добавление вершины
    vNods.push({
        id: id,
        X: x,
        Y: y,
        label: label
    });
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

function clearArr(arr) {
    arr.splice(0, arr.length)
}

function clearAll() { //Функция очистки всех массивов и холста
    iter = 0;
    iterCoGr = 0;
    clearArr(Nods);
    clearArr(NodsLD);
    clearArr(NodsLU);
    clearArr(Edgs);
    clearArr(NodsC);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function removeEventDrawMode() {
    canvas.removeEventListener('mousedown', DaDM);
    canvas.removeEventListener('click', DaDC);
    canvas.removeEventListener('click', drawEdgeDrag);
    canvas.removeEventListener('click', drawC);
    canvas.removeEventListener('click', searchDepth);
    canvas.removeEventListener('click', searchBreadth);
    canvas.removeEventListener('mousedown', drawEdgeDrag);
    canvas.removeEventListener('mouseup', drawEdgeDrop);
}

function isSelected(event) {
    let isSelect = false
    let selNode = null

    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    for (let node of Nods) {
        let distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            isSelect = true
            selNode = node;
            break;
        }
    }
    return [isSelect, selNode];
}

function redrawNodes() {
    for (const node of Nods) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsLU) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsLD) {
        drawNode(node.X, node.Y, node.label);
    }

    for (const node of NodsC) {
        drawNode(node.X, node.Y, node.label);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Вывод подсказки на экран
// true - текст напечатается с очисткой, без true тескт будет прибавлятся к текущему 
function printTip(...text) {
    let newText = '';
    let check = true;

    text.forEach(text => {

        if (text === check) {
            check = false;
        } else {
            newText += " " + text;
        }
    })

    if (!check) {
        document.querySelector('.tip__text').textContent = newText;
    } else {
        document.querySelector('.tip__text').textContent += newText;
    }
}

//Функция поиска в глубину
function searchDepth(event) {
    printTip("Порядок обхода: ", true);
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Проверяем, было ли произведено нажатие на вершину
    let startNode = null;
    for (const node of Nods) {
        const distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            startNode = node;
            break;
        }
    }

    for (const node of NodsC) {
        const distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            startNode = node;
            break;
        }
    }

    if (startNode) {
        // Очищаем все предыдущие выделения
        clearSelection();
        // Запускаем алгоритм DFS
        const visited = new Set(); // Множество посещенных вершин
        dfs(startNode, visited);

        // Определение функции DFS
        function dfs(node, visited) {
            visited.add(node);
            selectNode(node); // Выделяем текущую вершину
            printTip(node.id);

            // Рекурсивно запускаем DFS для всех соседних вершин
            const neighbors = findNeighbors(node);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor, visited);
                }
            }
        }

        // Определение функции для поиска соседних вершин
        function findNeighbors(node) {
            const neighbors = [];

            // Проходим по всем ребрам и ищем соседние вершины для данной вершины
            for (const edge of Edgs) {
                if (edge.source === node.id) {
                    const neighbor = Nods.find((n) => n.id === edge.target);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                } else if (edge.target === node.id) {
                    const neighbor = Nods.find((n) => n.id === edge.source);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                }
            }

            for (const edge of Edgs) {
                if (edge.source === node.id) {
                    const neighbor = NodsC.find((n) => n.id === edge.target);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                } else if (edge.target === node.id) {
                    const neighbor = NodsC.find((n) => n.id === edge.source);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                }
            }

            return neighbors;
        }



        // Определение функции для очистки выделений
        function clearSelection() {
            for (const node of Nods) {
                drawNode(node.X, node.Y, node.label);
            }

            for (const node of NodsC) {
                drawNode(node.X, node.Y, node.label);
            }
        }
    } else {
        console.log("error");

    }
    canvas.removeEventListener('click', searchDepth);
}

//Алгоритм поиска в ширину
function searchBreadth(event) {
    printTip("Порядок обхода: ", true);
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Проверяем, было ли произведено нажатие на вершину
    let startNode = null;
    for (const node of Nods) {
        const distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            startNode = node;
            break;
        }
    }

    for (const node of NodsC) {
        const distance = Math.sqrt((mouseX - node.X) ** 2 + (mouseY - node.Y) ** 2);
        if (distance <= 20) {
            startNode = node;
            break;
        }
    }

    if (startNode) {
        // Очищаем все предыдущие выделения
        clearSelection();

        // Запускаем алгоритм BFS
        const queue = [startNode]; // Очередь вершин, которые нужно обойти
        const visited = new Set([startNode]); // Множество посещенных вершин
        while (queue.length > 0) {
            const node = queue.shift();
            selectNode(node); // Выделяем текущую вершину
            printTip(node.id);

            // Получаем соседние вершины и добавляем их в очередь, если они еще не были посещены
            const neighbors = findNeighbors(node);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                    visited.add(neighbor);
                }
            }
        }

        // Определение функции для поиска соседних вершин
        function findNeighbors(node) {
            const neighbors = [];

            // Проходим по всем ребрам и ищем соседние вершины для данной вершины
            for (const edge of Edgs) {
                if (edge.source === node.id) {
                    const neighbor = Nods.find((n) => n.id === edge.target);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                } else if (edge.target === node.id) {
                    const neighbor = Nods.find((n) => n.id === edge.source);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                }
            }

            for (const edge of Edgs) {
                if (edge.source === node.id) {
                    const neighbor = NodsC.find((n) => n.id === edge.target);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                } else if (edge.target === node.id) {
                    const neighbor = NodsC.find((n) => n.id === edge.source);
                    if (neighbor) {
                        neighbors.push(neighbor);
                    }
                }
            }

            return neighbors;
        }



        // Определение функции для очистки выделений
        function clearSelection() {
            for (const node of Nods) {
                drawNode(node.X, node.Y, node.label);
            }

            for (const node of NodsC) {
                drawNode(node.X, node.Y, node.label);
            }
        }
    } else {
        console.log("error");
    }

    canvas.removeEventListener("click", searchBreadth);
}

//Трансфармация массива объектов {source: 0, target: 1}, в объект смежности
function transform(input) {
    const graph = {};

    for (const { source, target }
        of input) {
        if (!graph[source]) graph[source] = [];
        graph[source].push(target);

        if (!graph[target]) graph[target] = [];
        graph[target].push(source);
    }

    return graph;
}

// Определение функции для выделения вершины
function selectNode(node) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(node.X, node.Y, 17, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label, node.X, node.Y);
}

//Поиск паросочетания
function maxPairsOfGraph(graph) {
    const pairs = [];
    const visited = {};


    for (let node in graph) {
        if (!visited[node]) {
            findMaxPair(node);
        }
    }

    function findMaxPair(node) {
        visited[node] = true;

        for (let neighbor of graph[node]) {
            if (!visited[neighbor]) {
                pairs.push([node, neighbor]);
                visited[neighbor] = true;
                return;
            }
        }
    }

    // Сортируем пары по количеству ребер между вершинами
    pairs.sort((a, b) => graph[a[0]].length - graph[b[0]].length);

    // Берем первые пары до тех пор пока они не закончатся или не будет достигнуто макс. число пар
    let maxPairs = [];
    let i = 0;
    while (i < pairs.length && maxPairs.length < (Object.keys(graph).length / 2)) {
        maxPairs.push(pairs[i]);
        i++;
    }

    return maxPairs;
}


let answer = [];
//Поиск паросочетания2
function maxPairsOfGraph1(graph, maxPairs1) {

    let graph1 = [];
    const pairs = [];
    const visited = {};
    const buffMaxNeigh = [];

    for (let node in graph) {
        if (!visited[node]) {
            if (graph[node].length == 0)
                visited[node] = true;
            buffMaxNeigh[node] = findMaxPair(node);
        }
    }

    for (let i = 0; i < buffMaxNeigh.length; i++) {
        if (i == buffMaxNeigh[buffMaxNeigh[i]] && !visited[i] && !visited[buffMaxNeigh[i]]) {
            pairs.push([i, buffMaxNeigh]);
            //console.log(buffMaxNeigh);
            answer.push(buffMaxNeigh)
                //console.log(answer);


            visited[i] = true;
            visited[buffMaxNeigh[i]] = true;
        }
    }

    for (let node in graph) {
        if (visited[node]) {
            graph1[node] = []; ////////////Не уверен
        } else {
            graph1[node] = graph[node].filter((f) => {
                return !visited[f];
            });
        }
    }
    let sum = 0;
    let iterator = 0;
    for (let node of graph1) {
        if (graph1[node] == null) {
            sum += 0;
        } else {
            sum += graph1[node].length;
        }

    }
    if (sum > 0) {
        maxPairsOfGraph1(graph1);
    }

    function findMaxPair(node) {
        let maxPower = 0;
        let result = -1;
        for (let neighbor of graph[node]) {
            if (graph[neighbor].length > maxPower) {
                maxPower = graph[neighbor].length;
                result = neighbor;

            }
        }
        return result;
    }

    // Сортируем пары по количеству ребер между вершинами
    //pairs.sort((a, b) => graph[a[0]].length - graph[b[0]].length);

    // Берем первые пары до тех пор пока они не закончатся или не будет достигнуто макс. число пар

    //console.log(pairs);

    for (let pair1 in pairs) {
        //console.log("iterator" + iterator);

        //maxPairs1.push(pair1);
        //console.log(pair1);
        iterator++;
    }
}


function finalMaxPairs(graph) {
    let maxPairs1 = [];
    maxPairsOfGraph1(graph, maxPairs1);

    //return maxPairs;
}