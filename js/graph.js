const canvas = document.querySelector('#graph-canvas'),
    ctx = canvas.getContext('2d'),
    wrapper = document.querySelector('.wrapper');

// Определяем размеры холста
canvas.width = wrapper.offsetWidth;
canvas.height = window.innerHeight;

//Обход графа в глубину