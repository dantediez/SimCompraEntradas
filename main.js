
let cliente;
cliente = "Juan";
console.log(cliente);

const titulo = document.getElementById("titulo");
titulo.textContent = "Titulo Modificado desde JS";

for (let i = 0 ; i <= 10; i++){
    console.log('numero ' + i);
}

//const password = "12345";

//let passwordIngresado = prompt("Ingrese su contraseña:");

/*while (passwordIngresado != password){
    passwordIngresado = prompt("Contraseña incorrecta. Ingrese su contraseña:");
}*/

const usuarios = [
    {nombre: "Juan", edad : 25, TerminosYCondiciones : true},
    {nombre: "Ana", edad : 15, TerminosYCondiciones : true},
    {nombre: "Luis", edad : 18},
    {nombre: "Maria", edad : 17},
]
for (let i=0; i<usuarios.length; i++){
    if(usuarios[i].edad >= 18 && usuarios[i].TerminosYCondiciones){
        console.log(usuarios[i].nombre + " puede acceder al sitio");
    }
}


function saludar() {
    console.log("¡Hola, mundo!");
}
saludar();


function sumar (a,b){
    return a + b;
}
console.log(sumar(5,10)); //Funcion tradicional

const sumarFlecha = (a,b) => a + b;
console.log(sumarFlecha(7,3)); //Funcion flecha


let cuadrados = [1, 2, 3].map(n => n * n);
console.log(cuadrados);
