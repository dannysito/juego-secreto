let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//funcion que me permite reutilizar para diferentes elementos de HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    //input representa a la caja de texto del HTML
    let numeroDeusuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeusuario === numeroSecreto) {
        //llamar función dentro de otra
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
        //seleccionamos el id y removemos el atributo disabled
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeusuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    //para usar ids con queryselector se hace uso del "#"
    document.querySelector('#valorUsuario').value = '';
    // valorCaja.value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado)
    console.log(listaNumerosSorteados)
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        //Si el número generado esta incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            //recursividad: la funcion puede llamarse asi misma para reutilicar la funcion
            // la recursividad puede ser infinita y puede generar errores
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            //retornar significa que nos retorne el numero creado
            return numeroGenerado;
        }
    }

}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indique un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //1. limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //generar el número aleatorio
    //inicializar el número de intentos
    condicionesIniciales();
    //dehabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();