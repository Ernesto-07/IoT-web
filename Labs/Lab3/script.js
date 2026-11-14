var simulacionActiva = true;

// Función para crear los cajones de una fila
function crearFila(idContenedor, letra, cantidad) {
    var contenedor = document.getElementById(idContenedor);

    for (var i = 1; i <= cantidad; i++) {
        var cajon = document.createElement("div");
        cajon.id = letra + i;
        cajon.innerText = letra + i;

        // Estado inicial aleatorio
        if (Math.random() < 0.5) {
            cajon.className = "cajon ocupado";
        } else {
            cajon.className = "cajon libre";
        }

        // Cambiar estado al hacer clic
        cajon.onclick = function () {
            cambiarEstado(this);
        };

        contenedor.appendChild(cajon);
    }
}

// Cambia entre libre y ocupado sin borrar las clases especiales
function cambiarEstado(cajon) {
    if (cajon.classList.contains("libre")) {
        cajon.classList.remove("libre");
        cajon.classList.add("ocupado");
    } else {
        cajon.classList.remove("ocupado");
        cajon.classList.add("libre");
    }
    actualizarDashboard();
}

// Calcula totales y actualiza el panel superior
function actualizarDashboard() {
    var todos = document.getElementsByClassName("cajon");
    var ocupados = document.getElementsByClassName("ocupado").length;
    var total = todos.length;
    var disponibles = total - ocupados;
    var porcentaje = Math.round((ocupados / total) * 100);

    document.getElementById("total").innerText = total;
    document.getElementById("ocupados").innerText = ocupados;
    document.getElementById("disponibles").innerText = disponibles;
    document.getElementById("porcentaje").innerText = porcentaje + "%";
    document.getElementById("barra-progreso").style.width = porcentaje + "%";
}

// Pausar o reanudar la simulación automática
function toggleSimulacion() {
    var boton = document.getElementById("btn-pausar");
    simulacionActiva = !simulacionActiva;

    if (simulacionActiva) {
        boton.innerText = "Pausar simulación";
    } else {
        boton.innerText = "Reanudar simulación";
    }
}

// Volver a generar estados aleatorios manteniendo los cajones especiales
function reiniciar() {
    var todos = document.getElementsByClassName("cajon");
    for (var i = 0; i < todos.length; i++) {
        todos[i].classList.remove("libre", "ocupado");
        if (Math.random() < 0.5) {
            todos[i].classList.add("ocupado");
        } else {
            todos[i].classList.add("libre");
        }
    }
    actualizarDashboard();
}

// Crear todas las filas del estacionamiento
crearFila("fila-L", "L", 12);
crearFila("fila-A", "A", 18);
crearFila("fila-B", "B", 18);
crearFila("fila-C", "C", 18);
crearFila("fila-D", "D", 18);
crearFila("fila-E", "E", 18);
crearFila("fila-F", "F", 18);
crearFila("fila-G", "G", 18);
crearFila("fila-H", "H", 18);
crearFila("fila-I", "I", 18);
crearFila("fila-J", "J", 18);
crearFila("fila-K", "K", 18);
crearFila("fila-M", "M", 13);

var cajonDiscapacitados = document.getElementById("M13");
cajonDiscapacitados.classList.add("discapacitado");
cajonDiscapacitados.innerText = "M13 ♿";
var cajonDiscapacitados = document.getElementById("M2");
cajonDiscapacitados.classList.add("discapacitado");
cajonDiscapacitados.innerText = "M2 ♿";


var cajonDescarga = document.getElementById("M1");
cajonDescarga.classList.add("descarga");
cajonDescarga.innerText = "M1 Carga";
var cajonDescarga = document.getElementById("M1");
cajonDescarga.classList.add("descarga");
cajonDescarga.innerText = "M1 Carga";
var cajonDescarga = document.getElementById("M2");
cajonDescarga.classList.add("descarga");
cajonDescarga.innerText = "M2 Carga";

// Actualizar datos al cargar la página
actualizarDashboard();

// Simulación automática cada 2.5 segundos
setInterval(function () {
    if (simulacionActiva) {
        var todos = document.getElementsByClassName("cajon");
        var aleatorio = Math.floor(Math.random() * todos.length);
        cambiarEstado(todos[aleatorio]);
    }
}, 2500);