


const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
//.content es para acceder a los elementos
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()

//Creamos el carrito
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
items.addEventListener('click', e => { btnAumentarDisminuir(e) })


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

//Trae los productos 
const fetchData = async () => {

    try {
        
        const resultado = await fetch('http://localhost:4000/prod')
        const data = await resultado.json()
        showProduct(data)
        //console.log(data)

    } catch (error) {
        console.log(error)
    }
}
   
//Agregar datos del archivo json a un div en html
const showProduct = products => {
    let html = ""
    products.data.map((product) => {
        templateCard.querySelector('h5').textContent = product.idProduct
        templateCard.querySelector('h9').textContent = product.value
        templateCard.querySelector('p').textContent = product.description
        templateCard.querySelector('.btn-dark').dataset.id = product.idProduct 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
        //console.log()
    }
    e.stopPropagation()
}

const setCarrito = item => {
    const producto = {
        
        idProduct: item.querySelector('.btn-dark').dataset.id,
       
        description: item.querySelector('p').textContent,
        precio: item.querySelector('h9').textContent,
        cantidad: 1
    }
    // console.log(producto)
    //Aumenta la cantidad que desee del producto
    if (carrito.hasOwnProperty(producto.idProduct)) {
        producto.cantidad = carrito[producto.idProduct].cantidad + 1
    }

    carrito[producto.idProduct] = { ...producto }
    
    pintarCarrito()

}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.idProduct
        templateCarrito.querySelectorAll('td')[0].textContent = producto.description
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad     
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.idProduct
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.idProduct

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
        items.appendChild(fragment)

    pintarFooter()
}


const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - Agrega ! </th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.getElementById('vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}


const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}


async function sendCreate(url, data, meth) {
    const response = await fetch(url, {
        method: meth,
        mode: "cors",
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response.json()
}


/*document.addEventListener('DOMContentLoaded', e => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});*/

/*const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}*/