var articulos={};
var subtotal= 0;

function verCarrito(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

            htmlContentToAppend += `
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.src + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name + `</h4>
                             <p class="col-md-2"> `+ producto.unitCost + ` ` + producto.currency +`</p>
                            <div class="col-md-2"> <input class="form-control" type="number" placeholder="" value="` + producto.count + `"></div>
                        </div>
                        
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("product-container").innerHTML = htmlContentToAppend;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos= resultObj.data;
            console.log(articulos.articles);
            verCarrito(articulos.articles);
        }
    });
});