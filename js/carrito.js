const prodsEnCarrito = JSON.parse (localStorage.getItem("prodsEnCarrito"))
console.log(prodsEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-products");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprar = document.querySelector("#carrito-comprado");
let carritoEliminarProd = document.querySelectorAll(".btn-eliminar");
const btnVaciar = document.querySelector("#btn-vaciar-carrito");
const total = document.querySelector("#total");
const btnComprar = document.querySelector("#btn-comprar-carrito");



function mostrarProdsEnCarrito () {
    if (prodsEnCarrito && prodsEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprar.classList.add("disabled");

        carritoProductos.innerHTML = "";

        prodsEnCarrito.forEach(producto =>{
            const div = document.createElement ("div");
            div.classList.add ("carrito-products");
            div.innerHTML = `
            <div>
                <div class="product">

                <img src="${producto.img}" alt="${producto.producto}">

                <div>
                    <small>Producto:</small>
                    <p class="upperCase">${producto.producto}</p>
                </div>

                <div>
                    <small>Cantidad:</small>
                    <p class="upperCase">${producto.cantidad}</p>
                </div>

                <div>
                    <small>Precio:</small>
                    <p class="upperCase">${producto.precio}</p>
                </div>
                
                <div>
                    <small>Subtotal:</small>
                    <p class="upperCase">${producto.precio * producto.cantidad}</p>
                </div>
                
                <button class="btn-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
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

mostrarProdsEnCarrito ();


function actualizarBtnEliminar () {
    carritoEliminarProd = document.querySelectorAll(".btn-eliminar");

    carritoEliminarProd.forEach (boton => {
        boton.addEventListener ("click", eliminarProd)
        
    })

}

function eliminarProd (e) {
    const idProducto = e.currentTarget.id;
    const index = prodsEnCarrito.findIndex(producto => producto.id === idProducto);
    prodsEnCarrito.splice(index, 1);

    mostrarProdsEnCarrito ();


    localStorage.setItem("prodsEnCarrito", JSON.stringify(prodsEnCarrito))
}


btnVaciar.addEventListener ("click", vaciarCarrito);
function vaciarCarrito () {
    prodsEnCarrito.length = 0;
    localStorage.setItem ("prodsEnCarrito", JSON.stringify(prodsEnCarrito));
    mostrarProdsEnCarrito ()
}


function actualizarTotal (){
    const totalActualizado = prodsEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `Total: $${totalActualizado.toLocaleString()}`
}



btnComprar.addEventListener ("click", comprarCarrito);
function comprarCarrito () {
    prodsEnCarrito.length = 0;
    localStorage.setItem ("prodsEnCarrito", JSON.stringify(prodsEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprar.classList.remove("disabled");
}

