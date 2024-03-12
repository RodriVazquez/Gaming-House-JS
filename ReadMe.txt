GamingHouse: 

El sitio web consta de dos páginas. Un index y un carrito.

En index.html el objetivo es mostrar todos los productos al abrir la página, que el usuario pueda filtrar productos por su nombre,
y que el número de productos en el carrito se modifique adecuadamente. 
Siempre que lleguemos a 4 caracteres en la barra de búsqueda se generará un nuevo arr con los productos filtrados y una vez que
tengamos 3 caracteres o menos, se vuelven a generar todos los productos. El numero de productos en carrito no se ve afectado por
esta funcionalidad. 

En carrito.html se recuperan del LS los productos que se pushearon al arr carrito en index.html y el objetivo es que suceda lo siguiente:
1- Si NO hay productos en el carrito, unicamente mostrar un mensaje e invitar al usuario a dar click en un texto que redirige al index, 
   para que pueda agregar productos.
2-Si hay productos en el carrito, mostrarlos. Que se actualice bien su cantidad, precio y total de la compra. 
  Tambien que se muestren botones para eliminar un producto, vaciar el carrito completo o realizar la compra.
3-Si se realiza la compra, se muestra un mensaje de compra realizada con exito. 
Nota: Estas funcionalidades de mostrar y no mostrar cosas en base a X interacción, son logradas con una class "disabled{display:none}" en css y
      actualizada en el JS con .classList.add() o classList.remove().