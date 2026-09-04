const categorias = [
    { id: "snacks", nombre: "Snacks y Colaciones" },
    { id: "deportes", nombre: "Deportes y Vida Sana" },
    { id: "cuidado-personal", nombre: "Cuidado Personal y Belleza" },
    { id: "ropa", nombre: "Ropa y Moda" },
    { id: "tecnologia", nombre: "Tecnología y Accesorios" },
    { id: "utiles", nombre: "Útiles" },
    { id: "libros", nombre: "Apuntes y Libros Físicos" },
    { id: "hogar", nombre: "Artículos para el Hogar/Pieza" },
    { id: "arriendos", nombre: "Arriendos y Roommates" }
];

const contenedorCategorias = document.getElementById("nombre-categorias");
categorias.forEach(function (categoria) {
    const boton = document.createElement("button");
    boton.textContent = categoria.nombre;
    boton.className = "btn btn-light w-100 mb-2";
    contenedorCategorias.appendChild(boton);
});
