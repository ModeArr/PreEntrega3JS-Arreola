$('#datepicker input').datepicker({
    maxViewMode: 2,
    todayBtn: true,
    language: "es",
    daysOfWeekDisabled: "0,6",
    daysOfWeekHighlighted: "1,2,3,4,5",
    autoclose: true,
    todayHighlight: true
})

class Cita {
    constructor(nombre, anio, mes, dia, hora) {
        this.nombre = nombre;
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
        this.fecha = new Date(this.anio, (this.mes - 1), this.dia, this.hora).toJSON(); //se agrega Date() por si se ocupa después
    }
}

function validateCalendar(calendario, cita) {
    const duplicado = calendario.filter((obj) => obj.anio === cita.anio && obj.mes === cita.mes && obj.dia === cita.dia && obj.hora === cita.hora);
    return duplicado.length > 0;
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

let cita
while (true) {
    cita = form();

    if (validateCalendar(calendario, cita)) {
        alert('Cita Duplicada')
    } else {
        calendario.push(cita)
        console.log("Tu cita es para el " + cita.dia + "/" + cita.mes + "/" + cita.anio + " a las " + cita.hora + ":00 horas");
        console.log("A nombre de " + cita.nombre);
        break;
    }

}

const config = {
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
}