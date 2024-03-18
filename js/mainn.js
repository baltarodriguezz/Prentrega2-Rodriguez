const productos = document.querySelectorAll(".productos .card");
const carritols = JSON.parse(localStorage.getItem('carrito')) || []; // Inicializar carrito desde el localStorage

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
    window.location.href = 'login.html';
}

function agregarAlCarro(producto){
    carritols.push(producto); 
    localStorage.setItem('carrito', JSON.stringify(carritols)); 
}

for (const producto of productos) {
    const botonAgregarCarro = producto.querySelector(".agregar-carro");

    botonAgregarCarro.addEventListener("click", () => {
        const nombreProducto = producto.querySelector(".card-title").innerText;
        const precioProducto = producto.querySelector("h3").innerText;
        const imagenProducto = producto.querySelector(".card-img-top").getAttribute('src');

        const productoAgregar = {
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: imagenProducto
        };
        agregarAlCarro(productoAgregar); 
    });
}
function crearHtml(arr) {
    const contenedor = document.querySelector(".productos");
    contenedor.innerHTML = "";
    let html;
    for (const el of arr) {
        const { nombre, precio, imagen } = el; //desectructuraciojn
      html = '<div class="card" style="width: 18rem;">' +
      '<img src="' + imagen + '" class="card-img-top" alt="' + nombre + '">' +
      '<div class="card-body">' +
             '<h5 class="card-title">' + nombre + '</h5>' +
             '<h3>$' + precio + '</h3>' +
             '<img src="img/icons8-navegar-ios-17-96.png" alt="">' +
          '</div>' +
      '</div>';
      contenedor.innerHTML += html;
    }
}

const carritoIcono = document.querySelector(".carrito")
const botonVaciarCarrito = document.querySelector(".vaciar-carrito");
const login = document.querySelector(".login")
const flecha = document.querySelector(".flecha")

carritoIcono.addEventListener('click', ()=>{
    crearHtml(carritols);
    botonVaciarCarrito.style.display = "block"; 
    carritoIcono.style.display = "none";
    flecha.style.display = "block";
    flecha.style.position = "relative";
    flecha.style.left= "345px"   
});
botonVaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem('carrito');
    crearHtml([]);
});

flecha.addEventListener('click', () => {
    window.location.href = 'productos.html';
});


