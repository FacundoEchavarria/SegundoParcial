// FUNCION AL CARGAR ELEMENTOS DE PAGINA DETALLE
document.addEventListener("DOMContentLoaded", () => {
	// BUSCA EL ID DE LOS PARAMETROS DE LA URL
	const parametrosURL = new URLSearchParams(window.location.search);
	const productoId = parametrosURL.get("id");
	const contenedorDetalle = document.getElementById("contenedor-detalle");

	if (!productoId || !contenedorDetalle) {
		contenedorDetalle.innerHTML =
			'<h2 class="text-danger">Error: Producto no encontrado.</h2>';
		return;
	}

	// FUNCION QUE SE EJECUTAL AL CARGAR COMPONENTES
	const iniciarDetalle = async () => {
		try {
			console.log("Obteniendo producto...");
			// PETICION A LA API
			productoEncontrado = await api.obtenerProductoId(productoId);
			console.log("Producto obtenido correctamente.");

			// RENDERIZACION DE LA PAGINA
			render.crearDetalleProducto(productoEncontrado, contenedorDetalle);
			const botonAgregar = document.getElementById("btn-agregar-detalle");

			//AGREGAR EVENTO AL BOTON DEL CARRITO
			botonAgregar.addEventListener("click", () => {
				carrito.agregar(productoEncontrado);
				render.mostrarToast("Producto agregado al carrito", "succes");
			});
		} catch (error) {
			// MANEJO DE ERRORES
			console.log(`Error al buscar producto: ${error.message}`);
			render.mostarError(error, contenedorDetalle);
		}
	};

	iniciarDetalle();
});
