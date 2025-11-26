import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () =>{ 
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if (!carrito.length){ 
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = ("Tu carrito esta vacio");

        contenedor.appendChild(mensaje);
        return
     } 

     carrito.forEach((producto, id) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
            img.alt = producto.nombre;
            img.src= `../${producto.img}`;

        const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

        const distancia = document.createElement("p");
            distancia.textContent = producto.distancia;

        const fecha = document.createElement("p");
            fecha.textContent = producto.fecha;

        const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn");
            btnEliminar.classList.add("btn-eliminar-carrito");
            btnEliminar.textContent = "Eliminar Carrera";

            btnEliminar.addEventListener("click", () =>{ 
                eliminarProducto(id);
                renderizarCarrito();
                });

            tarjeta.appendChild(img);
            tarjeta.appendChild(nombre);
            tarjeta.appendChild(distancia);
            tarjeta.appendChild(fecha);
            tarjeta.appendChild(btnEliminar);

            contenedor.appendChild(tarjeta);    
     });

    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn");
    btnVaciar.classList.add("btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar Carrito";

    btnVaciar.addEventListener("click", () =>{ 
        vaciarCarrito();
        renderizarCarrito();
    });

    divAcciones.appendChild(btnVaciar);
 };

document.addEventListener("DOMContentLoaded", () =>{ 
    renderizarCarrito();
 });