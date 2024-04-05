const productos = document.querySelectorAll(".productos .card");
const carritols = JSON.parse(localStorage.getItem("carrito")) || []; // Inicializar carrito desde el localStorage

// Recorrer las tarjetas de producto
const productosArray = [];
for (const producto of productos) {
    // Obtener el título, el precio y la imagen de la tarjeta actual
    const titulo = producto.querySelector('.card-title').innerText;
    const precio = producto.querySelector('h3').innerText;
    const imagen = producto.querySelector('.card-img-top').getAttribute('src');

    const productoObjeto = {
        nombre: titulo,
        precio: precio,
        imagen: imagen 
    };

    productosArray.push(productoObjeto);
}

function redirectToLoginPage() {
    window.location.href = "login.html";
}
// Seleccionar el elemento del carrito y el elemento de espacio2
const espacio2 = document.querySelector(".espacio2");
const espacio = document.querySelector(".espacio");



function agregarAlCarro(producto){
    carritols.push(producto); 
    localStorage.setItem("carrito", JSON.stringify(carritols));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        color: "#000000",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
        ,
        customClass: {
            popup: 'sweetalert-popup',
        }
      });
      Toast.fire({
        icon: "success",
        title: `¡${producto.nombre} agregado al carrito!`
      }); 
}

for (const producto of productos) {
    const botonAgregarCarro = producto.querySelector(".agregar-carro");

    botonAgregarCarro.addEventListener("click", () => {
        const nombreProducto = producto.querySelector(".card-title").innerText;
        const precioProducto = producto.querySelector("h3").innerText;
        const imagenProducto = producto.querySelector(".card-img-top").getAttribute("src");

        const productoAgregar = {
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: imagenProducto
        };
        agregarAlCarro(productoAgregar); 
    });
}


function crearHtmlPromise(arr) {
    return new Promise((resolve, reject) => {
        const contenedor = document.querySelector(".productos");
        contenedor.innerHTML = "";
        let html = "";
        for (const el of arr) {
            const { nombre, precio, imagen } = el; 
            html += '<div class="card" style="width: 18rem;">' +
                '<img src="' + imagen + '" class="card-img-top" alt="' + nombre + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + nombre + '</h5>' +
                '<h3>$' + precio + '</h3>' +
                '<img src="img/icons8-navegar-ios-17-96.png" alt="">' +
                '</div>' +
                '</div>';
        }
        contenedor.innerHTML = html;
        
        resolve();
    });
}
const footer = document.querySelector("div-footer")
const carritoIcono = document.querySelector(".carrito");
const flechaAtras = document.querySelector(".flecha-atras");
const botonVaciarCarrito = document.querySelector(".vaciar-carrito");
carritoIcono.addEventListener("click", () => {
    crearHtmlPromise(carritols)
        .then(() => {
            flechaAtras.style.display = "block";
            botonVaciarCarrito.style.display = "block";
        })
        .catch(error => {
            console.error('Error al crear el HTML:', error);
        });
});



flechaAtras.addEventListener('click', () => {
    window.location.href = "productos.html";
});

botonVaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    carritols.length = 0;
    crearHtmlPromise([])
        .catch(error => {
            console.error('Error al crear el HTML:', error);
        });
});

fetch("./json/main.json")
.then(response => response.json())
.then(data => {
    console.log(data);
    })// me da error aca pero lo pongo porque no se cual seria el error que seguro es algo tonto pero bueno no se que paso, lo intente
