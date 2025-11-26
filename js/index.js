import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
    .then(res => {
        if(!res.ok){
            throw new Error("Error HTTP status: ${res.status}");
       }
       return res.json()
    })
    .then(data => {
        //Hacer todo el rendering de tarjetas con el for
        data.forEach(producto => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("card");

            const img = document.createElement("img");
            img.alt = producto.nombre;
            img.src= `./${producto.img}`;

            const titulo = document.createElement("h3");
            titulo.textContent = producto.nombre;

            const distancia = document.createElement("p");
            distancia.textContent = producto.distancia;

            const fecha = document.createElement("p");
            fecha.textContent = producto.fecha;

            const boton = document.createElement("button");
            boton.classList.add("btn");
            boton.textContent = "Comprar";

            boton.addEventListener("click", () =>{
                agregarAlCarrito(producto);
            })

            tarjeta.appendChild(img);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(distancia);
            tarjeta.appendChild(fecha);
            tarjeta.appendChild(boton);

            contenedor.appendChild(tarjeta);
        });
    })
    .catch((err) => console.log(err));
});
   