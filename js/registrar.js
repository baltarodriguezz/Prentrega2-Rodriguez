const usuarioInput = document.querySelector("#user2");
const emailInput = document.querySelector("#email2");
const contraseñaInput = document.querySelector("#contra2");
const formulario = document.querySelector(".form-registar");
const edadInput = document.querySelector("#edad2");
const boton = document.querySelector(".boton-ingresar");

function obtenerUsuariosGuardados() {
    const usuariosGuardadosJSON = localStorage.getItem("usuarios");
    return usuariosGuardadosJSON ? JSON.parse(usuariosGuardadosJSON) : [];
}

function guardarEnLS(clave, objeto) {
    localStorage.setItem(clave, JSON.stringify(objeto));
}

let usuariosGuardados = obtenerUsuariosGuardados(); 

function Usuario(nombre, edad, email, contraseña) {
    this.usuario = nombre;
    this.edad = edad;
    this.email = email;
    this.contraseña = contraseña;
}

function guardarUsuario() {
    const usuario = usuarioInput.value;
    const edad = edadInput.value;
    const email = emailInput.value;
    const contraseña = contraseñaInput.value;

    const nuevoUsuario = new Usuario(usuario, edad, email, contraseña);
    usuariosGuardados.push(nuevoUsuario);
    guardarEnLS("usuarios", usuariosGuardados);

    usuarioInput.value = "";
    edadInput.value = "";
    emailInput.value = "";
    contraseñaInput.value = "";
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarUsuario();
    window.location.href = "login.html";
});
