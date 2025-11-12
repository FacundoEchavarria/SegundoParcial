// FUNCION AL CARGAR ELEMENTOS DE PAGINA CATALOGO
document.addEventListener('DOMContentLoaded', async () => {
  const contenedorProductos = document.getElementById('contenedor-productos');
  let todosLosProductos = [];

  // FUNCION DE CARGA Y RENDERIZADO
  const inicialCatalogo = async () => {
    try {
      console.log('Obteniendo productos...');
      todosLosProductos = await api.obtenerProductos();
      console.log('Productos obtenidos correctamente.');

      render.crearTarjetaProducto(todosLosProductos, contenedorProductos);
      agregarListenersBoton();
    } catch (error) {
      console.log(`Error al pedir productos: ${error.message}`);
      render.mostarError(error, contenedorProductos);
    }
  };

  // FUNCION DE INICIALIZACIÓN DE LISTENERS

  const agregarListenersBoton = () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach((boton) => {
      boton.addEventListener('click', (evento) => {
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

  inicialCatalogo();
});
