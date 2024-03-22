const loginFormulario = document.querySelector("#formLogin"),
    usuarioLogin = document.querySelector("#userLogin"),
    contraseñaLogin = document.querySelector("#passwordLogin");

    function login (usuarios) {
        if (!usuarios) {
            // alert de sweetalert
            alert ("usuario no encontrado"); // solo de testeo
            return;
        }
        let usuarioEncontrado = usuarios.find ((usuario) => {
            return usuario.usuario == usuarioLogin.value && usuario.contraseña == contraseñaLogin.value;
        });
        if (usuarioEncontrado) {
            location.href="./pages/home.html";
        } else {
            // alert de sweetalert
            alert ("usuario no encontrado");
            console.log("not user"); // solo de testeo
        }
    }


    loginFormulario.addEventListener("submit", (e)=> {
        e.preventDefault();
        let usuariosLS = JSON.parse (localStorage.getItem("usuarios"));
        login (usuariosLS)
        return usuariosLS;
    })