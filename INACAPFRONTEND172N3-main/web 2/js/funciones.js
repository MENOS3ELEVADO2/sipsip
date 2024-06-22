
//Función para peso ideal
function calcularPesoIdeal(){
    //Mostramos el contenedor de resultado
    var contenedorTarjeta = document.getElementById("cnt_tarjeta");
    contenedorTarjeta.style.visibility = "visible";
   
    //Obtenemos la edad ingresada
    var edad = document.getElementById("txt_edad").value;
    
   
    //Calculamos el peso ideal usando fórmula edad*2+8
    var pesoIdeal = edad * 2 + 8;
  
    //Mostramos resultado en contenedor cnt_resultado
    document.getElementById("cnt_resultado").innerHTML ="Peso ideal es " + pesoIdeal + " kilos.";

    //Invocamos calcularEstadoPeso y enviamos parámetro
    calcularEstadoPeso(pesoIdeal);
}
//Función para calcular estado de peso
function calcularEstadoPeso(pesoIdeal){
    //Capturamos el peso actual
    var pesoActual = document.getElementById("txt_peso_actual").value;
    //Comparamos pesoActual y pesoIdeal
    var estadoPeso ="";
    var estadoImagen="";
    var estilo ="";
    if(pesoActual == pesoIdeal){
        estadoPeso ="Peso ideal";
        estadoImagen ="peso_ideal_128x128.png";
        estilo ="success";
    }else{
        //Evaluamos si está con sobrepeso
        if(pesoActual > pesoIdeal) {
            estadoPeso = "Sobrepeso";
            estadoImagen = "sobrepeso_128x128.png";
            estilo = "danger";
        }else{
            estadoPeso = "Bajo peso";
            estadoImagen = "bajopeso_128x128.png";
            estilo = "warning";
        }
    }
    //Mostramos el resultado
    var contenedorEstado = document.getElementById("cnt_resultado_estado");
    contenedorEstado.innerHTML ="Estado peso es " + estadoPeso + ".";
    //Aplicamos un estilo al contenedor
    contenedorEstado.className ="alert alert-"+estilo;
    //Mostramos la imagen
    document.getElementById("cnt_resultado_imagen").innerHTML ="<img src=img/"+ estadoImagen +" >";
    //Invocamos función para determinar diferencia
    calcularDiferencia(pesoActual,pesoIdeal,estilo);

}
function calcularDiferencia(pesoActual,pesoIdeal,estilo){
    var diferenciaPeso = pesoActual - pesoIdeal;
    var contenedorDiferencia = document.getElementById("cnt_diferencia");
    contenedorDiferencia.innerHTML ="Diferencia de peso "+diferenciaPeso+ " kilos";
    contenedorDiferencia.className ="badge text-bg-"+estilo;
}