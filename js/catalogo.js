document.addEventListener("DOMContentLoaded", () => {
	const API_URL = "https://fakestoreapi.com/products";
	const contenedorProductos = document.getElementById("contenedor-productos");

	// ==========================================================
	// 1. FUNCIONES DE GESTIÓN DE LOCALSTORAGE
	// ==========================================================

	const obtenerCarrito = () => {
		const carritoJSON = localStorage.getItem("carrito");
		return carritoJSON ? JSON.parse(carritoJSON) : [];
	};

	const guardarCarrito = (carrito) => {
		localStorage.setItem("carrito", JSON.stringify(carrito));
	};

	const agregarAlCarrito = (productoId) => {
		const carrito = obtenerCarrito();
		const itemExistente = carrito.find((item) => item.id === productoId);
		if (itemExistente) {
			itemExistente.cantidad++;
		} else {
			carrito.push({
				id: productoId,
				cantidad: 1,
			});
		}
		guardarCarrito(carrito);
	};

	// ==========================================================
	// 2. FUNCIÓN DE CARGA Y RENDERIZADO (sin cambios significativos)
	// ==========================================================

	const cargarProductos = async () => {
		try {
			const respuesta = await fetch(API_URL);
			if (!respuesta.ok) {
				throw new Error("Error al cargar los datos de la API.");
			}
			const todosLosProductos = await respuesta.json();
			contenedorProductos.innerHTML = "";
			if (todosLosProductos.length === 0) {
				contenedorProductos.innerHTML =
					'<div class="col-12 text-center text-danger">No se encontraron productos en el catálogo.</div>';
				return;
			}
			todosLosProductos.forEach((producto) => {
				const tarjetaProducto = crearTarjetaProducto(producto);
				contenedorProductos.appendChild(tarjetaProducto);
			});
			agregarListenersBoton();
		} catch (error) {
			console.error("Error al obtener los productos:", error);
			contenedorProductos.innerHTML = `<div class="col-12 text-center text-danger">Error al cargar el catálogo: ${error.message}</div>`;
		}
	};

	const crearTarjetaProducto = (producto) => {
		const colDiv = document.createElement("div");
		colDiv.className = "col";
		colDiv.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4">
                <div class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 250px; overflow: hidden;">
                    <img src="${producto.image}" class="img-fluid" alt="${
			producto.title
		}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold text-truncate">${
						producto.title
					}</h5>
                    <p class="card-text text-muted">${producto.category}</p>
                    <p class="card-text">${producto.description.substring(
						0,
						80
					)}...</p>
                    <p class="fs-4 fw-bolder text-dark">$${producto.price.toFixed(
						2
					)}</p>
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
		return colDiv;
	};

	// ==========================================================
	// 3. FUNCIÓN DE INICIALIZACIÓN DE LISTENERS
	// ==========================================================

	const agregarListenersBoton = () => {
		const botonesAgregar = document.querySelectorAll(".btn-agregar");
		botonesAgregar.forEach((boton) => {
			boton.addEventListener("click", (evento) => {
				// Obtiene el ID del producto del atributo data-product-id
				const productoId = parseInt(
					evento.currentTarget.dataset.productId
				);
				if (!isNaN(productoId)) {
					agregarAlCarrito(productoId);
				} else {
					console.error("ID de producto no válido.");
				}
			});
		});
	};

	// Iniciar la carga de productos al cargar la página
	cargarProductos();
});
