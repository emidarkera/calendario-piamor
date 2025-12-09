const mesAnio = document.getElementById('mes-anio');
const grid = document.getElementById('grid-calendario');
const fecha = new Date();

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Poner Título
mesAnio.innerText = `${nombresMeses[fecha.getMonth()]} ${fecha.getFullYear()}`;

// Calcular días
const diasEnMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

// 1. Rellenar espacios vacíos antes del día 1
for(let i=0; i<primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.className = 'celda-dia';
    vacio.style.backgroundColor = '#f8f9fa'; // Un gris muy suave para días de otro mes
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

    // EVENTO 1: Clic en la celda para AGREGAR tarea
    celda.addEventListener('click', () => {
        const textoTarea = prompt(`Agregar tarea para el día ${i}:`);
        if(textoTarea) {
            agregarTarea(celda, textoTarea);
        }
    });

    grid.appendChild(celda);
}

// Función para crear la cajita de tarea
function agregarTarea(celdaPadre, texto) {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = 'tarea';
    tareaDiv.innerText = texto;

    // EVENTO 2: Clic en la tarea para TACHAR (y que no pida agregar otra nueva)
    tareaDiv.addEventListener('click', (evento) => {
        evento.stopPropagation(); // Evita que se active el clic de la celda de fondo
        tareaDiv.classList.toggle('completada'); // Agrega o quita la clase de tachado
    });

    celdaPadre.appendChild(tareaDiv);
}
