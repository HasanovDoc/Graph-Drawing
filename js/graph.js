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

    printTip('Выберите начальную вершину', true)

    let startNode = null;

    canvas.addEventListener('click', searchDepth);
});