document.addEventListener('DOMContentLoaded', async () => {
  // Usaremos una API pública que devuelve 20 productos.
  const productsContainer = document.getElementById('productos-container');

  // Función para obtener productos de la API
  try {
    productsContainer.innerHTML =
      '<div class="col-12 text-center text-muted">Cargando productos destacados...</div>';

    console.log('Obteniendo productos...');
    const todosLosProductos = await api.obtenerProductos();
    console.log('Productos obtenidos correctamente.');

    render.crearProductosDestacados(todosLosProductos, productsContainer);
  } catch (error) {
    console.log(`Error al pedir productos: ${error.message}`);
    render.mostarError(error, productsContainer);
  }
});
