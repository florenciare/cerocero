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
                            <td> ` +subtotal+ ` `+producto.currency+`</td> 
                        
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
       document.getElementById("productEnvio").innerHTML= costoEnvio + ' UYU';
       document.getElementById("totalCost").innerHTML= (subtotal + costoEnvio) + ' UYU';
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos= resultObj.data;
            articulo= articulos.articles;
            console.log(articulo);

            verCarrito(articulo);
            functionR();
        }
    });
   
      
});