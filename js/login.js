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

                    Swal.fire({
                        title: `Bienvenido ${usuarioLogin.value}`,
                        text: "En unos segundos serás redirigido",
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


    loginFormulario.addEventListener("submit", (e)=> {
        e.preventDefault();
        let usuariosLS = JSON.parse (localStorage.getItem("usuarios"));
        login (usuariosLS)
        return usuariosLS;
    })

    