const loginFormulario = document.querySelector("#formLogin"),
    usuarioLogin = document.querySelector("#userLogin"),
    contraseñaLogin = document.querySelector("#passwordLogin");


    // Funcion que se comunica con el LS para simular un inicio de sesión 
    function login (usuarios) {
        if (!usuarios) {
            Swal.fire({
                icon: "error",
                title: "Usuario no encontrado",
                text: "Revise sus credenciales",
                footer: '<a href="./pages/registro.html">Registrarse</a>'
            });
            return;
        }
        let usuarioEncontrado = usuarios.find ((usuario) => {
            return usuario.usuario == usuarioLogin.value && usuario.contraseña == contraseñaLogin.value;
        });
        if (usuarioEncontrado) {

            Swal.fire({
                title: `Bienvenido/a ${usuarioLogin.value}`,
                text: "En unos segundos serás redirigido/a",
                icon: "success"
            });
            
            setTimeout(function() {
                location.href = "./pages/home.html";
            }, 3000)

        } else {

            Swal.fire({
                icon: "error",
                title: "Usuario no encontrado",
                text: "Revise sus credenciales",
                footer: '<a href="./pages/registro.html">Registrarse</a>'
            });

        }
    }

    // Listener para el submit de Iniciar sesión
    loginFormulario.addEventListener("submit", (e)=> {
        e.preventDefault();
        let usuariosLS = JSON.parse (localStorage.getItem("usuarios"));
        login (usuariosLS)
        return usuariosLS;
    })

    