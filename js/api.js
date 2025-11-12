// FUNCIONES DE CONECCION CON API
const api = {
  // GET DE TODOS LOS PRODUCTOS
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
      throw error;
    }
  },

  // GET DE PRODUCTO INDIVIDUAL POR ID
  obtenerProductoId: async (id) => {
    const URL_PROD = `https://fakestoreapi.com/products/${id}`;

    try {
      const respuesta = await fetch(URL_PROD);
      if (!respuesta.ok) {
        throw new Error(
          `Error buscando al producto con el id ${id}: ${respuesta.status}`
        );
      }

      const producto = await respuesta.json();
      return producto;
    } catch (error) {
      throw error;
    }
  },
};
