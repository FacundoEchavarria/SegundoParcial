const render = {
	mostarError: (error, contenedor) => {
		contenedor.innerHTML = `<div class="col-12 text-center text-danger">Error: ${error.message}</div>`;
	},

	crearProductosDestacados: (productos, productsContainer) => {
		productsContainer.innerHTML = "";
		const productosRandom = utils.obtenerElementosRandom(productos, 3);

		productosRandom.forEach((p) => {
			const colDiv = document.createElement("div");
			colDiv.className = "col";
			colDiv.innerHTML = `
    <div class="card h-100 border-0 shadow-sm rounded-4 card-hover-lift"> <a href="html/detalle.html?id=${
		p.id
	}" class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 200px; overflow: hidden;">
      <img src="${p.image}" class="img-fluid" alt="${
				p.title
			}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
        </a>
        <a href="html/detalle.html?id=${
			p.id
		}" class="card-body text-decoration-none">
        <h5 class="card-title fw-bold text-truncate">${p.title}</h5>
          <p class="card-text text-muted">${p.category}</p>
          <p class="fs-4 fw-bolder text-dark">$${p.price.toFixed(2)}</p>
          </a>
          <div class="card-footer bg-white border-0 pt-0 pb-3 d-grid">
          <button class="btn btn-dark rounded-pill btn-agregar" data-product-id="${
				p.id
			}">
            Agregar al carrito
            </button>
            </div>
            </div>
            `;
			productsContainer.appendChild(colDiv);
		});
	},

	crearTarjetaProducto: (productos, contenedorProductos) => {
		contenedorProductos.innerHTML = "";
		if (productos.length === 0) {
			contenedorProductos.innerHTML =
				'<div class="col-12 text-center text-danger">No se encontraron productos en el catálogo.</div>';
			return;
		}
		productos.forEach((producto) => {
			const colDiv = document.createElement("div");
			colDiv.className = "col";
			colDiv.innerHTML = `
    <div class="card h-100 border-0 shadow-sm rounded-4 card-hover-lift"> <a href="detalle.html?id=${
		producto.id
	}" class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 250px; overflow: hidden;">
      <img src="${producto.image}" class="img-fluid" alt="${
				producto.title
			}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
      </a>
      <a href="detalle.html?id=${
			producto.id
		}" class="card-body text-decoration-none">
      <h5 class="card-title fw-bold text-truncate">${producto.title}</h5>
      <p class="card-text text-muted">${producto.category}</p>
      <p class="card-text">${producto.description.substring(0, 80)}...</p>
      <p class="fs-4 fw-bolder text-dark">$${producto.price.toFixed(2)}</p>
      </a>
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

	crearDetalleProducto: (producto, contenedor) => {
		contenedor.innerHTML = "";

		const row = document.createElement("div");
		row.className = "row g-4 g-lg-5";

		row.innerHTML = `
      <div class="col-md-6">
        <div class="bg-light rounded-4 p-4 d-flex align-items-center justify-content-center" style="min-height: 450px;">
          <img src="${producto.image}" 
            class="img-fluid" 
            alt="${producto.title}" 
            style="max-height: 400px; object-fit: contain;">
        </div>
      </div>

      <div class="col-md-6 d-flex flex-column justify-content-center">
        <p class="text-muted mb-2 text-uppercase">${producto.category}</p>
        
        <h2 class="fw-bold display-6 mb-3">${producto.title}</h2>
        
        <p class="fs-2 fw-bolder text-dark mb-3">$${producto.price.toFixed(
			2
		)}</p>

        <p class="lead text-secondary mb-4">${producto.description}</p>

        <hr class="my-4">

        <div class="d-grid">
          <button id="btn-agregar-detalle" class="btn btn-dark btn-lg rounded-pill" type="button">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

		contenedor.appendChild(row);
	},
};
