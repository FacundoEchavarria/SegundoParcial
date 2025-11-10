document.addEventListener("DOMContentLoaded", () => {
	// URL de la API de ejemplo. Puedes cambiarla por la que uses.
	// Usaremos una API pública que devuelve 20 productos.
	const API_URL = "https://fakestoreapi.com/products";
	const productsContainer = document.getElementById("productos-container");

	// Función para obtener productos de la API
	const fetchAndRenderProducts = async () => {
		try {
			productsContainer.innerHTML =
				'<div class="col-12 text-center text-muted">Cargando productos destacados...</div>';

			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error("Error al cargar los datos de la API.");
			}
			const allProducts = await response.json();

			const randomProducts = getRandomSubset(allProducts, 3);

			productsContainer.innerHTML = "";

			randomProducts.forEach((product) => {
				const productCard = createProductCard(product);
				productsContainer.appendChild(productCard);
			});
		} catch (error) {
			console.error("Error al obtener los productos:", error);
			productsContainer.innerHTML = `<div class="col-12 text-center text-danger">Error: ${error.message}</div>`;
		}
	};

	const getRandomSubset = (array, n) => {
		const shuffled = array.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, n);
	};

	const createProductCard = (product) => {
		const colDiv = document.createElement("div");
		colDiv.className = "col";
		colDiv.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4">
                <div class="p-3 bg-light rounded-top-4 d-flex align-items-center justify-content-center" style="height: 200px; overflow: hidden;">
                    <img src="${product.image}" class="img-fluid" alt="${
			product.title
		}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold text-truncate">${
						product.title
					}</h5>
                    <p class="card-text text-muted">${product.category}</p>
                    <p class="fs-4 fw-bolder text-dark">$${product.price.toFixed(
						2
					)}</p>
                </div>
                <div class="card-footer bg-white border-0 pt-0 pb-3 d-grid">
                    <button class="btn btn-dark rounded-pill" data-product-id="${
						product.id
					}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
		return colDiv;
	};

	fetchAndRenderProducts();
});
