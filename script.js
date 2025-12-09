const mesAnio = document.getElementById('mes-anio');
const grid = document.getElementById('grid-calendario');
const fecha = new Date();

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// TAREAS PRECARGADAS
const tareasPredeterminadas = {
    9: ["Practico 3"],
    10: ["PEP 1 Obstetricia"],
    11: ["Control Seminario Fisiopatología", "MiniPEP 2.1", "Presentacion Seminario"],
    16: ["Practico 4"],
    18: ["MiniPEP 2.2"],
    22: ["Control Farmacología"],
    23: ["PEP 2 Embriología", "Practico 5"]
};

mesAnio.innerText = `${nombresMeses[fecha.getMonth()]} ${fecha.getFullYear()}`;

const diasEnMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

// Espacios vacíos
for(let i=0; i<primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.className = 'celda-dia';
    vacio.style.opacity = '0'; // Invisible
    vacio.style.cursor = 'default';
    grid.appendChild(vacio);
}

// Crear días
for(let i=1; i<=diasEnMes; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda-dia';
    
    const numero = document.createElement('span');
    numero.className = 'numero-dia';
    numero.innerText = i;
    celda.appendChild(numero);

    if(i === fecha.getDate()) celda.classList.add('hoy');

    // Cargar tareas
    if (tareasPredeterminadas[i]) {
        tareasPredeterminadas[i].forEach(tareaTexto => {
            agregarTarea(celda, tareaTexto);
        });
    }

    // Agregar nueva tarea manual
    celda.addEventListener('click', () => {
        const textoTarea = prompt(`Agregar tarea para el día ${i}:`);
        if(textoTarea) {
            agregarTarea(celda, textoTarea);
        }
    });

    grid.appendChild(celda);
}

// Función mágica con notificación
function agregarTarea(celdaPadre, texto) {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = 'tarea';
    tareaDiv.innerText = texto;

    tareaDiv.addEventListener('click', (evento) => {
        evento.stopPropagation();
        
        if (tareaDiv.classList.contains('completada')) {
            tareaDiv.classList.remove('completada');
        } else {
            tareaDiv.classList.add('completada');
            // Notificación especial ❤️
            setTimeout(() => {
                alert("¡Muy mien amor eres seca! ❤️");
            }, 100);
        }
    });

    celdaPadre.appendChild(tareaDiv);
}
