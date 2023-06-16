const importBtn = document.querySelector('.importGraph');
const popUp = document.querySelector('.popUp__container');
const btnSendJson = document.querySelector('.btn-sendJson');

//Вызов popUm меню
importBtn.addEventListener('click', () => {
    popUp.classList.add('visible');
});

//Закрытие popUp
// popUp.addEventListener('click', () => {
//     popUp.classList.remove('visible');
// });

//Получение Json
btnSendJson.addEventListener('click', () => {
    clearAll();
    let x_0 = canvas.width / 2;
    let y_0 = canvas.height / 2;
    let r = (canvas.height / 2) - 30;

    let jsonTxt = document.querySelector('.inputJsonTxt').value;
    if (!jsonTxt) {
        console.log("Nothing");

    } else {
        let jsonObj = JSON.parse(jsonTxt)
        let countNode = Object.keys(jsonObj).length;
        let iter = 0;
        for (let el in jsonObj) {
            let label = el;
            let XX = (x_0 + (r * Math.cos(2 * Math.PI * iter / countNode)));
            let YY = (y_0 + (r * Math.sin(2 * Math.PI * iter / countNode)));
            addNodesC(Nods, iter, XX, YY, label);
            drawNode(Nods[iter].X, Nods[iter].Y, Nods[iter].label);
            iter++;

            //console.log(jsonObj[el].target);

        }
        iter = 0;
        for (let el in jsonObj) {
            if (jsonObj[el].target.length != 0) {
                for (let trg in jsonObj[el].target) {
                    //console.log(jsonObj[el].target[trg]);

                    addEdgs(iter, jsonObj[el].target[trg]);
                    drawEdges(Nods[iter].X, Nods[iter].Y, Nods[jsonObj[el].target[trg]].X, Nods[jsonObj[el].target[trg]].Y);

                }


            }
            iter++
        }
        popUp.classList.remove('visible');
    }

});

let json = {
    "Node-1": {
        "target": [3]
    },
    "Node-2": {
        "target": [0, 2, 3]
    },
    "Node-3": {
        "target": [3]
    },
    "Node-4": {
        "target": []
    }
}