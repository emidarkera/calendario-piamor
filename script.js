const mesAnio = document.getElementById('mes-anio');
const grid = document.getElementById('grid-calendario');
const fecha = new Date();

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// =========================================================================
// TUS TAREAS (Ya cargadas)
// =========================================================================
const tareasPredeterminadas = {
    9: ["Practico 3"],
    10: ["PEP 1 Obstetricia"],
    11: ["Control Seminario Fisiopatología", "MiniPEP 2.1", "Presentacion Seminario"],
    16: ["Practico 4"],
    18: ["MiniPEP 2.2"],
    22: ["Control Farmacología"],
    23: ["PEP 2 Embriología", "Practico 5"]
};
// =========================================================================

mesAnio.innerText = `${nombresMeses[fecha.getMonth()]} ${fecha.getFullYear()}`;

const diasEnMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

// 1. Espacios vacíos
for(let i=0; i<primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.className = 'celda-dia';
    vacio.style.backgroundColor = 'transparent'; // Transparente para que se vea limpio
    vacio.style.boxShadow = 'none'; // Sin sombra
    vacio.style.border = 'none'; // Sin borde
    vacio.style.cursor = 'default'; // Sin manito
    grid.appendChild(vacio);
}

// 2. Días
for(let i=1; i<=diasEnMes; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda-dia';
    
    const numero = document.createElement('span');
    numero.className = 'numero-dia';
    numero.innerText = i;
    celda.appendChild(numero);

    if(i === fecha.getDate()) celda.classList.add('hoy');

    // Cargar tareas automáticas
    if (tareasPredeterminadas[i]) {
        tareasPredeterminadas[i].forEach(tareaTexto => {
            agregarTarea(celda, tareaTexto);
        });
    }

    // Agregar nueva tarea al hacer clic en el día
    celda.addEventListener('click', () => {
        const textoTarea = prompt(`Agregar tarea para el día ${i}:`);
        if(textoTarea) {
            agregarTarea(celda, textoTarea);
        }
    });

    grid.appendChild(celda);
}

// =========================================================================
// AQUÍ ESTÁ LA MAGIA DE LA NOTIFICACIÓN 👇
// =========================================================================
function agregarTarea(celdaPadre, texto) {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = 'tarea';
    tareaDiv.innerText = texto;

    tareaDiv.addEventListener('click', (evento) => {
        evento.stopPropagation(); // Evita activar el clic del día
        
        // Verificamos si ya estaba completada o no
        if (tareaDiv.classList.contains('completada')) {
            // Si ya estaba lista y le dimos click, la "destachamos" (sin mensaje)
            tareaDiv.classList.remove('completada');
        } else {
            // Si NO estaba lista, la tachamos y mandamos el mensaje
            tareaDiv.classList.add('completada');
            
            // LA NOTIFICACIÓN:
            // Usamos setTimeout para que primero se vea tachada visualmente y luego salte el mensaje
            setTimeout(() => {
                alert("¡Muy mien amor eres seca! ❤️");
            }, 100);
        }
    });

    celdaPadre.appendChild(tareaDiv);
}
