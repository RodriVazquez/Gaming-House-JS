const registroFormulario =  document.querySelector("#formRegister"),
    nombreR = document.querySelector("#nombre"),
    usuarioR = document.querySelector("#usuario"),
    emailR = document.querySelector("#email"),
    contraseñaR = document.querySelector("#contraseña"),
    btnR = document.querySelector("#registrarse");


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


function Usuario (nombre, usuario, email, contraseña) {
    this.nombre = nombre;
    this.usuario = usuario;
    this.email = email;
    this.contraseña = contraseña;

};


registroFormulario.addEventListener("submit", (e)=> {
    e.preventDefault();
    const nuevoUsuario = new Usuario (nombre.value, usuarioR.value, emailR.value, contraseñaR.value);
    usuarios.push (nuevoUsuario);
    if (nuevoUsuario) {
        Swal.fire({
            title: "Registrado con éxito",
            text: "En unos segundos serás redirigido",
            icon: "success"
        });

        setTimeout(function() {
            location.href = "../index.html";
        }, 3000)
    }
    let guardarEnLS = localStorage.setItem("usuarios", JSON.stringify(usuarios));
    registroFormulario.reset();
    return guardarEnLS;
})

