const filtrarProd = document.querySelector ("#buscarProducto"),
wrapper = document.querySelector ("#wrapper"),
contenedorProductos = document.querySelector("#productos-carrito"),
numProdCarrito = document.querySelector("#num-prods-carrito")
let btnAgregar = document.querySelectorAll(".btn-agregar");

const URL = "../db/db.json"
fetch (URL)
.then (res => res.json()
.then(data => {
    productos = data.productos;
    crearHTML(productos);
}))

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





///////////// FUNCIONES /////////////


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

        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            offset: {
                x: 0, 
                y: 130
            },
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(90deg, rgba(46,46,177,1) 0%, rgba(101,14,214,0.90) 22%, rgba(222,0,255,0.4317927854735645) 100%)",
            },
            onClick: function(){} 
        }).showToast();
}

// funcion para que el numero de productos en el carrito (que se sitúa al lado de la imagen del carrito en el nav) se actualice correctamente.
function actualizarNumsProdCarrito () {
    let numCarrito = carrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numProdCarrito.innerText = numCarrito
}
