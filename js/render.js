const render = {
  mostarError: (error, contenedor) => {
    contenedor.innerHTML = `<div class="col-12 text-center text-danger">Error: ${error.message}</div>`;
  },

  crearProductosDestacados: (productos, productsContainer) => {
    productsContainer.innerHTML = '';
    const productosRandom = utils.obtenerElementosRandom(productos, 3);

    productosRandom.forEach((p) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col';
      colDiv.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4">
      <div class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 200px; overflow: hidden;">
      <img src="${p.image}" class="img-fluid" alt="${
        p.title
      }" style="max-height: 100%; max-width: 100%; object-fit: contain;">
        </div>
        <div class="card-body">
        <h5 class="card-title fw-bold text-truncate">${p.title}</h5>
          <p class="card-text text-muted">${p.category}</p>
          <p class="fs-4 fw-bolder text-dark">$${p.price.toFixed(2)}</p>
          </div>
          <div class="card-footer bg-white border-0 pt-0 pb-3 d-grid">
          <button class="btn btn-dark rounded-pill" data-product-id="${p.id}">
            Agregar al carrito
            </button>
            </div>
            </div>
            `;
      productsContainer.appendChild(colDiv);
    });
  },

  crearTarjetaProducto: (productos, contenedorProductos) => {
    contenedorProductos.innerHTML = '';
    if (productos.length === 0) {
      contenedorProductos.innerHTML =
        '<div class="col-12 text-center text-danger">No se encontraron productos en el catálogo.</div>';
      return;
    }
    productos.forEach((producto) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col';
      colDiv.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4">
      <div class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 250px; overflow: hidden;">
      <img src="${producto.image}" class="img-fluid" alt="${
        producto.title
      }" style="max-height: 100%; max-width: 100%; object-fit: contain;">
      </div>
      <div class="card-body">
      <h5 class="card-title fw-bold text-truncate">${producto.title}</h5>
      <p class="card-text text-muted">${producto.category}</p>
      <p class="card-text">${producto.description.substring(0, 80)}...</p>
      <p class="fs-4 fw-bolder text-dark">$${producto.price.toFixed(2)}</p>
      </div>
      <div class="card-footer bg-white border-0 pt-0 pb-3 d-grid">
      <button class="btn btn-dark rounded-pill btn-agregar" data-product-id="${
        producto.id
      }">
      Agregar al carrito
      </button>
      </div>
      </div>
      `;

      contenedorProductos.appendChild(colDiv);
    });
  },
};
