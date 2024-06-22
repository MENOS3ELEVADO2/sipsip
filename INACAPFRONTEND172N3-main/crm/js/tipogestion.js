function agregarTipoGestion(){
    //Obtenemos valor del tipo de gestión desde formulario
    var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "nombre_tipo_gestion": nombre_tipo_gestion,
      "fecha_registro": "2024-04-17 12:16:00"
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74/api/tipo_gestion", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}