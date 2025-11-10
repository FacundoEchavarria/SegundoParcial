const ui = {
  mostarProductos: (productos) => {
    const contenedorProductos = document.getElementById('test');

    productos.forEach((p) => {
      contenedorProductos.innerHTML += `
        <h3>${p.title}</h3>
        <h3>${p.price}</h3>
        <img
          src=${p.image}
          alt=${p.title}
        />
        `;
    });
  },
};
