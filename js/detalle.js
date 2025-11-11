document.addEventListener('DOMContentLoaded', () => {
  const parametrosURL = new URLSearchParams(window.location.search);
  const productoId = parametrosURL.get('id');
  const contenedorDetalle = document.getElementById('contenedor-detalle');

  if (!productoId || !contenedorDetalle) {
    contenedorDetalle.innerHTML =
      '<h2 class="text-danger">Error: Producto no encontrado.</h2>';
    return;
  }

  const iniciarDetalle = async () => {
    try {
      contenedorDetalle.innerHTML =
        '<div class="col-12 text-center text-muted">Cargando productos destacados...</div>';

      console.log('Obteniendo producto...');
      productoEncontrado = await api.obtenerProductoId(productoId);
      console.log('Producto obtenido correctamente.');

      render.crearDetalleProducto(productoEncontrado, contenedorDetalle);
      const botonAgregar = document.getElementById('btn-agregar-detalle');

      botonAgregar.addEventListener('click', () => {
        carrito.agregar(productoEncontrado);
      });
    } catch (error) {
      console.log(`Error al buscar producto: ${error.message}`);
      render.mostarError(error, contenedorDetalle);
    }
  };

  iniciarDetalle();
});
