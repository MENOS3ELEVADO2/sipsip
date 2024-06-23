var g_id_usuario = "";

// Función para agregar un nuevo usuario
function agregarUsuario() {
    var nombre_usuario = document.getElementById("txt_nombre_usuario").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var fechaActual = obtenerFechaHora();

    const raw = JSON.stringify({
        "nombre_usuario": nombre_usuario,
        "fecha_registro": fechaActual
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
        .then((response) => {
            if (response.status == 200) {
                // Mostrar mensaje de confirmación
                mostrarMensaje('Usuario agregado exitosamente.', 'success');
                setTimeout(() => { location.href = "listar.html"; }, 2000);
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para listar los usuarios
function listarUsuarios() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila);
            $('#tbl_usuario').DataTable();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar una fila en la tabla de usuarios
function completarFila(element, index, arr) {
    var fechaFormateada = formatearFechaHora(element.fecha_registro);
    arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML += 
    `<tr>
        <td>${element.id_usuario}</td>
        <td>${element.nombre_usuario}</td>
        <td>${fechaFormateada}</td>
        <td>
            <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
            <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a> 
        </td>
    </tr>`;
}

// Función para obtener el ID del usuario a actualizar desde la URL
function obtenerIdActualizacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;

    obtenerDatosActualizacion(p_id_usuario);
}

// Función para obtener el ID del usuario a eliminar desde la URL
function obtenerIdEliminacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;

    obtenerDatosEliminacion(p_id_usuario);
}

// Función para obtener los datos del usuario a eliminar
function obtenerDatosEliminacion(id_usuario) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + id_usuario, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiquetaEliminar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para obtener los datos del usuario a actualizar
function obtenerDatosActualizacion(id_usuario) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + id_usuario, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar la etiqueta de eliminación
function completarEtiquetaEliminar(element, index, arr) {
    var nombreUsuario = element.nombre_usuario;
    document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar este usuario? <b>" + nombreUsuario + "</b>";
}

// Función para completar el formulario de actualización
function completarFormularioActualizar(element, index, arr) {
    var nombreUsuario = element.nombre_usuario;
    document.getElementById('txt_nombre_usuario').value = nombreUsuario;
}

// Función para actualizar un usuario
function actualizarUsuario() {
    var nombre_usuario = document.getElementById("txt_nombre_usuario").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre_usuario": nombre_usuario
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                // Mostrar mensaje de confirmación
                mostrarMensaje('Usuario actualizado exitosamente.', 'success');
                setTimeout(() => { location.href = "listar.html"; }, 2000);
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para eliminar un usuario
function eliminarUsuario() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                // Mostrar mensaje de confirmación
                mostrarMensaje('Usuario eliminado exitosamente.', 'success');
                setTimeout(() => { location.href = "listar.html"; }, 2000);
            } else if (response.status == 400) {
                // Mostrar mensaje de error
                mostrarMensaje('No es posible eliminar. El registro está siendo utilizado.', 'danger');
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para obtener la fecha y hora actual
function obtenerFechaHora() {
    var fechaHoraActual = new Date();
    var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+),\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
    return fechaFormateada;
}

// Función para formatear la fecha y hora
function formatearFechaHora(fecha_registro) {
    var fechaHoraActual = new Date(fecha_registro);
    var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    }).replace(/(\d+)\/(\d+)\/(\d+),\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5');
    return fechaFormateada;
}

// Función para mostrar mensajes de confirmación o error
function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.className = `alert alert-${tipo}`;
    divMensaje.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(divMensaje, main);

    // Desaparecer el mensaje después de 3 segundos
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

