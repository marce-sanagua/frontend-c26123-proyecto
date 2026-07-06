export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};
export const mostrarTotal = (carrito) => {
  const resumen = document.getElementById("resumen-carrito");
  if (!resumen) return;

  const total = carrito.reduce((acumulado, producto) => acumulado + producto.precio, 0);

  resumen.innerHTML = `<p class="total-carrito">Total: $${total}</p>`;
};

export const mostrarMensaje = (texto) => {
  alert(texto);
};