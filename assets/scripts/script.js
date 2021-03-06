let order = Array();
let clickedOrder = Array();
let score = 0;
let difficulty = 150;
let colorsLeft = score;
let howManyColorsLeft = document.getElementById("quantasCoresRestam");
let elementGenius = document.querySelector(".genius");
let count = 1;

// 0- blue, 1- yellow, 2- red, 3- green

const BLUE = document.querySelector('.blue');
const YELLOW = document.querySelector('.yellow');
const RED = document.querySelector('.red');
const GREEN = document.querySelector('.green');

// ordem aleatória de cores
let shuffleOrder = () => {
    // cor aleatória
    let colorOrder = Math.floor(Math.random() * 4);
    // adiciona no array order
    order[order.length] = colorOrder;
    // loop do acendimento das cores do array order 
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        setTimeout(() => {
            lightColor(elementColor, Number(i + 1));
        }, 600);
    }
    setTimeout(() => {
        elementGenius.classList.toggle('disabled')
        count++;
    }, count * 1200);
    elementGenius.classList.toggle('disabled');
    howManyColorsLeft.innerHTML = score;
    colorsLeft = score;
    setColorNumber();

}

// acende a próxima cor
let lightColor = (element, number) => {
    number = number * difficulty;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 100);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 150);
    difficulty = difficulty - 2;
}

// checa se a ordem seguida pelo user foi a correta
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            lose();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou ✔! Iniciando próximo nível!`);
        nextLevel();
    }
}

// função para aplicar cores nos números do visor
let setColorNumber = () => {
    switch (howManyColorsLeft.innerHTML) {
        case "0":
            howManyColorsLeft.style.color = "rgb(0 0 0)";
            break;
        case "1":
            howManyColorsLeft.style.color = "rgb(239 68 68)";
            break;
        case "2":
            howManyColorsLeft.style.color = "rgb(231, 199, 35)";
            break;
        case "3":
            howManyColorsLeft.style.color = "rgb(34 197 94)";
            break;
        case "4":
            howManyColorsLeft.style.color = "rgb(59 130 246)";
            break;
    }
}

// função para o clique do user
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 150);
    colorsLeft--; // diminui as cores restantes
    howManyColorsLeft.innerHTML = colorsLeft;
    setColorNumber();
}

// função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return BLUE;
    } else if (color == 1) {
        return YELLOW;
    } else if (color == 2) {
        return RED;
    } else if (color == 3) {
        return GREEN;
    }
}

// função próximo nível
let nextLevel = () => {
    score++; // aumenta o score
    clickedOrder = Array(); // zera o array de clicados
    shuffleOrder(); // embaralhar cores
}

// função game over
let lose = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo ❌. Clique em OK para iniciar um novo jogo`);
    howManyColorsLeft.innerText = colorsLeft;
    playGame();
}

let playGame = () => {
    score = 0; // zera o score
    order = Array(); // zera o array da ordem
    clickedOrder = Array(); // zera o array de clicados
    colorsLeft = 1; // default das cores restantes
    alert(`Bem vindo ao Genesis! Iniciando novo jogo. 🎮`);
    nextLevel();
}

// eventos de clique das cores
GREEN.onclick = () => click(3);
RED.onclick = () => click(2);
YELLOW.onclick = () => click(1);
BLUE.onclick = () => click(0);

playGame();