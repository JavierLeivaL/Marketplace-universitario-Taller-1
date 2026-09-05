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

const productos = [
    {
        id: 1,
        nombre: "Libro: Cálculo de Stewart 8va Edición",
        precio: 25000,
        descripcion: "Libro en excelente estado, ideal para primer año de ingeniería. Sin rayones.",
        imagen: "https://via.placeholder.com/300x200?text=Libro+Calculo",
        categoria: "Libros",
        vendedor: "Juan Pérez (Ingeniería Civil)"
    },
    {
        id: 2,
        nombre: "Calculadora Científica Casio FX-991",
        precio: 15000,
        descripcion: "Casi nueva, la vendo porque me regalaron otra. Incluye tapa protectora.",
        imagen: "https://via.placeholder.com/300x200?text=Calculadora+Casio",
        categoria: "Accesorios",
        vendedor: "María González (Arquitectura)"
    },
    {
        id: 3,
        nombre: "Notebook Dell Inspiron 15",
        precio: 350000,
        descripcion: "Intel Core i5, 8GB RAM, 256GB SSD. Batería dura 4 horas. Detalles de uso.",
        imagen: "https://via.placeholder.com/300x200?text=Notebook+Dell",
        categoria: "Computadores",
        vendedor: "Carlos Ruiz (Informática)"
    },
    {
        id: 4,
        nombre: "Raqueta de Tenis Wilson",
        precio: 40000,
        descripcion: "Perfecta para los electivos de deportes. Cuerdas recién cambiadas.",
        imagen: "https://via.placeholder.com/300x200?text=Raqueta+Tenis",
        categoria: "Deportes",
        vendedor: "Ana Silva (Enfermería)"
    }
];

function renderizarCatalogo() {
    const contenedor = document.getElementById('publicaciones'); 
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjetaHtml = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-primary fw-bold">$${producto.precio.toLocaleString('es-CL')}</h6>
                        <p class="card-text flex-grow-1" style="font-size: 0.9rem;">${producto.descripcion}</p>
                        <hr>
                        <p class="text-muted small mb-3">
                            <strong>Vendedor:</strong> ${producto.vendedor}
                        </p>
                        <button class="btn btn-outline-primary mt-auto w-100">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHtml;
    });
}
// FORMULARIO DE PUBLICACIÓN DE PRODUCTOS
document.addEventListener('DOMContentLoaded', renderizarCatalogo);

const selectCategoria = document.getElementById('selectCategoria');

categorias.forEach(function(categoria) {
    const option = document.createElement('option');
    option.value = categoria.nombre;
    option.textContent = categoria.nombre;
    selectCategoria.appendChild(option);
});

const formulario = document.getElementById('formulario-producto');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById('inputNombre').value;
    const precio = document.getElementById('inputPrecio').value;
    const categoria = document.getElementById('selectCategoria').value;
    const descripcion = document.getElementById('inputDescripcion').value;
    const imagen = document.getElementById('inputImagen').value;
    const vendedor = document.getElementById('inputVendedor').value;

    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: parseInt(precio),
        descripcion: descripcion,
        imagen: imagen,
        categoria: categoria,
        vendedor: vendedor
    };

    productos.push(nuevoProducto);

    renderizarCatalogo();

    formulario.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPublicar'));
    modal.hide();

    alert("¡Producto publicado con éxito!");
});
//FORMULARIO DE PUBLICACIÓN DE PRODUCTOS

//CARRITO DE COMPRAS
let carrito = [];

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(producto => producto.id === idProducto);
    
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        renderizarCarrito();
        alert(`¡"${productoEncontrado.nombre}" agregado al carrito!`);
    }
}

function renderizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const contador = document.getElementById('contador-carrito');
    const textoTotal = document.getElementById('total-carrito');

    contenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-muted text-center mt-4">Tu carrito está vacío. ¡Agrega algunos productos!</p>';
        contador.style.display = 'none';
    } else {
        contador.style.display = 'block';
        contador.textContent = carrito.length;

        carrito.forEach((producto, indice) => {
            total += producto.precio;
            contenedor.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <div style="width: 70%;">
                        <h6 class="mb-0 text-truncate" style="font-size: 0.9rem;">${producto.nombre}</h6>
                        <small class="text-primary fw-bold">$${producto.precio.toLocaleString('es-CL')}</small>
                    </div>
                    <!-- Botón para eliminar del carrito -->
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${indice})">
                        X
                    </button>
                </div>
            `;
        });
    }
    textoTotal.textContent = '$' + total.toLocaleString('es-CL');
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    renderizarCarrito();
}
document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo();
    renderizarCarrito();
});
//CARRITO DE COMPRAS