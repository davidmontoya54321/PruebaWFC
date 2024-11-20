// CLASE 6.1

const celdas = [];

const RETICULA = 8;
let ancho;
let alto;

const azulejos = [];
const NA = 11; //numero de azulejos

let opcionesI = [];

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
  {
    //SRPITE 5
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //SRPITE 6
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //SRPITE 7
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //SRPITE 8
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //SRPITE 9
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //SRPITE 10
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
];
function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("sprites/tiles" + i + ".png");
  }
}

function setup() {
  createCanvas(700, 700);
  ancho = width / RETICULA;
  alto = height / RETICULA;

  for (let i = 0; i < azulejos.length; ++i) {
    // print(opcionesI);
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }

  //celdas[12].opciones = [4, 5, 8];
  //celdas[13].opciones = [6, 4, 9];
  //celdas[4].opciones = [7, 5, 1];
  //celdas[1].opciones = [5, 3, 8];

  // print(celdas); //?????????????????????
}

function draw() {
  // background(0);
  function filtrarCeldas(celda) {
    return celda.colapsada == false;
  }
  const celdasDisponibles = celdas.filter(filtrarCeldas);

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });
    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length;
    });
    const celdaSeleccionanda = random(celdasPorColapsar);
    celdaSeleccionanda.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionanda.opciones);

    celdaSeleccionanda.opciones = [opcionSeleccionada];

    print(celdaSeleccionanda);

    //Forloop para monitorear las posiciones en el escenario de nuestra retícula

    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaindex = x + y * RETICULA;
        const celdaActual = celdas[celdaindex];
        if (celdaActual.colapsada) {
          const indiceAzulejo = celdaActual.opciones[0];
          const reglaActuales = reglas[indiceAzulejo];
          //print(reglaActuales);

          image(azulejos[indiceAzulejo], x * ancho, y * alto, ancho, alto);
          //MONITOREAR UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULA;
            const celdaUP = celdas[indiceUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglaActuales["UP"], "DOWN");
            }
          }
          //MONITOREAR RIGHT
          if (x < RETICULA - 1) {
            const indiceRIGHT = x + 1 + y * RETICULA;
            const celdaRIGHT = celdas[indiceRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglaActuales["RIGHT"], "LEFT");
            }
          }
          //MONITOREAR ENTROPIA DOWN
          if (y < RETICULA - 1) {
            const indiceDOWN = x + (y + 1) * RETICULA;
            const celdaDOWN = celdas[indiceDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglaActuales["DOWN"], "UP");
            }
          }
          //MONITOREAR ENTROPIA LEFT
          if (x > 0) {
            const indiceLEFT = x - 1 + y * RETICULA;
            const celdaLEFT = celdas[indiceLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglaActuales["LEFT"], "RIGHT");
            }
          }
        }
      }
    }
  } else {
    let opcionesI = [];
    for (let i = 0; i < azulejos.length; ++i) {
      // print(opcionesI);
      opcionesI.push(i);
    }

    for (let i = 0; i < RETICULA * RETICULA; i++) {
      celdas[i] = {
        colapsada: false,
        opciones: opcionesI,
      };
    }
  }
  //noLoop();
}

function cambiarEntropia(_celda, _regla, _opuesto) {
  const nuevasOpciones = [];
  for (let i = 0; i < _celda.opciones.length; i++) {
    if (_regla == reglas[_celda.opciones[i]][_opuesto]) {
      const celdaCompartible = _celda.opciones[i];
      nuevasOpciones.push(celdaCompartible);
      print(nuevasOpciones);
    }
  }
  print(nuevasOpciones);
}

//45:21!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
