# Marketplace UNAB

Marketplace web orientado a la comunidad universitaria, donde los estudiantes pueden publicar, buscar y comprar productos.
## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap

## Funcionalidades

- **Catálogo de productos**: muestra imagen, nombre, precio, descripción y vendedor de cada publicación.
- **Categorías**: listado de categorías generado dinámicamente, con filtro por categoría y opción de limpiar el filtro.
- **Buscador**: filtra productos por nombre o descripción en tiempo real.
- **Filtro de precios**: permite filtrar por precio mínimo, máximo o ambos.
- **Vista detallada**: modal con la información completa de un producto.
- **Favoritos**: agregar/quitar productos de una lista de favoritos, accesible desde el navbar.
- **Carrito de compra**: agregar productos (sin duplicados), ver el detalle y el total, y eliminar productos del carrito.
- **Publicar producto**: formulario en modal para agregar nuevas publicaciones al catálogo.
- **Eliminar publicaciones**: permite borrar productos del catálogo.

## Estructura del proyecto

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── img/
```

## Cómo ejecutar

Abrir `index.html` en un navegador. No requiere instalación ni backend: todos los datos (productos, carrito, favoritos) se manejan en memoria con JavaScript.

## Alcance

No se implementan pagos, autenticación de usuarios ni comunicación entre usuarios — todas las operaciones son simuladas en el frontend.
