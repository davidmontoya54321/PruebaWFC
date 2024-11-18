// CLASE 6.1

const celdas = [];

const RETICULA = 4;

const azulejos = [];
const NA = 5; //numero de azulejos

const reglas = [
  //reglas de los bordes de cada azulejo
  {
    //SRPITE 0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //SRPITE 1
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //SRPITE 2
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //SRPITE 3
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //SRPITE 4
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },
];
function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("sprites/tiles" + i + ".png"); //??????????
  }
}

function setup() {
  createCanvas(1080, 1080);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; ++i) {
    print(opcionesI);
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
    //????????????????
    print(i);
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
  print(celdas); //?????????????????????
}

function draw() {}
