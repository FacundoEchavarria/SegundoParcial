document.addEventListener('DOMContentLoaded', () => {
  // Usaremos una API pública que devuelve 20 productos.
  const productsContainer = document.getElementById('productos-container');
  let todosLosProductos = [];

  // Función para obtener productos de la API
  const iniciarIndex = async () => {
    try {
      productsContainer.innerHTML =
        '<div class="col-12 text-center text-muted">Cargando productos destacados...</div>';

      console.log('Obteniendo productos...');
      todosLosProductos = await api.obtenerProductos();
      console.log('Productos obtenidos correctamente.');

      render.crearProductosDestacados(todosLosProductos, productsContainer);
      agregarListenersBoton();
    } catch (error) {
      console.log(`Error al pedir productos: ${error.message}`);
      render.mostarError(error, productsContainer);
    }
  };

  const agregarListenersBoton = () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach((boton) => {
      boton.addEventListener('click', (evento) => {
        // Obtiene el ID del producto del atributo data-product-id
        const productoId = parseInt(evento.currentTarget.dataset.productId);
        if (!isNaN(productoId)) {
          const productoEncontrado = todosLosProductos.find(
            (p) => p.id === productoId
          );
          carrito.agregar(productoEncontrado);
          render.mostrarToast('Producto agregado al carrito', 'succes');
        } else {
          console.error('Error: Producto no encontrado.');
        }
      });
    });
  };

  iniciarIndex();
});
