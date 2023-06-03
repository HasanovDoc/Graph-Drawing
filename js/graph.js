const canvas = document.querySelector('#graph-canvas'),
    ctx = canvas.getContext('2d'),
    wrapper = document.querySelector('.wrapper');

// Определяем размеры холста
canvas.width = wrapper.offsetWidth;
canvas.height = window.innerHeight;

//Обход графа в глубину

const btnSearchDeph = document.querySelector('.btn-SearchDeph');

btnSearchDeph.addEventListener('click', () => {
    canvas.removeEventListener("mousedown", DaDM);
    canvas.removeEventListener("click", DaDC);
    canvas.removeEventListener("click", drawC);
    canvas.removeEventListener("click", drawNodesCoG);
    btnDrawedges.removeEventListener("click", drawEdgesCoG);

    let startNode = null;

    canvas.addEventListener('click', function(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Проверяем, было ли произведено нажатие на вершину
        for (const node of Nods) {
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

                return neighbors;
            }

            // Определение функции для выделения вершины
            function selectNode(node) {
                ctx.beginPath();
                ctx.fillStyle = 'red';
                ctx.arc(node.X, node.Y, 20, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, node.X, node.Y);
            }

            // Определение функции для очистки выделений
            function clearSelection() {
                for (const node of Nods) {
                    drawNode(node.X, node.Y, node.label);
                }
            }
        } else {
            console.log("error");

        }
    });
});