//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btnGuardar").addEventListener("click", function () {
        let perfil = Array(
           {
           nombre: document.getElementById('txtNombre').value,
           apellido:document.getElementById('txtApellido').value,
           edad: document.getElementById('txtEdad').value,
           email: document.getElementById('txtEmail').value,
           telefono: document.getElementById('txtTelefono').value
           }
        );
        if (document.getElementById("txtNombre").value.length != 0 || document.getElementById("txtApellido").value.length != 0 ||
            document.getElementById("txtEdad").value.length!=0 & document.getElementById("txtEmail").value.length !=0 & document.getElementById("txtTelefono").value.length !=0) {
            localStorage.setItem('usuarioP', JSON.stringify(perfil));
            console.log(perfil);
        }
    });
        const nombre = document.getElementById('txtNombre');
        const apellido = document.getElementById("txtApellido");
        const edad = document.getElementById("txtEdad");
        const email = document.getElementById("txtEmail");
        const telefono = document.getElementById("txtTelefono");
        let usuario = JSON.parse(localStorage.getItem('usuarioP'));
        console.log(usuario);
        if (usuario != null ){
           // console.log(username[0].usuario);
            nombre.value=usuario[0].nombre;
            apellido.value=usuario[0].apellido;
            edad.value=usuario[0].edad;
            email.value=usuario[0].email;
            telefono.value=usuario[0].telefono;
        let username = JSON.parse(localStorage.getItem('user'));
        document.getElementById("txtUsernav").value= username[0].usuario;
        document.getElementById("txtPsw").value= username[0].contra;
        }


});