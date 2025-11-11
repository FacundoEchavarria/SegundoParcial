const utils = {
  obtenerElementosRandom: (arreglo, n) => {
    const shuffled = arreglo.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  },
};
