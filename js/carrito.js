import { obtenerCarrito } from "./storage.js";
import { eliminarProductoPorId, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador, mostrarTotal } from "./ui.js";

const agruparProductos = (carrito) => {
  const agrupado = {};

  carrito.forEach((producto) => {
    if (agrupado[producto.id]) {
      agrupado[producto.id].cantidad += 1;
    } else {
      agrupado[producto.id] = { ...producto, cantidad: 1 };
    }
  });

  return Object.values(agrupado);
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito esta vacio 😕";

    contenedor.appendChild(mensaje);
    mostrarTotal(carrito);
    return;
  }

  const productosAgrupados = agruparProductos(carrito);

  productosAgrupados.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const cantidad = document.createElement("p");
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarProductoPorId(producto.id);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(cantidad);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
  mostrarTotal(carrito);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});