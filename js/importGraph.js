const importBtn = document.querySelector('.importGraph');
const popUp = document.querySelector('.popUp__container');
const btnSendJson = document.querySelector('.btn-sendJson');
const inputJsonFile = document.querySelector('.inputJsonFile');
const closePopUp = document.querySelector('.popUp__close');

//Вызов popUm меню
importBtn.addEventListener('click', () => {
    popUp.classList.add('visible');
});

//Закрытие popUp
closePopUp.addEventListener('click', () => {
    popUp.classList.remove('visible');
});

//Получение Json
btnSendJson.addEventListener('click', () => {
    clearAll();

    let jsonTxt = document.querySelector('.inputJsonTxt').value;
    if (!jsonTxt) {
        let file = inputJsonFile.files[0];
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = function() {
            let jsonObjFile = JSON.parse(reader.result)
            drawGraphByJson(jsonObjFile);
            popUp.classList.remove('visible');
        };

        reader.onerror = function() {
            alert(reader.error);
        };

    } else {
        let jsonObjTxt = JSON.parse(jsonTxt)

        drawGraphByJson(jsonObjTxt);

        popUp.classList.remove('visible');
    }

});

let json = {
    "Node-0": {
        "target": [1]
    },
    "Node-1": {
        "target": [0, 2]
    },
    "Node-2": {
        "target": []
    },
    "Node-3": {
        "target": []
    }
}

function drawGraphByJson(jsonObj) {
    let x_0 = canvas.width / 2;
    let y_0 = canvas.height / 3;
    let r = y_0 - 100;
    let countNode = Object.keys(jsonObj).length;
    let iter = 0;

    for (let el in jsonObj) {
        let label = el;

        let XX = (x_0 + (r * Math.cos(2 * Math.PI * iter / countNode)));
        let YY = (y_0 + (r * Math.sin(2 * Math.PI * iter / countNode)));
        addNodesC(Nods, iter, XX, YY, label);

        for (let trg in jsonObj[el].target) {
            addEdgs(iter, jsonObj[el].target[trg]);
        }

        iter++;
    }
    redrawGraph();
}