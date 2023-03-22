Edgs = [];
Nods = [];
const switcher = document.querySelector('.swicher-btn');
let iter = 0;

canvas.addEventListener('mousedown', DaDM);
canvas.addEventListener('click', DaDC);

switcher.addEventListener('change', () => {
    if (switcher.checked) {
        canvas.removeEventListener('mousedown', DaDM);
        canvas.removeEventListener('click', DaDC);

        canvas.addEventListener('click', drawC);
    } else if (!switcher.checked) {
        canvas.removeEventListener('click', drawC);
        //Рисование путем Drag&Drop
        canvas.addEventListener('mousedown', DaDM);
        canvas.addEventListener('click', DaDC);
        /////////////////////////
    }
});