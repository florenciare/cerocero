var producto = {};

function showImageGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImageGallery").innerHTML = htmlContentToAppend;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj);

            producto = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSCountHTML = document.getElementById("productSCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostt= document.getElementById("productCost");

            productNameHTML.innerHTML = producto.name;
            productDescriptionHTML.innerHTML = producto.description;
            productSCountHTML.innerHTML = producto.soldCount;
            productCategoryHTML.innerHTML = producto.category;
            productCostt.innerHTML= producto.cost +" "+ producto.currency;

            //Muestro las imagenes en forma de galería
            showImageGallery(producto.images);
        }

    });

});