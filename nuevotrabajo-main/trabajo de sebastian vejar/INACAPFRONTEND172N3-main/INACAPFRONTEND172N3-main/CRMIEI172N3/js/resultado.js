var g_id_resultado = "";

// Función para agregar un nuevo resultado
function agregarResultado() {
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado,
        "fecha_registro": "2024-04-17 17:29:00"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
        .then((response) => {
            if (response.status == 200) {
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para listar los resultados
function listarResultado() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila);
            $('#tbl_resultado').DataTable();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar una fila en la tabla de resultados
function completarFila(element, index, arr) {
    arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
        `<tr>
            <td>${element.id_resultado}</td>
            <td>${element.nombre_resultado}</td>
            <td>${element.fecha_registro}</td>
            <td>
                <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
                <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
            </td>
        </tr>`;
}

// Función para obtener el ID del resultado a actualizar desde la URL
function obtenerIdActualizacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;

    obtenerDatosActualizacion(p_id_resultado);
}

// Función para obtener el ID del resultado a eliminar desde la URL
function obtenerIdEliminacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;

    obtenerDatosEliminacion(p_id_resultado);
}

// Función para obtener los datos del resultado a eliminar
function obtenerDatosEliminacion(id_resultado) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiquetaEliminar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para obtener los datos del resultado a actualizar
function obtenerDatosActualizacion(id_resultado) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar la etiqueta de eliminación
function completarEtiquetaEliminar(element, index, arr) {
    var nombreResultado = element.nombre_resultado;
    document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar este resultado? <b>" + nombreResultado + "</b>";
}

// Función para completar el formulario de actualización
function completarFormularioActualizar(element, index, arr) {
    var nombreResultado = element.nombre_resultado;
    document.getElementById('txt_nombre_resultado').value = nombreResultado;
}

// Función para actualizar un resultado
function actualizarResultado() {
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + g_id_resultado, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para eliminar un resultado
function eliminarResultado() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + g_id_resultado, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
