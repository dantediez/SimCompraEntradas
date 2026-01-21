// Variables globales
let nombreUsuario;
let edadUsuario;
let cantidadEntradas;
let tipoEntrada;
let precioEntrada;
let descuento = 0;
let totalAPagar;

// Arrays para tipos de entrada y precios
const tiposEntrada = ["General", "VIP", "Platea"];
const preciosEntrada = [1500, 3000, 2500];

// Función para mostrar las cajas
function mostrarCajas() {
    document.getElementById("caja-preguntas").style.display = "block";
    document.getElementById("consola-mensajes").style.display = "block";
}

// Función para actualizar la consola con mensajes
function actualizarConsola(mensaje) {
    const consola = document.getElementById("consola-mensajes");
    consola.innerHTML += `<p>${mensaje}</p>`;
}

// Función 1: Saludar y pedir datos al usuario
function saludarYPedirdatos() {
    mostrarCajas();
    actualizarConsola("Iniciando simulador...");

    nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
    if (nombreUsuario === null) {
        alert("Operación cancelada por el usuario.");
        actualizarConsola("Simulador cancelado.");
        return false;
    }

    edadUsuario = parseInt(prompt(`Hola, ${nombreUsuario}. ¿Cuántos años tenés?`));
    if (isNaN(edadUsuario)) {
        alert("Por favor, ingresá un número válido para la edad.");
        actualizarConsola("Error: Edad no válida.");
        return false;
    }

    cantidadEntradas = parseInt(prompt("¿Cuántas entradas querés comprar?"));
    if (isNaN(cantidadEntradas)) {
        alert("Por favor, ingresá un número válido para la cantidad de entradas.");
        actualizarConsola("Error: Cantidad de entradas no válida.");
        return false;
    }

    tipoEntrada = prompt(`Elegí el tipo de entrada:\n1. ${tiposEntrada[0]} ($${preciosEntrada[0]})\n2. ${tiposEntrada[1]} ($${preciosEntrada[1]})\n3. ${tiposEntrada[2]} ($${preciosEntrada[2]})`);
    if (tipoEntrada === null || tipoEntrada < 1 || tipoEntrada > 3) {
        alert("Opción de entrada no válida.");
        actualizarConsola("Error: Opción de entrada no válida.");
        return false;
    }
    return true;
}

// Función 2: Calcular el precio total con descuentos
function calcularTotal() {
    let indiceEntrada = parseInt(tipoEntrada) - 1;
    precioEntrada = preciosEntrada[indiceEntrada];
    let subtotal = cantidadEntradas * precioEntrada;

    if (edadUsuario < 12) {
        descuento = 0.2;
    } else if (edadUsuario >= 65) {
        descuento = 0.15;
    }

    totalAPagar = subtotal * (1 - descuento);
}

// Función 3: Mostrar resumen de la compra
function mostrarResumen() {
    console.log(`--- Resumen de compra para ${nombreUsuario} ---`);
    console.log(`Entradas: ${cantidadEntradas} x ${tiposEntrada[tipoEntrada - 1]}`);
    console.log(`Subtotal: $${cantidadEntradas * precioEntrada}`);
    console.log(`Descuento aplicado: ${descuento * 100}%`);
    console.log(`Total a pagar: $${totalAPagar.toFixed(2)}`);

    alert(`¡Gracias, ${nombreUsuario}!\n\nTu compra:\n- ${cantidadEntradas} entradas ${tiposEntrada[tipoEntrada - 1]}\n- Total: $${totalAPagar.toFixed(2)}`);

    // Limpiar la consola antes de mostrar el resumen
    document.getElementById("consola-mensajes").innerHTML = "<strong>Resumen de compra:</strong>";
    actualizarConsola(`- Nombre: ${nombreUsuario}`);
    actualizarConsola(`- Edad: ${edadUsuario} años`);
    actualizarConsola(`- Entradas: ${cantidadEntradas} x ${tiposEntrada[tipoEntrada - 1]}`);
    actualizarConsola(`- Subtotal: $${cantidadEntradas * precioEntrada}`);
    actualizarConsola(`- Descuento aplicado: ${descuento * 100}%`);
    actualizarConsola(`- Total a pagar: $${totalAPagar.toFixed(2)}`);
}

// Evento para iniciar el simulador al hacer clic en el botón
document.getElementById("iniciar-simulador").addEventListener("click", function() {
    if (saludarYPedirdatos()) {
        calcularTotal();
        mostrarResumen();
    }
});
