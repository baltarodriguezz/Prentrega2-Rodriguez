let usuarioG;
let contraseñaG;

function iniciarSesion() {
    let usuario = prompt("Ingresa tu usuario");
    let contraseña = prompt("Ingrese su contraseña");
    
    if (usuario !== null && contraseña !== null && usuario !== "" && contraseña !== "") {
        alert("Bienvenido " + usuario);
        usuarioG = usuario;
        contraseñaG = contraseña;
    } else {
        alert("No se ingresó correctamente el usuario y su contraseña");
    }
}

function Prenda(nombre, precio, color, talles) {
    this.nombre = nombre;
    this.precio = precio;
    this.color = color;
    this.talles = talles;
}

const remeras = [
    new Prenda("SURREAL JOURNEY", 25000, "Beige", ["S", "M", "L"]),
    new Prenda("PURE SOUL", 30000, "Negro", ["S", "M", "L", "XL"]),
    new Prenda("ELEMENTS", 22000, "Blanco", ["S", "M"])
];

const buzos = [
    new Prenda("BASIC HODDIE", 27000, "Negro", ["S", "M", "L", "XL"]),
    new Prenda("PISTACHIO", 24000, "Gris", ["S", "M", "L"]),
    new Prenda("CLASSIC CREWNECK", 16000, "Azul", ["M", "L", "XL"])
];

const camisas = [
    new Prenda("ACAPULCO", 35000, "Negro", ["S", "M", "L", "XL"]),
    new Prenda("PALMS", 32000, "Beige", ["S", "M", "L"]),
    new Prenda("GREEN", 26000, "Verde", ["S", "M"])
];

const tops = [
    new Prenda("HEARTS", 25000, "Blanco", ["S", "M"]),
    new Prenda("HOT BODY", 26000, "Blanco", ["M", "L"]),
    new Prenda("BASIC W", 22000, "Verde", ["S", "L"])
]

const todasLasPrendas = remeras.concat(buzos, camisas, tops);

let prendasDelColorSeleccionado;

do {
    let elegirColor = prompt("Selecciona un color");
    prendasDelColorSeleccionado = todasLasPrendas.filter(prenda => prenda.color === elegirColor);

    if (prendasDelColorSeleccionado.length === 0) {
        alert("No hay prendas de color " + elegirColor);
    } else {
        let mensaje = "Prendas de color " + elegirColor + " encontradas:\n";
        prendasDelColorSeleccionado.forEach(prenda => {
            mensaje += "Nombre: " + prenda.nombre + "\n";
        });
        alert(mensaje);

        let talleSeleccionado;
        do {
            talleSeleccionado = prompt("Por favor, selecciona el talle de la prenda (" + prendasDelColorSeleccionado[0].talles.join(", ") + "):");
            if (!prendasDelColorSeleccionado[0].talles.includes(talleSeleccionado)) {
                alert("El talle seleccionado no es válido. Por favor, elija uno de los tamaños disponibles.");
            }
        } while (!prendasDelColorSeleccionado[0].talles.includes(talleSeleccionado));

        let precioDisponible = parseFloat(prompt("Selecciona tu precio disponible"));

        const prendasDisponibles = prendasDelColorSeleccionado.filter(prenda => prenda.talles.includes(talleSeleccionado) && prenda.precio <= precioDisponible);

        if (prendasDisponibles.length > 0) {
            let mensaje2 = "Prendas disponibles dentro de tu rango de precio y en el talle seleccionado:\n";
            prendasDisponibles.forEach(prenda => {
                mensaje2 += "Nombre: " + prenda.nombre +  "\n";
            });
            alert(mensaje2);

            const nombresPrendasDisponibles = prendasDisponibles.map(prenda => prenda.nombre);

            let prendaSeleccionada;
            do {
                prendaSeleccionada = prompt("Por favor, seleccione una prenda:\n" + nombresPrendasDisponibles.join("\n"));
                if (!nombresPrendasDisponibles.includes(prendaSeleccionada)) {
                    alert("La prenda seleccionada no está disponible. Por favor, elija una de la lista.");
                }
            } while (!nombresPrendasDisponibles.includes(prendaSeleccionada));

            function agregarAlCarrito(carrito, prendaSeleccionada) {
                carrito.push(prendaSeleccionada);
                alert("¡Prenda " + prendaSeleccionada + " agregada al carrito!");
            }

            const carrito = [];
            agregarAlCarrito(carrito, prendaSeleccionada);
            console.log(carrito);
        } else {
            alert("No hay prendas disponibles dentro de tu rango de precio en el talle seleccionado.");
        }
    }
} while (prendasDelColorSeleccionado.length === 0);