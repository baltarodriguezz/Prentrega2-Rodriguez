const usuarioInputt = document.querySelector("#user");
const emailInputt = document.querySelector("#email");
const contraseñaInputt = document.querySelector("#contra");
const formularioo = document.querySelector(".form");
const edadInputt = document.querySelector("#edad");
const loginDiv = document.querySelector(".login-div1");
const navbar = document.querySelector(".navbar");
const login = document.querySelector(".login");


const sesionIniciada = localStorage.getItem("sesionIniciada");


if (sesionIniciada === "true") {
    formularioo.style.display = "none";

    // Mostrar mensaje de sesión iniciada
    const usuario = localStorage.getItem("usuario");
    const mensajeHTML = `
        <div class="mensaje">
            <h2>¡Sesión iniciada correctamente!</h2>
            <p>Bienvenido ${usuario}.</p>
        </div>
    `;
    const mensajeElemento = document.createElement("div");
    mensajeElemento.innerHTML = mensajeHTML;
    loginDiv.appendChild(mensajeElemento);
}

function verificarCredenciales() {
    const usuario = usuarioInputt.value;
    const email = emailInputt.value;
    const contraseña = contraseñaInputt.value;

    if (!usuario || !email || !contraseña) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const usuariosGuardadosLogin = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuariosGuardadosLogin || usuariosGuardadosLogin.length === 0) {
        alert("No hay usuarios registrados. Regístrate primero.");
        return;
    }

    let credencialesValidas = false;


    for (const usuarioGuardado of usuariosGuardadosLogin) {
        if (usuario === usuarioGuardado.usuario && email === usuarioGuardado.email && contraseña === usuarioGuardado.contraseña) {

            localStorage.setItem("sesionIniciada", "true");
            localStorage.setItem("usuario", usuario);


            formularioo.style.display = "none";

            const mensajeHTML = `
                <div class="mensaje">
                    <h2>¡Sesión iniciada correctamente!</h2>
                    <p>Bienvenido ${usuario}.</p>
                </div>
            `;
            const mensajeElemento = document.createElement("div");
            mensajeElemento.innerHTML = mensajeHTML;
            loginDiv.appendChild(mensajeElemento);

            credencialesValidas = true;
            break;
        }
    }

    if (!credencialesValidas) {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}

// Escuchar el evento de envío del formulario
formularioo.addEventListener("submit", (e) => {
    e.preventDefault();
    verificarCredenciales();
});
