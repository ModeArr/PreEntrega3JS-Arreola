$('#datepicker input').datepicker({
    maxViewMode: 2,
    todayBtn: true,
    language: "es",
    daysOfWeekDisabled: "0,6",
    daysOfWeekHighlighted: "1,2,3,4,5",
    autoclose: true,
    todayHighlight: true
})


let citasAgregadas = document.getElementById("citaAgregada");
if (!localStorage.getItem("cita")){
    cita = JSON.parse(localStorage.getItem("cita"));
    agregarCitaAlDom();
}

class Cita {
    constructor(nombre, anio, mes, dia, hora) {
        this.nombre = nombre;
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
        this.fecha= new Date(this.anio, (this.mes - 1), this.dia, this.hora).toJSON(); //se agrega Date() por si se ocupa después
        this.fechaCreacion = Date();
    }
}

function validateCalendar(calendario, cita) {
    const duplicado = calendario.filter((obj) => obj.anio === cita.anio && obj.mes === cita.mes && obj.dia === cita.dia && obj.hora === cita.hora);
    return duplicado.length > 0;
}

let formaCita = document.getElementById("formaCita");
formaCita.addEventListener("submit", (e) => {
    if (!formaCita.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
    
    }else{
        let nombre = document.getElementById("nombre").value;
    let fechatest = document.getElementById("fecha").value;
    let fechaCompleta = document.getElementById("fecha").value.split("/");
    let anio = fechaCompleta[2];
    let mes = fechaCompleta[1];
    let dia = fechaCompleta[0]; 
    let hora = document.getElementById("floatingSelectGrid").value;
    const cita = new Cita(nombre, anio, mes, dia, hora);

    if (!validateCalendar(calendario, cita)){
        guardarCita(cita);
        calendario.push(cita);
        agregarCitaAlDom(cita);
    }
    }
    
    formaCita.classList.add('was-validated')
})

function borrarCita(){
    localStorage.removeItem('cita');
    citasAgregadas.remove();
}

function guardarCita(cita){
    localStorage.setItem("cita", JSON.stringify(cita))
}

function agregarCitaAlDom(cita){
    citasAgregadas.innerHTML = `<div class="card text-center">
    <div class="card-header">
      Cita
    </div>
    <div class="card-body">
      <h5 class="card-title">Agregaste una cita ${cita?.nombre}</h5>
      <p class="card-text">Tu cita es para el ${cita?.dia}/${cita?.mes}/${cita?.anio} a las ${cita?.hora}:00 horas</p>
      <a onclick="borrarCita()" class="btn btn-primary">Cancelar cita</a>
    </div>
    <div class="card-footer text-body-secondary">
      Recuerda llegar 5 minutos antes a tu cita.
    </div>
  </div>`
}

//Citas que ya fueron registradas
const calendario = [{
    "nombre": "Modesto Arreola",
    "anio": 2023,
    "mes": 1,
    "dia": 1,
    "hora": 10,
    "fecha": "2023-01-01T16:00:00.000Z"
}]

/* const config = {
    name: "Cita para plan nutricional",
    description: "Esta es tu cita para tu plan nutricional y asesoría, recuerda contar con los datos que se te pide",
    startDate: cita.anio + "-" + cita.mes + "-" + cita.dia,
    startTime: cita.hora + ":00",
    endTime: (cita.hora + 1) + ":00",
    options: ["Apple", "Google", "Outlook.com", "Yahoo"],
    timeZone: "America/Mexico_City"
};
const button = document.getElementById('botonCalendario');
if (button) {
    button.addEventListener('click', () => atcb_action(config, button));
} */