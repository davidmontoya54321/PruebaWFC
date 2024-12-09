// CLASE 6.1

const celdas = [];

let RETICULAX = document.getElementById("cellSize").value;
let RETICULAY;
let ancho;
let alto;
const startButton = document.getElementById("start");

const azulejos = [];
const NA = 11; //numero de azulejos

let opcionesI = [];

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("sprites/tiles" + i + ".png");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ancho = width / RETICULAX;
  alto = ancho;

  RETICULAY = Math.floor(height / ancho);

  for (let i = 0; i < azulejos.length; ++i) {
    // print(opcionesI);
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
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

  startButton.addEventListener("click", resetAll);
}

function draw() {
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

    for (let x = 0; x < RETICULAX; x++) {
      for (let y = 0; y < RETICULAY; y++) {
        const celdaindex = x + y * RETICULAX;
        const celdaActual = celdas[celdaindex];
        if (celdaActual.colapsada) {
          const indiceAzulejo = celdaActual.opciones[0];
          const reglaActuales = reglas[indiceAzulejo];
          //print(reglaActuales);

          image(azulejos[indiceAzulejo], x * ancho, y * alto, ancho, alto);
          //MONITOREAR UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULAX;
            const celdaUP = celdas[indiceUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglaActuales["UP"], "DOWN");
            }
          }
          //MONITOREAR RIGHT
          if (x < RETICULAX - 1) {
            const indiceRIGHT = x + 1 + y * RETICULAX;
            const celdaRIGHT = celdas[indiceRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglaActuales["RIGHT"], "LEFT");
            }
          }
          //MONITOREAR ENTROPIA DOWN
          if (y < RETICULAY - 1) {
            const indiceDOWN = x + (y + 1) * RETICULAX;
            const celdaDOWN = celdas[indiceDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglaActuales["DOWN"], "UP");
            }
          }
          //MONITOREAR ENTROPIA LEFT
          if (x > 0) {
            const indiceLEFT = x - 1 + y * RETICULAX;
            const celdaLEFT = celdas[indiceLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglaActuales["LEFT"], "RIGHT");
            }
          }
        }
      }
    }
  } else {
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

function resetAll() {
  RETICULAX = document.getElementById("cellSize").value;
  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  console.log("aaaaaaaaaaaaaaaaaaaaaaa");
  background(0);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; ++i) {
    // print(opcionesI);
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAX; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
}
