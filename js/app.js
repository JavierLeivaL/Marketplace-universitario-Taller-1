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

function renderizarCatalogo(listaProductos = productos) {
    const contenedor = document.getElementById('publicaciones');
    contenedor.innerHTML = '';

    if (listaProductos.length === 0) {
        contenedor.innerHTML = '<div class="col-12"><h5 class="text-center text-muted mt-5">No se encontraron productos 😢</h5></div>';
        return; 
    }

    listaProductos.forEach(producto => {
        const esFavorito = favoritos.some(fav => fav.id === producto.id);
        const iconoCorazon = esFavorito ? '❤️' : '🤍';
        const tarjetaHtml = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm position-relative">
                    
                    <!-- NUEVO: Botón de Favorito (Izquierda) -->
                    <button class="btn btn-light btn-sm position-absolute top-0 start-0 m-2 rounded-circle shadow-sm" 
                            style="z-index: 10; width: 30px; height: 30px; padding: 0; line-height: 1;"
                            onclick="toggleFavorito(${producto.id})"
                            title="Agregar a favoritos">
                        ${iconoCorazon}
                    </button>
                    <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle" 
                            style="z-index: 10; width: 30px; height: 30px; padding: 0;"
                            onclick="eliminarProducto(${producto.id})"
                            title="Eliminar publicación">
                        X
                    </button>
                    <img src="${producto.imagen}" 
                         class="card-img-top p-2" 
                         alt="${producto.nombre}" 
                         style="width: 100%; height: 200px; object-fit: contain; background-color: #ffffff;"
                         onerror="this.onerror=null; this.src='https://dummyimage.com/300x200/dee2e6/6c757d.jpg&text=Sin+Imagen';">
                    
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-primary fw-bold">$${producto.precio.toLocaleString('es-CL')}</h6>
                        <p class="card-text flex-grow-1" style="font-size: 0.9rem;">${producto.descripcion}</p>
                        <hr>
                        <p class="text-muted small mb-3">
                            <strong>Vendedor:</strong> ${producto.vendedor}
                        </p>
                        <button class="btn btn-outline-primary mt-auto w-100 mb-2" onclick="verDetalles(${producto.id})">
                            Ver Detalles
                        </button>
                        <button class="btn btn-success w-100" onclick="agregarAlCarrito(${producto.id})">
                            Añadir al Carrito
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

//BUSCADOR DE PRODUCTOS
const inputBuscador = document.getElementById('inputBuscador');
inputBuscador.addEventListener('input', function() {
    const textoBuscado = inputBuscador.value.toLowerCase();

    const productosFiltrados = productos.filter(function(producto) {
        const nombreProducto = producto.nombre.toLowerCase();
        const descripcionProducto = producto.descripcion.toLowerCase();
        
        return nombreProducto.includes(textoBuscado) || descripcionProducto.includes(textoBuscado);
    });

    renderizarCatalogo(productosFiltrados);
});
//BUSCADOR DE PRODUCTOS

//VER DETALLES DE PRODUCTO
function verDetalles(id) {
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        document.getElementById('detalleNombre').textContent = producto.nombre;
        document.getElementById('detalleImagen').src = producto.imagen;
        document.getElementById('detallePrecio').textContent = '$' + producto.precio.toLocaleString('es-CL');
        document.getElementById('detalleCategoria').textContent = producto.categoria;
        document.getElementById('detalleDescripcion').textContent = producto.descripcion;
        document.getElementById('detalleVendedor').textContent = producto.vendedor;
        
        const modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
        modal.show();
    }
}
//VER DETALLES DE PRODUCTO

//ELIMINAR PRODUCTOS
function eliminarProducto(idBuscado) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta publicación?");
    
    if (confirmacion) {
        const indice = productos.findIndex(producto => producto.id === idBuscado);
        
        if (indice !== -1) {
            productos.splice(indice, 1);
            
            renderizarCatalogo();
        }
    }
};
//ELIMINAR PRODUCTOS

// FAVORITOS
let favoritos = [];

function toggleFavorito(idProducto) {
    const productoEncontrado = productos.find(p => p.id === idProducto);
    
    if (productoEncontrado) {
        const indice = favoritos.findIndex(fav => fav.id === idProducto);
        
        if (indice === -1) {
            favoritos.push(productoEncontrado);
        } else {
            favoritos.splice(indice, 1);
        }
        
        renderizarCatalogo();
        actualizarContadorFavoritos();
    }
}

function actualizarContadorFavoritos() {
    const contador = document.getElementById('contador-favoritos');
    
    if (contador) {
        if (favoritos.length === 0) {
            contador.style.display = 'none';
        } else {
            contador.style.display = 'block';
            contador.textContent = favoritos.length;
        }
    }
}

function toggleFavorito(idProducto) {
    const productoEncontrado = productos.find(p => p.id === idProducto);
    
    if (productoEncontrado) {
        const indice = favoritos.findIndex(fav => fav.id === idProducto);
        
        if (indice === -1) {
            favoritos.push(productoEncontrado);
        } else {
            favoritos.splice(indice, 1);
        }
        renderizarCatalogo();
        actualizarContadorFavoritos();
        renderizarListaFavoritos();
    }
}

function renderizarListaFavoritos() {
    const contenedor = document.getElementById('items-favoritos');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    if (favoritos.length === 0) {
        contenedor.innerHTML = '<p class="text-muted text-center mt-4">Aún no tienes productos favoritos. ¡Busca el corazón en las publicaciones!</p>';
    } else {
        favoritos.forEach(producto => {
            contenedor.innerHTML += `
                <div class="card mb-3 shadow-sm border-0 bg-light">
                    <div class="row g-0 align-items-center">
                        <div class="col-4 p-2">
                            <img src="${producto.imagen}" class="img-fluid rounded" style="object-fit: contain; height: 80px; width: 100%; background-color: #fff;" alt="${producto.nombre}">
                        </div>
                        <div class="col-8">
                            <div class="card-body py-2 px-1 position-relative">
                                <!-- Botón para quitar de favoritos desde el mismo panel -->
                                <button class="btn btn-sm btn-link position-absolute top-0 end-0 text-danger text-decoration-none" 
                                        onclick="toggleFavorito(${producto.id})" style="padding: 0 5px; font-size: 1.2rem;">
                                    ❤️
                                </button>
                                
                                <h6 class="card-title text-truncate mb-1" style="font-size: 0.9rem; padding-right: 25px;" title="${producto.nombre}">${producto.nombre}</h6>
                                <p class="card-text text-primary fw-bold mb-2" style="font-size: 0.85rem;">$${producto.precio.toLocaleString('es-CL')}</p>
                                
                                <button class="btn btn-outline-success btn-sm w-100 py-0" style="font-size: 0.8rem;" onclick="agregarAlCarrito(${producto.id})">
                                    Al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}