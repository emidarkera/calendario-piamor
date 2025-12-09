const mesAnio = document.getElementById('mes-anio');
const grid = document.getElementById('grid-calendario');
const fecha = new Date();

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// =========================================================================
// TUS TAREAS (Copiadas de la foto)
// =========================================================================
const tareasPredeterminadas = {
    9: [
        "Practico 3"
    ],
    10: [
        "PEP 1 Obstetricia"
    ],
    11: [
        "Control Seminario Fisiopatología",
        "MiniPEP 2.1",
        "Presentacion Seminario"
    ],
    16: [
        "Practico 4"
    ],
    18: [
        "MiniPEP 2.2"
    ],
    22: [
        "Control Farmacología"
    ],
    23: [
        "PEP 2 Embriología",
        "Practico 5"
    ]
};
// =========================================================================

// Poner Título
mesAnio.innerText = `${nombresMeses[fecha.getMonth()]} ${fecha.getFullYear()}`;

// Calcular días
const diasEnMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

// 1. Rellenar espacios vacíos antes del día 1
for(let i=0; i<primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.className = 'celda-dia';
    // Color de fondo suave para días vacíos
    vacio.style.backgroundColor = '#f8f9fa';
    grid.appendChild(vacio);
}

// 2. Crear los días
for(let i=1; i<=diasEnMes; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda-dia';
    
    // Número del día
    const numero = document.createElement('span');
    numero.className = 'numero-dia';
    numero.innerText = i;
    celda.appendChild(numero);

    // Marcar "Hoy"
    if(i === fecha.getDate()) celda.classList.add('hoy');

    // Cargar las tareas automáticas
    if (tareasPredeterminadas[i]) {
        tareasPredeterminadas[i].forEach(tareaTexto => {
            agregarTarea(celda, tareaTexto);
        });
    }

    // Permitir agregar más tareas con clic
    celda.addEventListener('click', () => {
        const textoTarea = prompt(`Agregar tarea para el día ${i}:`);
        if(textoTarea) {
            agregarTarea(celda, textoTarea);
        }
    });

    grid.appendChild(celda);
}

// Función para crear la etiqueta de tarea
function agregarTarea(celdaPadre, texto) {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = 'tarea';
    tareaDiv.innerText = texto;

    // Clic en la tarea para tacharla
    tareaDiv.addEventListener('click', (evento) => {
        evento.stopPropagation();
        tareaDiv.classList.toggle('completada');
    });

    celdaPadre.appendChild(tareaDiv);
}
