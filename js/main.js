const filtrarProd = document.querySelector ("#buscarProducto"),
wrapper = document.querySelector ("#wrapper"),
contenedorProductos = document.querySelector("#productos-carrito"),
numProdCarrito = document.querySelector("#num-prods-carrito")
let btnAgregar = document.querySelectorAll(".btn-agregar");


const productos = [
    // componentes 
    {id: "prod-01", producto: "pc gamer - alta gama", precio: 3000, img: ".././img/pcAlta.png"},
    {id: "prod-02", producto: "pc gamer - gama media", precio: 2000, img: ".././img/pcMedia.png"},
    {id: "prod-03", producto: "pc gamer - gama baja", precio: 1300, img: ".././img/pcBaja.png"},

    {id: "prod-04", producto: "procesador intel i9", precio: 750, img: ".././img/intel-i9.png"},
    {id: "prod-05", producto: "procesador ryzen 7", precio: 500, img: ".././img/ryzen-7.webp"},
    {id: "prod-06", producto: "procesador ryzen 5", precio: 350, img: ".././img/ryzen-5.webp"},

    {id: "prod-07", producto: "memoria ram 32gb (2x16)", precio: 350, img: ".././img/ram32.png"},
    {id: "prod-08", producto: "memoria ram 16gb (2x8)", precio: 200, img: ".././img/ram16.png"},

    {id: "prod-09", producto: "placa video radeon 7900", precio: 1500, img: ".././img/radeon7900.png"},
    {id: "prod-10", producto: "placa video rtx 3090", precio: 1000, img: ".././img/rtx3090.png"},
    {id: "prod-11", producto: "placa video rtx 2080 ti", precio: 750, img: ".././img/rtx2080.png"},

    {id: "prod-12", producto: "fuente - 1050w", precio: 550, img: ".././img/fuente.png"},

    {id: "prod-13", producto: "motherboard amd", precio: 400, img: ".././img/motherAmd.png"},
    {id: "prod-14", producto: "motherboard intel", precio: 400, img: ".././img/motherIntel.png"},

    {id: "prod-15", producto: "disco sólido - 240gb", precio: 200, img: ".././img/disco.png"},


    // periféricos
    {id: "prod-16", producto: "silla gamer", precio: 300, img: ".././img/silla.png"},

    {id: "prod-17", producto: "monitor asus 27' 240hz", precio: 1000, img: ".././img/asus.png"},
    {id: "prod-18", producto: "monitor samsung 24'", precio: 250, img: ".././img/samsung.png"},

    {id: "prod-19", producto: "mouse razer cobra", precio: 150, img: ".././img/razer.png"},
    {id: "prod-20", producto: "mouse logitech g305", precio: 100, img: ".././img/logitech.png"},

    {id: "prod-21", producto: "teclado redragon", precio: 250, img: ".././img/redragon.png"},
    {id: "prod-22", producto: "teclado hyperx", precio: 220, img: ".././img/hyperx.png"},

    {id: "prod-23", producto: "auriculares cloud flight", precio: 250, img: ".././img/cloudFlight.png"},
    {id: "prod-24", producto: "auriculares zeus 2", precio: 150, img: ".././img/zeus2.png"},
];


function filtro() {
    filtrarProd.addEventListener("input", () => {
        const inputValue = filtrarProd.value.toLowerCase();

        if (inputValue.length >= 4) {
            const productoFiltrado = productos.filter((el) => el.producto.toLowerCase().includes(inputValue));

            limpiarHTML(); // Limpiar el contenedor antes de agregar nuevas tarjetas
            crearHTML(productoFiltrado); // Pasar los productos filtrados para crear las tarjetas HTML
        } else {
            limpiarHTML(); // limpia el contenedor si el length es < 4
            crearHTML(productos); // vuelve a generar todos los productos, en este caso sin filtro
        }
    });
}

function limpiarHTML() {
    wrapper.innerHTML = ''; // Limpiar el contenido HTML dentro del contenedor
}

function crearHTML(productosMostrados) {
    for (const producto of productosMostrados) {
        let productoHTML = document.createElement("div");
        productoHTML.classList.add("card");

        productoHTML.innerHTML = `
            <div class="imgBox">
                <img src="${producto.img}" alt="${producto.producto}" class="card-img">
            </div>
            <div class="contentBox">
                <h3>${producto.producto}</h3>
                <h2 class="price">$${producto.precio.toLocaleString()}</h2>
                <button id="${producto.id}" class="btn-agregar"><i class="bi bi-bag-plus-fill"></i>agregar</button>
            </div>
        `;

        wrapper.appendChild(productoHTML);
    }
    actualizarBtnAgregar ();
}

crearHTML(productos); // genero las cards de TODOS LOS PRODUCTOS DEL ARR
filtro(); // filtro los productos del arr por nombre


function actualizarBtnAgregar () {
    btnAgregar = document.querySelectorAll(".btn-agregar");

    btnAgregar.forEach (boton => {
        boton.addEventListener ("click", agregarAlCarrito)
    })
}

let carrito;
const prodsEnCarritoLS = JSON.parse (localStorage.getItem("prodsEnCarrito"))
if (prodsEnCarritoLS) {
    carrito = prodsEnCarritoLS;
    actualizarNumsProdCarrito()
} else {
    carrito = [];
}

function agregarAlCarrito (e) {
    const idProducto = e.currentTarget.id;
    const productoAgregado = productos.find (producto=> producto.id === idProducto);

    if (carrito.some(producto => producto.id === idProducto)) {
        const index = carrito.findIndex(producto => producto.id === idProducto)
        carrito[index].cantidad++
    }else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    
    actualizarNumsProdCarrito ()

    localStorage.setItem("prodsEnCarrito", JSON.stringify(carrito))
}

function actualizarNumsProdCarrito () {
    let numCarrito = carrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numProdCarrito.innerText = numCarrito
}






























// function crearHTML() {
//     let wrapper = document.querySelector("#wrapper"); // Asumiendo que existe un elemento con el ID "wrapper" en tu HTML

//     for (const producto of productos) {
//         let productoHTML = document.createElement("div");
//         productoHTML.classList.add("card");

//         productoHTML.innerHTML = `
//             <div class="imgBox">
//                 <img src="${producto.img}" alt="" class="card-img">
//             </div>
//             <div class="contentBox">
//                 <h3>${producto.producto}</h3>
//                 <h2 class="price">${producto.precio}</h2>
//                 <button class="buy">agregar al carrito</button>
//             </div>
//         `;

//         wrapper.appendChild(productoHTML);
//     }
// }



































































































































/* // Para ingresar, la contraseña correcta es "1234".
let contraseña = "1234";
let login = false; 




// funcion para logear.
function logear () {
    for (let i=0; i <3; i++) {
        let contraseñaIgresada = prompt ("Por favor, escriba su clave");
        if (contraseña == contraseñaIgresada) {
            alert ("¡Bienvenido a GamingHouse!");
            login = true;
            break;
        } else {
            alert ("Datos no válidos. Máximo 3 intentos.");
        }
    }
    if (login == false) {
        alert ("Máximo de intentos realizado. Se te enviará un mail para verificar tu identidad.");
    }
}




// Declaración de los arr a utilizar. 
const productos = [
    {id: 1, producto: "PC Gamer armada", precio: 3000, cantidad: 0},
    {id: 2, producto: "PS5", precio: 2500, cantidad: 0},
    {id: 3, producto: "Procesador", precio: 1000, cantidad: 0},
    {id: 4, producto: "Memoria RAM", precio: 200, cantidad: 0},
    {id: 5, producto: "Joystick", precio: 500, cantidad: 0},
    {id: 6, producto: "Placa de video", precio: 1500, cantidad: 0},
    {id: 7, producto: "Fuente de alimentación", precio: 800, cantidad: 0},
    {id: 8, producto: "Disco sólido", precio: 200, cantidad: 0},
    {id: 9, producto: "Silla Gamer", precio: 300, cantidad: 0},
    {id: 10, producto: "Monitor", precio: 1200, cantidad: 0},
];
const carrito = [];




// Función para filtrar los productos del arr productos en base al precio que el usuario desee.
let precio;
let productosFiltrados; // Este será el arr con los productos filtrados por precio. Contendrá la invocación a la función "filtrar" en caso de que login sea true. 
function filtrar (arr, precio) {
    do {
    precio = parseInt(prompt("Ingrese el precio máximo que está dispuesto a pagar por un solo producto. Le mostraremos las opciones disponibles:"));
    if (precio > 0 && !isNaN(precio)){
        const productoFiltrado = arr.filter (producto => producto.precio <= precio);
        return productoFiltrado;
    } else {
        alert ("Ingrese un precio válido");
    }
} while (true);
}




// Función para mostrar los productos filtrados en la función anterior (filtrar)
let mensaje; 
function mostrarProdFiltrados (arr) {
    mensaje = "Productos disponibles:\n"
    arr.forEach(prodFiltrado => { 
        mensaje += prodFiltrado.id + "- " + prodFiltrado.producto + " - Precio: " + prodFiltrado.precio + "\n";
    });
}




// Función de compra. El usuario elige producto y cantidad de cada uno. Esto se pushea al arr vacío carrito.
let total = 0;
let productoElegido;
function comprar (){
    let cantidad = 0;
    do {
        productoElegido = prompt("Elija el producto que desea escribiendo su número: \n\n" + mensaje + "\n Para salir, ingrese X");
        let productoEncontrado = productosFiltrados.find ((producto) => {
            return producto.id == productoElegido;
        })
        if (productoEncontrado && productoEncontrado.id === parseInt(productoElegido)) {

                alert ("Usted eligió: " + productoEncontrado.producto);

                do {
                    cantidad = parseInt(prompt ("Cúantos desea comprar?"));
                } while (cantidad <= 0  || isNaN(cantidad));

                productoEncontrado.cantidad = cantidad;
                total += cantidad * productoEncontrado.precio;
                carrito.push (productoEncontrado);
            } else if (productoElegido != "x") {
                alert ("Ingrese una opción válida");
            } 
    } while (productoElegido != "x");
}




// Mostramos el arr carrito y un resumen de compra.
let mensaje2 
function mostrarCarrito () {
    if (carrito.length == 0) {
        alert ("El carrito está vacío. Gracias por su visita!");
        return;
    } else {
        mensaje2 = "Resumen de su compra:\n";
        carrito.forEach(producto => {
            mensaje2 += producto.producto + " - Precio: " + producto.precio + " - Cantidad: " + producto.cantidad + "\n"
        });
    }
    alert (mensaje2 + "\nEl total de su compra es: " +  total + " U$D.  ¡Gracias por elegirnos!");
}



logear();

if (login) {
    productosFiltrados = filtrar(productos, precio); // ESTE ES EL ARRAY CON LOS PRODUCTOS FILTRADOS POR PRECIO.
    mostrarProdFiltrados(productosFiltrados);  // Le pasamos como parámetro el arr productosFiltrados para ver el resultado de la búsqueda del usuario
    comprar();
    mostrarCarrito();
} */
