// Variables globales
let nombreUsuario;
let edadUsuario;
let cantidadEntradas;
let tipoEntrada;
let precioEntrada;
let descuento = 0;
let totalAPagar;
let tiposEntrada = [];

    // Función para cargar datos desde JSON
    async function cargarDatos() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        tiposEntrada = data.tiposEntrada;
        return true;
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los datos de las entradas.", "error");
        return false;
    }
}

    // Función para mostrar las opciones de entrada en el DOM
    function mostrarOpcionesEntrada() {
    const contenedor = document.getElementById("opciones-entrada");
    contenedor.innerHTML = tiposEntrada.map(entrada =>
        `<div class="form-check">
        <input class="form-check-input" type="radio" name="tipoEntrada" id="entrada${entrada.id}" value="${entrada.id}">
        <label class="form-check-label" for="entrada${entrada.id}">
            ${entrada.nombre} - $${entrada.precio}
        </label>
        </div>`
    ).join("");
}

    // Función para pedir datos al usuario con SweetAlert2 y validaciones
    async function saludarYPedirdatos() {
    // Pedir nombre
    const { value: nombre } = await Swal.fire({
        title: "¡Hola! ¿Cuál es tu nombre?",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => !value && "Por favor, ingresá tu nombre."
        });
    if (!nombre) return false;
    nombreUsuario = nombre;

    // Pedir edad (validar que no sea negativa)
    const { value: edad } = await Swal.fire({
        title: `${nombreUsuario}, ¿cuántos años tenés?`,
        input: "number",
        showCancelButton: true,
        inputValidator: (value) => {
        if (isNaN(value)) return "Por favor, ingresá un número válido.";
        if (value < 0) return "La edad no puede ser negativa.";
        return null;
        }
    });
    if (!edad) return false;
    edadUsuario = parseInt(edad);

    // Pedir cantidad de entradas (validar que no sea negativa o cero)
    const { value: cantidad } = await Swal.fire({
        title: "¿Cuántas entradas querés comprar?",
        input: "number",
        showCancelButton: true,
        inputValidator: (value) => {
        if (isNaN(value)) return "Por favor, ingresá un número válido.";
        if (value <= 0) return "La cantidad de entradas debe ser mayor que cero.";
        return null;
        }
    });
    if (!cantidad) return false;
    cantidadEntradas = parseInt(cantidad);

    // Mostrar opciones de entrada
    document.getElementById("caja-preguntas").style.display = "block";
    mostrarOpcionesEntrada();

    // Pedir tipo de entrada
    const { value: tipo } = await Swal.fire({
        title: "Elegí el tipo de entrada:",
        html: document.getElementById("opciones-entrada").innerHTML,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
        const seleccionado = document.querySelector('input[name="tipoEntrada"]:checked');
        return seleccionado ? seleccionado.value : false;
        }
    });

    if (!tipo) return false;
    tipoEntrada = parseInt(tipo);

    return true;
}

    // Función para calcular el total con descuentos
    function calcularTotal() {
    const entradaSeleccionada = tiposEntrada.find(e => e.id === tipoEntrada);
    precioEntrada = entradaSeleccionada.precio;
    let subtotal = cantidadEntradas * precioEntrada;

    if (edadUsuario < 12) {
        descuento = 0.2;
    } else if (edadUsuario >= 65) {
        descuento = 0.15;
    }

    totalAPagar = subtotal * (1 - descuento);
}

    // Función para mostrar el resumen de la compra
    function mostrarResumen() {
    document.getElementById("caja-preguntas").style.display = "none"; // Ocultar opciones de entrada
    const entradaSeleccionada = tiposEntrada.find(e => e.id === tipoEntrada);
    const resumen = document.getElementById("resultado-compra");
    resumen.innerHTML = `
        <p><strong>Nombre:</strong> ${nombreUsuario}</p>
        <p><strong>Edad:</strong> ${edadUsuario} años</p>
        <p><strong>Entradas:</strong> ${cantidadEntradas} x ${entradaSeleccionada.nombre}</p>
        <p><strong>Subtotal:</strong> $${(cantidadEntradas * entradaSeleccionada.precio).toFixed(2)}</p>
        <p><strong>Descuento aplicado:</strong> ${(descuento * 100).toFixed(0)}%</p>
        <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>
    `;
    document.getElementById("consola-mensajes").style.display = "block";

    // Mensaje de confirmación final con SweetAlert2
    Swal.fire({
        title: "¡Gracias por tu compra, " + nombreUsuario + "!",
        text: "Tu compra ha sido procesada con éxito. Disfrutá del festival.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}

// Evento para iniciar el simulador
document.getElementById("iniciar-simulador").addEventListener("click", async function() {
    if (await cargarDatos()) {
    if (await saludarYPedirdatos()) {
        calcularTotal();
        mostrarResumen();
        }
    }
});
