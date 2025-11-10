document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Obteniendo productos.');
    const produtos = await api.obtenerProductos();

    console.log('Productos obtenidos correctamente.');
    //Cargar productos con ui
    ui.mostarProductos(produtos);
  } catch (error) {
    console.log(`Error al pedir productos: ${error.message}`);

    //Mostar mensaje de error con ui
  }
});
