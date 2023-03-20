const canvas = document.querySelector('#graph-canvas');
const ctx = canvas.getContext('2d');

// Определяем размеры холста
canvas.width = 800;
canvas.height = 600;

// // Определяем параметры графа
// const nodes = [
//     { id: 1, x: 100, y: 100, label: 'Node 1' },
//     { id: 2, x: 300, y: 100, label: 'Node 2' },
//     { id: 3, x: 200, y: 250, label: 'Node 3' },
//     { id: 4, x: 500, y: 150, label: 'Node 4' },
//     { id: 5, x: 600, y: 300, label: 'Node 5' },
// ];

// const edges = [
//     { source: 1, target: 2 },
//     { source: 1, target: 3 },
//     { source: 2, target: 3 },
//     { source: 2, target: 4 },
//     { source: 3, target: 5 },
//     { source: 4, target: 5 },
// ];

// //edges.push(10, 10);

// // Определяем функцию отрисовки графа
// function drawGraph() {
//     // Очищаем холст перед отрисовкой
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Рисуем ребра
//     edges.forEach(edge => {
//         const sourceNode = nodes.find(node => node.id === edge.source);
//         const targetNode = nodes.find(node => node.id === edge.target);

//         ctx.beginPath();
//         ctx.moveTo(sourceNode.x, sourceNode.y);
//         ctx.lineTo(targetNode.x, targetNode.y);
//         ctx.stroke();
//     });

//     // Рисуем узлы
//     nodes.forEach(node => {
//         ctx.beginPath();
//         ctx.fillStyle = 'black';
//         ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
//         ctx.fill();
//         console.log("node - ", node);


//         ctx.fillStyle = 'white';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(node.label, node.x, node.y);
//     });
// }

// // Вызываем функцию отрисовки графа
// drawGraph();
// //drawNode();