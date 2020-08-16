//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
  document.getElementById("btnIngreso").addEventListener("click", function(){
     if (document.getElementById("inputCorreo").value.length != 0 & document.getElementById("inputContrasenia").value.length != 0){
       return location.href="index.html";
     }else{
       alert("Verificar datos");
     }
    });
   
 });
