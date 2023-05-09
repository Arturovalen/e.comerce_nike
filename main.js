const openCart = document.getElementById('openCart');
const ventana = document.getElementById('cart__container');
const closeCart = document.getElementById('closeCart');

openCart.addEventListener('click', () => {
  cart__container.classList.add('show')
});
closeCart.addEventListener('click', () => {
  cart__container.classList.remove('show')
});
/* DATABASE */
const productos = [
  {
    id: 1,
    nombre: 'Zapatos Nike sport01',
    precio: 34,
    imagen: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png",
    stock: 10
  },
  {
    id: 2,
    nombre: 'Zapatos Nike sport02',
    precio: 27,
    imagen: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5800.png",
    stock: 15
  },
  {
    id: 3,
    nombre: 'Zapatos Nike casual',
    precio: 50,
    imagen: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png",
    stock: 8
  }
]

const productosContenedor = document.querySelector('.products__container')
/* Productos */
function pintarProductos() {
  let html = ''
  for (let { id, nombre, imagen, precio, stock } of productos) {
    html += `
    <div class="products__container">
      <div class="products__container__card">
          <div class="container__card-img">
            <img src="${imagen}" alt="${nombre}">
            <h2>${nombre}</h2>
          </div>    
          <div class="container__content">
            <div class="content__price">
                <h3>Precio : $${precio}</h3>
            </div>
            <div class="content__price">
                <h3>Unidades : ${stock}</h3>
            </div>
            <a href="#" class="agregar" data-id="${id}">Comprar</a>
        </div> 
      </div>
    </div>
        `
  }
  productosContenedor.innerHTML = html
}

pintarProductos()

/* Carrito */
let carrito = []

const articulosContenedor = document.querySelector('.cart__container .cart__list')
const contadorDeArticulos = document.getElementById('cart-count')
const totalPrecio = document.getElementById('cart-total')
const botonComprar = document.querySelector('.btn--checkout')

function pintarCarrito() {
  let html = ''

  for (const {id, cantidad } of carrito) {
    const {nombre, imagen} = productos.find(x => x.id === id)
    
    html += `
    
    <li class="cart__item">
          <article class="cart__article">
            <img class="cart__image" src="${imagen}" alt="${nombre}">

            <div class="cart__data">
              <h2 class="cart__name">${nombre}</h2>

              <div class="cart__minmax">
                <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}"><i class='bx bx-minus' ></i></button>
                <span id="cart-qty">${cantidad}</span>
                <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}"><i class='bx bx-plus' ></i></button>
              </div>
                
            </div>
              <div class="cart__delete">
                    <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"><i class='bx bx-trash' ></i></button>
              </div>
          </article>
    </li>
    `
  }

  articulosContenedor.innerHTML = html
  contadorDeArticulos.innerHTML = contarArticulos()
  totalPrecio.innerHTML = total()
}

function agregarAlCarrito(id) {
  const cantidad = 1

  const productoEncontrado = productos.find(x => x.id === id)

  if (productoEncontrado && productoEncontrado.stock > 0) {
    const articuloEncontrado = carrito.find(x => x.id === id)

    if (articuloEncontrado) {
      if (verificarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('supera las unidades disponibles')
      }
    } else {
      carrito.push({ id, cantidad })
    }
  } else {
    window.alert('Lo sentimos no tenemos unidades disponibles')
  }
  pintarCarrito()
}

function verificarUnidades(id, cantidad) {
  const productoEncontrado = productos.find(x => x.id === id)

  return productoEncontrado.stock - cantidad >= 0
}

function eliminarArticulo(id) {
  carrito = carrito.filter(x => x.id !== id)
  pintarCarrito()
}

function removerDelCarrito(id) {
  const cantidad = 1

  const articuloEncontrado = carrito.find(x => x.id === id)

  if (articuloEncontrado.cantidad - cantidad > 0) {
    articuloEncontrado.cantidad -= cantidad
  } else {
    carrito = carrito.filter(x => x.id !== id)
  }
  pintarCarrito()
}

function contarArticulos() {
  let suma = 0
  for (const articulo of carrito) {
    suma += articulo.cantidad
  }
  return suma
}

function total() {
  let suma = 0

  for (let articulo of carrito) {
    const productoEncontrado = productos.find(x => x.id === articulo.id)

    suma += articulo.cantidad * productoEncontrado.precio
  }

  return suma
}

function comprar() {
  for (let articulo of carrito) {
    const productoEncontrado = productos.find(x => x.id === articulo.id)

    productoEncontrado.stock -= articulo.cantidad
  }

  window.alert('Gracias por su compra')
  carrito = []
  pintarCarrito()
  pintarProductos()
}

productosContenedor.addEventListener('click', e => {
  if (e.target.closest('.agregar')) {
    const id = +e.target.closest('.agregar').dataset.id
    agregarAlCarrito(id)
  }
})

articulosContenedor.addEventListener('click', e => {
  if (e.target.closest('#cart-add')) {
    const id = +e.target.closest('#cart-add').dataset.id
    agregarAlCarrito(id)
  }

  if (e.target.closest('#cart-remove')) {
    const id = +e.target.closest('#cart-remove').dataset.id
    removerDelCarrito(id)
  }

  if (e.target.closest('#cart-delete')) {
    const id = +e.target.closest('#cart-delete').dataset.id
    eliminarArticulo(id)
  }
})

botonComprar.addEventListener('click', () => {
  comprar()
})