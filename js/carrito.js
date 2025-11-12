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

  eliminar: (productoId) => {
    const idNumerico = parseInt(productoId);
    const items = carrito.obtener();

    const itemsFiltrado = items.filter((item) => item.id !== idNumerico);

    if (items.length === itemsFiltrado.length) {
      console.error(`Error al eliminar: ID ${idNumerico} no encontrado.`);
      render.mostrarToast('Hubo un error al eliminar.', 'error');
      return;
    }

    carrito.guardar(itemsFiltrado);
    console.log(`Producto ${idNumerico} eliminado.`);
  },

  actualizarIcono: () => {
    const iconoCarrito = document.getElementById('icono-carrito-contador');

    const productosCarrito = carrito.obtener();
    const cantidadProductos = productosCarrito.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );

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

  incrementarCantidad: (id) => {
    const items = carrito.obtener();
    const itemExistente = items.find((item) => item.id === id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      render.mostrarToast('Hubo un error.', 'error');
      return;
    }
    carrito.guardar(items);
  },

  decrementarCantidad: (id) => {
    const items = carrito.obtener();
    const itemExistente = items.find((item) => item.id === id);

    if (itemExistente) {
      if (itemExistente.cantidad > 1) {
        itemExistente.cantidad--;
      } else {
        carrito.eliminar(id);
        return;
      }
    } else {
      render.mostrarToast('Hubo un error.', 'error');
      return;
    }
    carrito.guardar(items);
  },

  llenarModalCarrito: () => {
    const productos = carrito.obtener();
    const modalBody = document.getElementById('cuerpo-modal-carrito');
    modalBody.innerHTML = '';

    if (productos.length === 0) {
      modalBody.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
      return;
    }

    let total = 0;
    const lista = document.createElement('ul');
    lista.classList.add('list-group');

    productos.forEach((producto) => {
      const subtotal = producto.price * producto.cantidad;
      total += subtotal;

      const item = document.createElement('li');
      item.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'
      );

      item.innerHTML = `
            <div>
                <h6 class="my-0">${producto.title}</h6>
                <small class="text-muted d-flex align-items-center">
									<span class="me-2">Cantidad: </span>
									<button class="btn btn-outline-secondary rounded-circle btn-cantidad btn-restar" 
									type="button" 
									data-id="${producto.id}">
										-
									</button>
									<span class="mx-2" id="cantidad-item-${producto.id}">${producto.cantidad}</span>
									<button class="btn btn-outline-secondary rounded-circle btn-cantidad btn-sumar" 
          				type="button" 
          				data-id="${producto.id}">
										+
									</button>
								</small>
            </div>
            <span class="text-muted">$${subtotal.toFixed(2)}</span>
        `;
      lista.appendChild(item);
    });

    modalBody.appendChild(lista);

    const footerContainer = document.createElement('div');
    footerContainer.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'mt-4'
    );

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('d-flex', 'gap-2');

    const vaciarBtn = document.createElement('button');
    vaciarBtn.classList.add('btn', 'btn-outline-danger');
    vaciarBtn.id = 'boton-vaciar-carrito';
    vaciarBtn.textContent = 'Vaciar Carrito';

    const finalizarBtn = document.createElement('button');
    finalizarBtn.classList.add('btn', 'btn-success');
    finalizarBtn.textContent = 'Finalizar Compra';

    buttonGroup.appendChild(vaciarBtn);
    buttonGroup.appendChild(finalizarBtn);

    const totalElement = document.createElement('h5');
    totalElement.classList.add('mb-0');
    totalElement.innerHTML = `Total: <span class="text-success">$${total.toFixed(
      2
    )}</span>`;

    footerContainer.appendChild(buttonGroup);
    footerContainer.appendChild(totalElement);

    modalBody.appendChild(footerContainer);

    vaciarBtn.addEventListener('click', () => {
      carrito.vaciar();
      carrito.actualizarIcono();
      carrito.llenarModalCarrito();
    });

    finalizarBtn.addEventListener('click', () => {
      const totalGastado = total.toFixed(2);

      render.mostrarToast(
        `¡Compra finalizada! Total gastado: $${totalGastado}`,
        'succes'
      );
      carrito.vaciar();
      carrito.actualizarIcono();
      carrito.llenarModalCarrito();
    });

    const botonesSumar = modalBody.querySelectorAll('.btn-sumar');

    botonesSumar.forEach((btn) => {
      btn.addEventListener('click', (evento) => {
        const id = parseInt(evento.currentTarget.dataset.id);
        carrito.incrementarCantidad(id);
        carrito.llenarModalCarrito();
      });
    });
    const botonesRestar = modalBody.querySelectorAll('.btn-restar');

    botonesRestar.forEach((btn) => {
      btn.addEventListener('click', (evento) => {
        const id = parseInt(evento.currentTarget.dataset.id);
        carrito.decrementarCantidad(id);
        carrito.llenarModalCarrito();
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', carrito.actualizarIcono);

const modalElemento = document.getElementById('staticBackdrop');
modalElemento.addEventListener('show.bs.modal', function (event) {
  carrito.llenarModalCarrito();
});
