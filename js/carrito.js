const carrito = {
  CLAVE_STORAGE: 'carrito',

  obtener: () => {
    const carritoJSON = localStorage.getItem(carrito.CLAVE_STORAGE);
    return carritoJSON ? JSON.parse(carritoJSON) : [];
  },

  guardar: (items) => {
    localStorage.setItem(carrito.CLAVE_STORAGE, JSON.stringify(items));
    carrito.actualizarIcono();
  },

  agregar: (producto) => {
    const items = carrito.obtener();
    const itemExistente = items.find((item) => item.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      const itemNuevo = {
        id: producto.id,
        title: producto.title,
        price: producto.price,
        image: producto.image,
        cantidad: 1,
      };
      items.push(itemNuevo);
    }

    carrito.guardar(items);

    console.log('Producto agregado al carrito:', items);
  },

  eliminar: (productoId) => {},

  actualizarIcono: () => {
    const iconoCarrito = document.getElementById('icono-carrito-contador');

    const productosCarrito = carrito.obtener();
    const cantidadProductos = productosCarrito.length;

    if (cantidadProductos > 0) {
      iconoCarrito.innerText = cantidadProductos;
      iconoCarrito.style.display = 'flex';
    } else {
      iconoCarrito.style.display = 'none';
    }
  },

  vaciar: () => {
    localStorage.removeItem(carrito.CLAVE_STORAGE);
    carrito.actualizarIcono();
    console.log('Carrito vaciado exitosamente.');
  },
};

document.addEventListener('DOMContentLoaded', carrito.actualizarIcono);
