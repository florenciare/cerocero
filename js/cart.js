var articulos={};
var costoEnvio=0;
var subtotal;
var prodCount;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';

function verCarrito(array){
    const row= document.createElement('tr');
    for(let i = 0; i < array.length; i++) {
        let producto = array[i];
        subtotal= producto.count *producto.unitCost;
        prodCount= producto.unitCost;
            row.innerHTML = `
                <td>
                  <img src="` + producto.src + `" width=100">
                    </td>                        
                            <td>`+ producto.name + `</td>
                             <td> `+ producto.unitCost + ` ` + producto.currency +`</td>
                            <td> <input onchange=functionR()  class="form-control" type="number" id="cantidadd" min="1" placeholder="" value="` + producto.count + `"></td>
                            <span id="productSubtotal1" onchange="functionR()">` +subtotal+ ` `+producto.currency+`</span> 
                        
              `
        }
        + `</tr>`
        document.getElementById("listacompra").appendChild(row); 
    
}       

function functionR(){
    var x = document.getElementById("cantidadd");
       subtotal= x.value * prodCount;
    //    console.log(subtotal);
       document.getElementById("productSubtotal").innerHTML = subtotal + ' UYU';
       document.getElementById("productSubtotal1").innerHTML = subtotal + ' UYU';
       document.getElementById("productEnvio").innerHTML= costoEnvio + ' UYU';
       document.getElementById("totalCost").innerHTML= (subtotal + costoEnvio) + ' UYU';

       let unitProductCostHTML = document.getElementById("productSubtotal");
       let comissionCostHTML = document.getElementById("productEnvio");
       let totalCostHTML = document.getElementById("totalCost");
    
       let unitCostToShow = MONEY_SYMBOL + subtotal;
       let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
       let totalCostToShow = MONEY_SYMBOL + ((Math.round(subtotal * comissionPercentage * 100)) / 100 + subtotal);
   
       unitProductCostHTML.innerHTML = unitCostToShow;
       comissionCostHTML.innerHTML = comissionToShow;
       totalCostHTML.innerHTML = totalCostToShow;
    }   
document.getElementById("premiumradio").addEventListener("change", function(){
    comissionPercentage = 0.15;
    functionR();
});

document.getElementById("expressradio").addEventListener("change", function(){
    comissionPercentage = 0.07;
    functionR();
});

document.getElementById("standardradio").addEventListener("change", function(){
    comissionPercentage = 0.05;
    functionR();
});  

function functionJ() {
    if (document.getElementById("direcc").value.length != 0) {
        $('#exampleModal2').modal('toggle')
} else {
   if (document.getElementById("direcc").value.length == 0) {
      document.getElementById("direcc").style.borderColor = 'red';
      document.getElementById("direccOk").innerHTML= "Completar campo"
      document.getElementById("direccOk").style.color = 'red';

   } else {
      document.getElementById("direcc").style.removeProperty('border-color');
      document.getElementById("direccOk").innerHTML=""; 
   } 
} 
}
function functionK(){
    if (document.getElementById("nroTarj").value.length!=0 & document.getElementById("fechacheck").value.length!=0){
        $('#exampleModal').modal('toggle')
    } else {
        if (document.getElementById("nroTarj").value.length == 0) {
            document.getElementById("nroTarj").style.borderColor = 'red';
            document.getElementById("tarjetaOk").style.color = 'red';
            document.getElementById("tarjetaOk").innerHTML= "Campo requerido"
        } else {
            document.getElementById("nroTarj").style.removeProperty('border-color');
            document.getElementById("tarjetaOk").innerHTML="";

    } if ( document.getElementById("fechacheck").value.length==0){
        document.getElementById("fechacheck").style.borderColor = 'red';
        document.getElementById("fechaOk").style.color = 'red';
        document.getElementById("fechaOk").innerHTML= "Campo requerido"
        }else{
            document.getElementById("fechacheck").style.removeProperty('border-color');
            document.getElementById("fechaOk").innerHTML="";
        }
}
}
function validar(){
    var direccion, nroTarjeta, fecha;
    direccion = document.getElementById("direcc").value;
    nroTarjeta = document.getElementById("nroTarj").value;
    fecha = document.getElementById("fechaOk").value;
    
    if (direccion==="" || nroTarjeta==="" || fecha===""){
        (function (){
            $(function(){
                 $('#btnComprar').on('click',function(){
                 $('#exampleModal4').modal();
                 })
                 });  
              }());
              return false;
    }else{
        (function (){
                 $(function(){
                 $('#btnComprar').on('click',function(){
                 $('#exampleModal3').modal();
                 })
                 });  
              }());
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos= resultObj.data;
            verCarrito(articulos.articles);
            functionR();
        }
    });
    document.getElementById("btnComprar").addEventListener("click", function(){
        
        validar();
    });
//    (function (){
//     $(function(){
//     $('#btnComprar').on('click',function(){
//     $('#exampleModal3').modal();
//     })
//     });  
//  }());
 
});