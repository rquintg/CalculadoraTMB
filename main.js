const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (e) => {
    e.preventDefault();

    calcularCalorias();

});


function calcularCalorias() {
    aparecerResultado();

    const nombre = document.getElementById('nombre').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const identificacion = document.getElementById('identificacion').value;
    const edad = document.getElementById('edad').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const actividadFisica = document.getElementById('actividad').value;
    const genero = document.querySelector('input[name="genero"]:checked').value;

    const formulaTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if(!(nombre && tipoDocumento && identificacion && edad && peso && altura && actividadFisica && genero)) {
        mostrarMensajeDeError('Por favor, ingresa todos los campos');
        return;
    }   

    let calculoCalorias;

    if (genero === 'M') {
        calculoCalorias = actividadFisica * (formulaTMB.peso * peso) + (formulaTMB.altura * altura) - (formulaTMB.edad * edad) + 5;
    } else {
        calculoCalorias = actividadFisica * (formulaTMB.peso * peso) + (formulaTMB.altura * altura) - (formulaTMB.edad * edad) - 161;
    }


    let grupoPoblacional;

    if(edad >14 && edad <=29){
        grupoPoblacional = 'Joven';

    } else if(edad > 29 && edad <= 59){
        grupoPoblacional = 'Adultos';

    } else {
        grupoPoblacional = 'Adultos Mayores';
    }


    resultado.innerHTML = `

        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100"  id="calculo">
            <h5 class=" card-title h2">Calorias Requeridas</h5>
            <div class="mb-3 w-100">
                <p class="form-control text-center" style="font-size: 1rem" disabled>
                El paciente <strong>${nombre}</strong> identificado con <strong>${tipoDocumento}</strong>
                NO. <strong>${identificacion}</strong>, requiere un total de <strong>${Math.floor(calculoCalorias)} kcal </strong>
                para el sostenimiento de su TBM, y pertenece al grupo poblacional <strong style="color: red;">${grupoPoblacional}</strong>.
                </p>
                
            </div>
        </div>    

    `

}


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}

// Obtener el botón de limpiar
const botonLimpiar = document.getElementById('limpiar');

// Agregar un listener de eventos al botón de limpiar
botonLimpiar.addEventListener('click', limpiarFormulario);

// Función para setear el formulario
function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('tipoDocumento').value = '';
  document.getElementById('identificacion').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('actividad').value = '';
  document.getElementById('femenino').checked = true; // Restaurar el género por defecto

  // setear el resultado a su estado inicial
  resultado.innerHTML = '';

  desvanecerResultado();
}