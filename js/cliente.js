var _idP = ''
let html =""

//GET
fetch('http://localhost:4000/customer')
        .then(result => result.json())
        .then(data => showProduct(data))
        .catch(err => console.log(err));

//POST
document.getElementById('create').addEventListener("click", (evento) => {
    evento.preventDefault();
    let id = document.getElementById('id').value
    let name = document.getElementById('name').value
    let apellido = document.getElementById('apellido').value
    let telefono = document.getElementById('telefono').value
    let direccion = document.getElementById('direccion').value
    
    if (id == '' || id == undefined) {
        alert("Ingrese la identificacion del cliente")
        document.getElementById('id').focus()
        return
    }

    if (name == '' || name == undefined) {
        alert("Ingrese el nombre del cliente")
        document.getElementById('name').focus()
        return
    }

    if (apellido == '' || apellido == undefined) {
        alert("Ingrese el apellido del cliente")
        document.getElementById('apellido').focus()
        return
    }

    if (telefono == '' || telefono == undefined) {
        alert("Ingrese el telefono del cliente")
        document.getElementById('telefono').focus()
        return
    }
    if (direccion == '' || direccion == undefined) {
        alert("Ingrese la direccion del cliente")
        document.getElementById('direccion').focus()
        return
    }

    const data = {
        idCustomer: id,
        name: name,
        lastname: apellido,
        phone: telefono,
        address: direccion
    }
    console.log(data)
    sendCreate('http://localhost:4000/customer', data, 'POST')
        .then(data => create(data))
        .catch(err => console.log(err))
})

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
        alert(`Cliente ${data.data.idCustomer} creado`)
        clearFields()
        dataP()
    }
}

//LLenar tabla
const showProduct = products => {
    //let html = ""
    products.data.map((product) => {
        html += `<tr>
        <td>${product.idCustomer}</td>
        <td>${product.name}</td>
        <td>${product.lastname}</td>
        <td>${product.phone}</td>
        <td>${product.address}</td>
        <td> <button type="button" class="btn btn-outline-primary" id="search" onclick="searchProduct(${product.idCustomer})">Buscar</button>
         <button type="button" class="btn btn-outline-danger" id="delete" value="deleteProduct(${product._id})">Borrar</button></td>
        </tr>`
    })
    document.getElementById('contenido').innerHTML = html
}

//GET
function searchProduct(id){
    fetch(`http://localhost:4000/customer/${id}`)
    .then(result => result.json())
    .then(data =>loadData(data))
    .catch(err => console.log(err));
}

//PUT
document.getElementById('modificar').addEventListener("click", (evento) => {
    evento.preventDefault();
    //let _id = document.getElementById('_id').value
    let id = document.getElementById('id').value
    let name = document.getElementById('name').value
    let lastname = document.getElementById('apellido').value
    let phone = document.getElementById('telefono').value
    let direccion = document.getElementById('direccion').value

    const data = {
        idCustomer: id,
        name: name,
        lastname: lastname,
        address: direccion,
        phone: phone,
        
    }
    console.log(data)

    sendModify(`http://localhost:4000/customer/${_idP}`, data, 'PUT')
        .then(data => modify(data))
        .catch(err => console.err(err))
})

async function sendModify(url, data, meth) {
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

function modify(data) {
    if (data.result == 'Success') {
        alert(`Cliente ${data.data.idCustomer} modificado`)
        clearFields()
        dataP()
    }
}

//DELETE
/*document.getElementById('delete').addEventListener("click", (evento) => {
    evento.preventDefault();
    let _id = document.getElementById('_id').value

    
})*/
//PATCH
document.getElementById('actualizar').addEventListener("click", (evento) => {
    evento.preventDefault();
    //let _id = document.getElementById('_id').value
    let id = document.getElementById('id').value
    let name = document.getElementById('name').value
    let lastname = document.getElementById('apellido').value
    let phone = document.getElementById('telefono').value
    let direccion = document.getElementById('direccion').value

    const data = {
        idCustomer: id,
        name: name,
        lastname: lastname,
        address: direccion,
        phone: phone,
        
    }

    sendUpdate(`http://localhost:4000/customer/${_idP}`, data, 'PATCH')
        .then(data => update(data))
        .catch(err => console.log(err))
})

async function sendUpdate(url, data, meth) {
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

function update(data) {
    if (data.result == 'Success') {
        alert(`Cliente ${data.data.idCustomer} actualizado`)
        clearFields()
        dataP()
    }
}

//DELETE

function deleteProduct(id){
    console.log('holiiiiiiiiiiii')
    console.log(id)
    sendDelete(`http://localhost:4000/customer/${id}`, 'DELETE')
    .then(data => deleteProd(data))
    .catch(err => console.log(err))
}

async function sendDelete(url, meth) {
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
    })
    return response.json()
}

function deleteProd(data){
    if (data.result == 'Success') {
        alert(`Cliente ${data.data.idCustomer} eliminado`)
        dataP()
    }
}
//Cargar data en los fields
function loadData(data) {

    //var typeProductS = ''
    data.data.map((product) => {
        _idP = product._id
        //console.log(typeProduct)
        document.getElementById('id').value = product.idCustomer
        document.getElementById('name').value = product.name
        document.getElementById('apellido').value = product.lastname
        document.getElementById('telefono').value = product.phone
        document.getElementById('direccion').value = product.address
    })
}

//Limpiar campos
function clearFields() {
    document.getElementById('id').value = ""
    document.getElementById('name').value = ""
    document.getElementById('apellido').value = ""
    document.getElementById('telefono').value = ""
    document.getElementById('direccion').value = ""
  }

//Find
function dataP(){
    html = ""
    fetch('http://localhost:4000/customer')
    .then(result => result.json())
    .then(data => showProduct(data))
    .catch(err => console.log(err));
}