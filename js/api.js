const api = {
  obtenerProductos: async () => {
    const URL_PROD = 'https://fakestoreapi.com/products';

    try {
      const respuesta = await fetch(URL_PROD);
      if (!respuesta.ok) {
        throw new Error(`Error al pedir productos: ${respuesta.status}`);
      }

      const productos = await respuesta.json();
      return productos;
    } catch (error) {
      console.log(`Error al pedir productos: ${error.message}`);
      throw error;
    }
  },

  obtenerProductoId: async (id) => {
    const URL_PROD = `https://fakestoreapi.com/products/${id}`;

    try {
      const respuesta = await fetch(URL_PROD);
      if (!respuesta.ok) {
        console.log(
          `Error buscando al producto con el id ${id}: ${respuesta.status}`
        );
      }

      const producto = await respuesta.json();
      return producto;
    } catch (error) {
      console.log(
        `Error buscando al producto con el id ${id}: ${error.message}`
      );
      throw error;
    }
  },
};
