const mesAnio = document.getElementById('mes-anio');
const grid = document.getElementById('dias-grid');
const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

mesAnio.innerText = `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;

const diasEnMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

for(let i=0; i<primerDia; i++) grid.appendChild(document.createElement('div'));

for(let i=1; i<=diasEnMes; i++) {
    let dia = document.createElement('div');
    dia.innerText = i;
    dia.className = 'dia';
    if(i === fecha.getDate()) dia.classList.add('hoy');
    dia.onclick = () => alert(`Elegiste el día ${i}`);
    grid.appendChild(dia);
}
