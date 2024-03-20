const filtrarProd = document.querySelector ("#buscarProducto"),
wrapper = document.querySelector ("#wrapper"),
contenedorProductos = document.querySelector("#productos-carrito"),
numProdCarrito = document.querySelector("#num-prods-carrito")
let btnAgregar = document.querySelectorAll(".btn-agregar");


const productos = [
    // componentes 
    {id: "prod-01", producto: "pc gamer - alta gama", precio: 3000, img: "./img/pcAlta.png"},
    {id: "prod-02", producto: "pc gamer - gama media", precio: 2000, img: "./img/pcMedia.png"},
    {id: "prod-03", producto: "pc gamer - gama baja", precio: 1300, img: "./img/pcBaja.png"},

    {id: "prod-04", producto: "procesador intel i9", precio: 750, img: "./img/intel-i9.png"},
    {id: "prod-05", producto: "procesador ryzen 7", precio: 500, img: "./img/ryzen-7.webp"},
    {id: "prod-06", producto: "procesador ryzen 5", precio: 350, img: "./img/ryzen-5.webp"},

    {id: "prod-07", producto: "memoria ram 32gb (2x16)", precio: 350, img: "./img/ram32.png"},
    {id: "prod-08", producto: "memoria ram 16gb (2x8)", precio: 200, img: "./img/ram16.png"},

    {id: "prod-09", producto: "placa video radeon 7900", precio: 1500, img: "./img/radeon7900.png"},
    {id: "prod-10", producto: "placa video rtx 3090", precio: 1000, img: "./img/rtx3090.png"},
    {id: "prod-11", producto: "placa video rtx 2080 ti", precio: 750, img: "./img/rtx2080.png"},

    {id: "prod-12", producto: "fuente - 1050w", precio: 550, img: "./img/fuente.png"},

    {id: "prod-13", producto: "motherboard amd", precio: 400, img: "./img/motherAmd.png"},
    {id: "prod-14", producto: "motherboard intel", precio: 400, img: "./img/motherIntel.png"},

    {id: "prod-15", producto: "disco sólido - 240gb", precio: 200, img: "./img/disco.png"},


    // periféricos
    {id: "prod-16", producto: "silla gamer", precio: 300, img: "./img/silla.png"},

    {id: "prod-17", producto: "monitor asus 27' 240hz", precio: 1000, img: "./img/asus.png"},
    {id: "prod-18", producto: "monitor samsung 24'", precio: 250, img: "./img/samsung.png"},

    {id: "prod-19", producto: "mouse razer cobra", precio: 150, img: "./img/razer.png"},
    {id: "prod-20", producto: "mouse logitech g305", precio: 100, img: "./img/logitech.png"},

    {id: "prod-21", producto: "teclado redragon", precio: 250, img: "./img/redragon.png"},
    {id: "prod-22", producto: "teclado hyperx", precio: 220, img: "./img/hyperx.png"},

    {id: "prod-23", producto: "auriculares cloud flight", precio: 250, img: "./img/cloudFlight.png"},
    {id: "prod-24", producto: "auriculares zeus 2", precio: 150, img: "./img/zeus2.png"},
];


// la siguiente funcion filtra los productos por su nombre, y vuelve a mostrar el arr completo en el DOM una vez que borramos lo que buscamos.
function filtro() {
    filtrarProd.addEventListener("input", () => {
        const inputValue = filtrarProd.value.toLowerCase();

        if (inputValue.length >= 4) {
            const productoFiltrado = productos.filter((el) => el.producto.toLowerCase().includes(inputValue));

            limpiarHTML(); // Limpiar el contenedor antes de agregar nuevas tarjetas
            crearHTML(productoFiltrado); // Pasar los productos filtrados para crear las tarjetas HTML
        } else {
            limpiarHTML(); // limpia el contenedor si el length es < 4
            crearHTML(productos); // vuelve a generar todos los productos del arr
        }
    });
}

// Limpiar el contenido HTML dentro del contenedor
function limpiarHTML() {
    wrapper.innerHTML = ''; 
}

// Crea las cards en el HTML
function crearHTML(productosMostrados) {

    for (const prod of productosMostrados) {
        
        const {id, producto, precio, img} = prod; // el nombre de esta variable tiene que ser la misma que la del bucle for...of

        let productoHTML = document.createElement("div");
        productoHTML.classList.add("card");

        productoHTML.innerHTML = `
            <div class="imgBox">
                <img src="${img}" alt="${producto}" class="card-img">
            </div>
            <div class="contentBox">
                <h3>${producto}</h3>
                <h2 class="price">$${precio.toLocaleString()}</h2>
                <button id="${id}" class="btn-agregar"><i class="bi bi-bag-plus-fill"></i>agregar</button>
            </div>
        `;

        wrapper.appendChild(productoHTML);
    }
    actualizarBtnAgregar ();
}

crearHTML(productos); // genero las cards de TODOS LOS PRODUCTOS DEL ARR
filtro(); // filtro los productos del arr por nombre

// arr carrito dentro de LS
let carrito;
const prodsEnCarritoLS = JSON.parse (localStorage.getItem("prodsEnCarrito"))
if (prodsEnCarritoLS) {
    carrito = prodsEnCarritoLS;
    actualizarNumsProdCarrito()
} else {
    carrito = [];
}

// funcion para poder utilizar el boton "agregar"
function actualizarBtnAgregar () {
    btnAgregar = document.querySelectorAll(".btn-agregar");

    btnAgregar.forEach (boton => {
        boton.addEventListener ("click", agregarAlCarrito)
    })
}

// funcion que agrega productos al carrito utilizando el boton configurado en la funcion anterior (actualizarBtnAgregar)
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

// funcion para que el numero de productos en el carrito (que se sitúa al lado de la imagen del carrito en el nav) se actualice correctamente.
function actualizarNumsProdCarrito () {
    let numCarrito = carrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numProdCarrito.innerText = numCarrito
}
