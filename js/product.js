const types = [{ "id": "0", "type": "VIVERES" },
{ "id": "1", "type": "LICORES" },
{ "id": "2", "type": "MEDICINAS" },
{ "id": "3", "type": "ASEO" }]

var _idP = ''
let html =""

//CARGAR SELECT 
addEventListener('load', () => {
    select = document.getElementById("typeProduct");
    types.forEach(element => {
        option = document.createElement("option");
        option.value = element.id;
        option.text = element.type;
        select.appendChild(option);
    });
})

//GET
fetch('http://localhost:4000/prod')
        .then(result => result.json())
        .then(data => showProduct(data))
        .catch(err => console.log(err));

//POST
document.getElementById('create').addEventListener("click", (evento) => {
    evento.preventDefault();
    let idProd = document.getElementById('idProduct').value
    let typeProd = document.getElementById('typeProduct').value
    let stockP = document.getElementById('stock').value
    let valueP = document.getElementById('value').value
    let dateExpiredP = document.getElementById('dateExpired').value
    let date = dateExpiredP.substr(0,10)
    let descriptionP = document.getElementById('description').value

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

//LLenar tabla
const showProduct = products => {
 
    products.data.map((product) => {
        console.log(product._id)
        html += `<tr>
        <td>${product.idProduct}</td>
        <td>${product.description}</td>
        <td>${product.dateExpired}</td>
        <td>${product.value}</td>
        <td>${product.stock}</td>
        <td> <button type="button" class="btn btn-outline-primary" id="search" onclick="searchProduct(${product.idProduct})">Buscar</button>
             <button type="button" class="btn btn-outline-danger" id="delete" onclick="deleteProduct('${product._id}')">Borrar</button></td>
        </tr>`
    })
    document.getElementById('contenido').innerHTML = html
}

//GET
function searchProduct(idProduct){
    fetch(`http://localhost:4000/prod/${idProduct}`)
    .then(result => result.json())
    .then(data =>loadData(data))
    .catch(err => console.log(err));
}

//PUT
document.getElementById('modify').addEventListener("click", (evento) => {
    evento.preventDefault();
    //let _id = document.getElementById('_id').value
    let idProd = document.getElementById('idProduct').value
    let typeProd = document.getElementById('typeProduct').value
    let stockP = document.getElementById('stock').value
    let valueP = document.getElementById('value').value
    let dateExpiredP = document.getElementById('dateExpired').value
    let descriptionP = document.getElementById('description').value

    if (typeProd != "" && typeProd != undefined) {
        types.forEach(element => {
            if (element.id == typeProd) {
                typeProd = element.type
            }
        });
    }

    const data = {
        idProduct: idProd,
        description: descriptionP,
        value: valueP,
        stock: stockP,
        typeProduct: typeProd,
        dateExpired: dateExpiredP
    }

    sendModify(`http://localhost:4000/prod/${_idP}`, data, 'PUT')
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
        alert(`Producto ${data.data.idProduct} modificado`)
        clearFields()
        dataP()
    }
}

//PATCH
document.getElementById('update').addEventListener("click", (evento) => {
    evento.preventDefault();
    //let _id = document.getElementById('_id').value
    let idProd = document.getElementById('idProduct').value
    let typeProd = document.getElementById('typeProduct').value
    let stockP = document.getElementById('stock').value
    let valueP = document.getElementById('value').value
    let dateExpiredP = document.getElementById('dateExpired').value
    let descriptionP = document.getElementById('description').value

    if (typeProd != "" && typeProd != undefined) {
        types.forEach(element => {
            if (element.id == typeProd) {
                typeProd = element.type
            }
        });
    }

    const data = {
        idProduct: idProd,
        description: descriptionP,
        value: valueP,
        stock: stockP,
        typeProduct: typeProd,
        dateExpired: dateExpiredP
    }

    sendUpdate(`http://localhost:4000/prod/${_idP}`, data, 'PATCH')
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
        alert(`Producto ${data.data.idProduct} actualizado`)
        clearFields()
        dataP()
    }
}

//DELETE

function deleteProduct(id){
    sendDelete(`http://localhost:4000/prod/${id}`, 'DELETE')
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
        alert(`Producto ${data.data.idProduct} eliminado`)
        dataP()
    }
}


//Cargar data en los fields
function loadData(data) {

    var typeProductS = ''
    data.data.map((product) => {
        _idP = product._id
        document.getElementById('idProduct').value = product.idProduct
        document.getElementById('stock').value = parseInt(product.stock,10)
        document.getElementById('description').value = product.description
        document.getElementById('value').value = parseFloat(product.value)
        document.getElementById('dateExpired').value =product.dataExpired
        
        types.forEach(element => {
            if (product.typeProduct == element.type) {
                typeProductS = element.id
            }
        });
        document.getElementById('typeProduct').value = typeProductS
    })
}

//Limpiar campos
function clearFields() {
    document.getElementById('idProduct').value = ""
    document.getElementById('stock').value = ""
    document.getElementById('description').value = ""
    document.getElementById('value').value = ""
    document.getElementById('dateExpired').value = ""
    document.getElementById('typeProduct').value = "Seleccione el tipo de producto"
}


//Find
function dataP(){
    html = ""
    fetch('http://localhost:4000/prod')
    .then(result => result.json())
    .then(data => showProduct(data))
    .catch(err => console.log(err));
}
