


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

    const btnBuy  = document.getElementById('buy-product') 
    btnBuy.addEventListener('click', () => {
        sendBuy()
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


//POST

function sendBuy(){
    let idCustomer = document.getElementById('idCustomer').value
    let number = document.getElementById('number').value
    let dateBill = document.getElementById('dateBill').value
    let typePay = document.getElementById('typePay').value

    console.log (typePay)

    if (idCustomer == '' || idCustomer == undefined) {
        alert("Ingrese el id del cliente")
        document.getElementById('idCustomer').focus()
        return
    }

    if (number == '' || number == undefined) {
        alert("Ingrese el número de la factura")
        document.getElementById('number').focus()
        return
    } 
    if (dateBill == '' || dateBill == undefined) {
        alert("Ingrese la fecha de fcaturación")
        document.getElementById('dateBill').focus()
        return
    }

    if (typePay == 'Pago') {
        alert("Seleccione si desea pagar")
        document.getElementById('typePay').focus()
        return
    }

    

    const data = {
        idCustomer: idCustomer,
        number: number,
        dateBill: dateBill,
        typePay: typePay
    }

    console.log(data)

   /* sendCreate('http://localhost:4000/prod', data, 'POST')
        .then(data => create(data))
        .catch(err => console.log(err))*/
}
/*
const btnBuy = document.getElementById('buy-product')
btnBuy.addEventListener('click', () => {
    //evento.preventDefault();
    let idCustomer = document.getElementById('idCustomer').value
    let number = document.getElementById('number').value
    let dateBill = document.getElementById('dateBill').value
    let typePay = document.getElementById('typePay').value

    console.log (typePay)

    if (idProd == '' || idProd == undefined) {
        alert("Ingrese el id del producto")
        document.getElementById('idProduct').focus()
        return
    }

    if (typeProd != 'Seleccione el tipo de producto') {
        types.forEach(element => {
            if (element.id == typeProd) {
                typeProd = element.type
            }
        });
    } else {
        alert("Elija el tipo de producto")
        document.getElementById('typeProduct').focus()
        return
    }

    if (stockP == '' || stockP == undefined) {
        alert("Ingrese el stock del producto")
        document.getElementById('stock').focus()
        return
    } else if (stockP < 5) {
        alert("El stock debe ser mayor a 5")
        document.getElementById('stock').focus()
        return
    }

    if (valueP == '' || valueP == undefined) {
        alert("Ingrese el valor del producto")
        document.getElementById('value').focus()
        return
    }

    if (dateExpiredP == '' || dateExpiredP == undefined) {
        alert("Ingrese la fecha de vencimiento del producto")
        document.getElementById('dateExpired').focus()
        return
    }
    if (descriptionP == '' || descriptionP == undefined) {
        alert("Ingrese la descripción del producto")
        document.getElementById('description').focus()
        return
    }

    const data = {
        idProduct: idProd,
        description: descriptionP,
        value: valueP,
        stock: stockP,
        typeProduct: typeProd,
        dateExpired: dateExpiredP
    }

   sendCreate('http://localhost:4000/prod', data, 'POST')
        .then(data => create(data))
        .catch(err => console.log(err))
})
*/
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

function create(data) {
    if (data.result == 'Success') {
        alert(`Producto ${data.data.idProduct} creado`)
        clearFields()
        dataP()
    }
}

