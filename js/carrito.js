const prodsEnCarrito = JSON.parse (localStorage.getItem("prodsEnCarrito"))

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-products");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprar = document.querySelector("#carrito-comprado");
let carritoEliminarProd = document.querySelectorAll(".btn-eliminar");
const btnVaciar = document.querySelector("#btn-vaciar-carrito");
const total = document.querySelector("#total");
const btnComprar = document.querySelector("#btn-comprar-carrito");


mostrarProdsEnCarrito ();
btnVaciar.addEventListener ("click", vaciarCarrito);
btnComprar.addEventListener ("click", comprarCarrito);





///////////// FUNCIONES /////////////


// funcion que recupera del LS los productos que habia en el arr carrito del index y los genera en el html.
function mostrarProdsEnCarrito () {

    if (prodsEnCarrito && prodsEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprar.classList.add("disabled");

        carritoProductos.innerHTML = "";

        prodsEnCarrito.forEach(prod =>{
            const {id, producto, precio, img, cantidad} = prod
            const div = document.createElement ("div");
            div.classList.add ("carrito-products");
            div.innerHTML = `
            <div>
                <div class="product">

                <img src="${img}" alt="${producto}">

                <div>
                    <small>Producto:</small>
                    <p class="upperCase">${producto}</p>
                </div>

                <div>
                    <small>Cantidad:</small>
                    <p class="upperCase">${cantidad}</p>
                </div>

                <div>
                    <small>Precio:</small>
                    <p class="upperCase">${precio}</p>
                </div>
                
                <div>
                    <small>Subtotal:</small>
                    <p class="upperCase">${precio * cantidad}</p>
                </div>
                
                <button class="btn-eliminar" id="${id}"><i class="bi bi-trash3-fill"></i></button>
            </div>`;

            carritoProductos.append(div)
        })

    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprar.classList.add("disabled");
    }

    
    actualizarBtnEliminar ();
    actualizarTotal ()
}

// funcion para poder utilizar el icono de "eliminar"
function actualizarBtnEliminar () {
    carritoEliminarProd = document.querySelectorAll(".btn-eliminar");

    carritoEliminarProd.forEach (boton => {
        boton.addEventListener ("click", eliminarProd)
    })
}

// funcion que elimina productos del carrito utilizando el boton configurado en la funcion anterior (actualizarBtnEliminar)
function eliminarProd (e) {
    const idProducto = e.currentTarget.id;
    const index = prodsEnCarrito.findIndex(producto => producto.id === idProducto);
    prodsEnCarrito.splice(index, 1);

    mostrarProdsEnCarrito ();

    localStorage.setItem("prodsEnCarrito", JSON.stringify(prodsEnCarrito))
}

// funcion que elimina TODOS los productos del carrito
function vaciarCarrito () {
    prodsEnCarrito.length = 0;
    localStorage.setItem ("prodsEnCarrito", JSON.stringify(prodsEnCarrito));
    mostrarProdsEnCarrito ()
}

// funcion que actualiza el total del carrito con el método .reduce
function actualizarTotal (){
    const totalActualizado = prodsEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `Total: $${totalActualizado.toLocaleString()}` // .toLocaleString() para que aparezca el separador de millares  (Vemos 1.000 en vez de 1000)
}

// funcion para comprar todos los productos del carrito. Al no tener una base de datos, la funcion es similar a la de vaciarCarrito, pero en este caso hace que se muestre un mensaje de "compra exitosa" en vez de "carrito vacio" (todo con el uso de .classList add y remove). 
function comprarCarrito () {
    prodsEnCarrito.length = 0;
    localStorage.setItem ("prodsEnCarrito", JSON.stringify(prodsEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprar.classList.remove("disabled");
}

