//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

   document.getElementById("btnIngreso").addEventListener("click", function () {
      let userr = Array(
         {
         usuario: document.getElementById('inputCorreo').value,
         contra:document.getElementById('inputContrasenia').value
         }
      );
    

      if (document.getElementById("inputCorreo").value.length != 0 & document.getElementById("inputContrasenia").value.length != 0) {
              localStorage.setItem('user', JSON.stringify(userr));
              console.log(userr);
            return location.href = "inicio.html";
      } else {
         if (document.getElementById("inputCorreo").value.length == 0) {

            document.getElementById("inputCorreo").style.borderColor = 'red';
         } else {
            document.getElementById("inputCorreo").style.removeProperty('border-color');
         }
         if (document.getElementById("inputContrasenia").value.length == 0) {
            document.getElementById("inputContrasenia").style.borderColor = 'red';
         } else {
            document.getElementById("inputContrasenia").style.removeProperty('border-color');
         }
         //alert("Verificar datos");
         var mensaje = "<h6> Completar campos vacíos</h6>";
         console.log(mensaje);
         document.getElementsByClassName('mensajeError')[0].innerHTML= mensaje;
      }
   });

});
