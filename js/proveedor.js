var _idP = ''
let html =""

//GET
fetch('http://localhost:4000/provider')
        .then(result => result.json())
        .then(data => showProvider(data))
        .catch(err => console.log(err));

//POST
document.getElementById('create').addEventListener("click", (evento) => {
    evento.preventDefault();
    let nit = document.getElementById('nit').value
    let name = document.getElementById('name').value
    let phone = document.getElementById('phone').value
    let address = document.getElementById('address').value

    if (nit == '' || nit == undefined) {
        alert("Ingrese el NIT del proveedor")
        document.getElementById('nit').focus()
        return
    }

    if (name == '' || name == undefined) {
        alert("Ingrese el nombre del proveedor")
        document.getElementById('name').focus()
        return
    } 

    if (phone == '' || phone == undefined) {
        alert("Ingrese el telefono del proveedor")
        document.getElementById('phone').focus()
        return
    }

    if (address == '' || address == undefined) {
        alert("Ingrese la direccion del proveedor")
        document.getElementById('address').focus()
        return
    }

    const data = {
        nit: nit,
        name: name,
        phone: phone,
        address: address,
    }

    sendCreate('http://localhost:4000/provider', data, 'POST')
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
        alert(`Provedor ${data.data.nit} creado`)
        clearFields()
        dataP()
    }
}

//LLenar tabla
const showProvider = providers => {
    let html = ""
    providers.data.map((provider) => {
        html += `<tr>
        <td>${provider.nit}</td>
        <td>${provider.name}</td>
        <td>${provider.phone}</td>
        <td>${provider.address}</td>
        <td> <button type="button" class="btn btn-outline-primary" id="search" onclick="searchProvider(${provider.nit})">Buscar</button>
         <button type="button" class="btn btn-outline-danger" id="delete" onclick="deleteProvider('${provider._id}')">Borrar</button></td>
        </tr>`
    })
    document.getElementById('contenido').innerHTML = html
}

//GET
function searchProvider(id){
    console.log(id)
    fetch(`http://localhost:4000/provider/${id}`)
    .then(result => result.json())
    .then(data =>loadData(data))
    .catch(err => console.log(err));
}

//PUT
document.getElementById('modificar').addEventListener("click", (evento) => {
    evento.preventDefault();
    let nit = document.getElementById('nit').value
    let name = document.getElementById('name').value
    let phone = document.getElementById('phone').value
    let address = document.getElementById('address').value

    const data = {
        nit: nit,
        name: name,
        phone: phone,
        address: address
    }

    sendModify(`http://localhost:4000/provider/${_idP}`, data, 'PUT')
        .then(data => modify(data))
        .catch(err => console.log(err))

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
        alert(`Provedor ${data.data.nit} modificado`)
        clearFields()
        dataP()
    }
}

//PATCH
document.getElementById('actualizar').addEventListener("click", (evento) => {
    evento.preventDefault();
    let nit = document.getElementById('nit').value
    let name = document.getElementById('name').value
    let phone = document.getElementById('phone').value
    let address = document.getElementById('address').value

    const data = {
        nit: nit,
        name: name,
        phone: phone,
        address: address
    }
    console.log(data)

    sendUpdate(`http://localhost:4000/provider/${_idP}`, data, 'PATCH')
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
        alert(`Provedor ${data.data.nit} actualizado`)
        clearFields()
        dataP()
    }
}

//DELETE
function deleteProvider(id){
    console.log(id)
    sendDelete(`http://localhost:4000/provider/${id}`, 'DELETE')
    .then(data => deleteProv(data))
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

function deleteProv(data){
    if (data.result == 'Success') {
        alert(`Provedor ${data.data.nit} eliminado`)
        dataP()
    }
}


//Cargar data en los fields
function loadData(data) {


    data.data.map((provider) => {  
        _idP = provider._id
        document.getElementById('nit').value = provider.nit
        document.getElementById('name').value = provider.name
        document.getElementById('phone').value = provider.phone
        document.getElementById('address').value = provider.address
    })
}

//Limpiar campos
function clearFields() {
    document.getElementById('nit').value = ""
    document.getElementById('name').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('address').value = ""

}


//Find
function dataP(){
    html = ""
    fetch('http://localhost:4000/provider')
    .then(result => result.json())
    .then(data => showProvider(data))
    .catch(err => console.log(err));
}
