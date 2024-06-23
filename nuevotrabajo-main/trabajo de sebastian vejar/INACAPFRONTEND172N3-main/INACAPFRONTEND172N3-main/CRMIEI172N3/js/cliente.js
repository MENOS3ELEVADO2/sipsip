// Variable global para almacenar el id del cliente a actualizar o eliminar
var g_id_cliente = "";

// Función para agregar un nuevo cliente
function agregarCliente() {
    // Obtenemos el nombre del cliente desde la interfaz de usuario
    var nombre_cliente = document.getElementById("txt_nombre_cliente").value;
    // Configuramos los headers para la solicitud HTTP
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Obtener la fecha y hora actual formateada
    var fechaActual = obtenerFechaHora();

    // Crear el cuerpo de la solicitud en formato JSON
    const raw = JSON.stringify({
        "nombre_cliente": nombre_cliente,
        "fecha_registro": fechaActual
    });

    // Configuración de la solicitud HTTP
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Realizar la solicitud POST para agregar el cliente
    fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
        .then((response) => {
            // Redireccionar a la página de listar si la respuesta es exitosa (código 200)
            if (response.status == 200) {
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para listar todos los clientes
function listarClientes() {
    // Configuración de la solicitud HTTP para obtener la lista de clientes
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Realizar la solicitud GET para obtener los clientes
    fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            // Iterar sobre cada cliente obtenido y completar las filas de la tabla
            json.forEach(completarFila);
            // Inicializar la tabla con DataTables para mejorar la presentación
            $('#tbl_cliente').DataTable();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar una fila de la tabla de clientes
function completarFila(element, index, arr) {
    // Formatear la fecha de registro del cliente
    var fechaFormateada = formatearFechaHora(element.fecha_registro);

    // Agregar una nueva fila a la tabla de clientes
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
        `<tr>
        <td>${element.id_cliente}</td>
        <td>${element.nombre_cliente}</td>
        <td>${fechaFormateada}</td>
        <td>
            <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
            <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a> 
        </td>
        </tr>`;
}

// Función para obtener el id del cliente a actualizar desde la URL
function obtenerIdActualizacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_cliente = parametros.get('id');
    g_id_cliente = p_id_cliente;

    // Obtener los datos del cliente a actualizar
    obtenerDatosActualizacion(p_id_cliente);
}

// Función para obtener el id del cliente a eliminar desde la URL
function obtenerIdEliminacion() {
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_cliente = parametros.get('id');
    g_id_cliente = p_id_cliente;

    // Obtener los datos del cliente a eliminar
    obtenerDatosEliminacion(p_id_cliente);
}

// Función para obtener los datos del cliente a eliminar
function obtenerDatosEliminacion(id_cliente) {
    // Configuración de la solicitud HTTP para obtener los datos del cliente
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Realizar la solicitud GET para obtener los datos del cliente a eliminar
    fetch("http://144.126.210.74:8080/api/cliente/" + id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiquetaEliminar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para obtener los datos del cliente a actualizar
function obtenerDatosActualizacion(id_cliente) {
    // Configuración de la solicitud HTTP para obtener los datos del cliente
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Realizar la solicitud GET para obtener los datos del cliente a actualizar
    fetch("http://144.126.210.74:8080/api/cliente/" + id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para completar la etiqueta de confirmación de eliminación
function completarEtiquetaEliminar(element, index, arr) {
    var nombreCliente = element.nombre_cliente;
    document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar este cliente? <b>" + nombreCliente + "</b>";
}

// Función para completar el formulario de actualización con los datos del cliente
function completarFormularioActualizar(element, index, arr) {
    var nombreCliente = element.nombre_cliente;
    document.getElementById('txt_nombre_cliente').value = nombreCliente;
}

// Función para actualizar los datos de un cliente
function actualizarCliente() {
    // Obtener el nombre del cliente desde la interfaz de usuario
    var nombre_cliente = document.getElementById("txt_nombre_cliente").value;
    // Configuración de los headers para la solicitud HTTP
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Crear el cuerpo de la solicitud en formato JSON
    const raw = JSON.stringify({
        "nombre_cliente": nombre_cliente
    });

    // Configuración de la solicitud HTTP
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Realizar la solicitud PATCH para actualizar los datos del cliente
    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
        .then((response) => {
            // Redireccionar a la página de listar si la respuesta es exitosa (código 200)
            if (response.status == 200) {
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para eliminar un cliente
function eliminarCliente() {
    // Configuración de los headers para la solicitud HTTP
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Configuración de la solicitud HTTP
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    // Realizar la solicitud DELETE para eliminar el cliente específico
    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
        .then((response) => {
            // Redireccionar a la página de listar si la respuesta es exitosa (código 200)
            if (response.status == 200) {
                location.href = "listar.html";
            }
            // Mostrar mensaje de error si el cliente no se puede eliminar (código 400)
            if (response.status == 400) {
                alert("No es posible eliminar. El registro está siendo utilizado.");
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Función para obtener la fecha y hora actual formateada
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

// Función para formatear la fecha y hora recibida
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
 