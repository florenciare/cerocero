var producto = {};
var productosR = {};
var currentComentariosArray = [];
var currentSortCriteria = undefined;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";

function sortComments(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.dateTime < b.dateTime) { return -1; }
            if (a.dateTime > b.dateTime) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.dateTime > b.dateTime) { return -1; }
            if (a.dateTime < b.dateTime) { return 1; }
            return 0;
        });
    
    }

    return result;
}

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
function showCommentList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentComentariosArray.length; i++) {
        let commentario = currentComentariosArray[i];

        htmlContentToAppend += `
            <div class="row">
               
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    
                        <h5 class="mb-1">`+ commentario.user +  ` ` + commentario.score + `</h4>
                        
                    </div>
                    <p class="mb-1">` + commentario.description + `</p>
                    <small class="text-muted">` + commentario.dateTime + ` </small>
                    <hr>

                </div>
            </div>
        </a>
        `
    }

    document.getElementById("coment-list-container").innerHTML = htmlContentToAppend;
}
function sortAndShowComments(sortCriteria, comentariosArray) {
    currentSortCriteria = sortCriteria;

    if (comentariosArray != undefined) {
        currentComentariosArray = comentariosArray;
    }
    // currentComentariosArray = sortProducts(currentSortCriteria, currentComentariosArray);

    //Muestro los productos ordenados
    showCommentList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //console.log(resultObj);

            producto = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSCountHTML = document.getElementById("productSCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostt = document.getElementById("productCost");
            let productoRel = document.getElementById("productR");

            productNameHTML.innerHTML = producto.name;
            productDescriptionHTML.innerHTML = producto.description;
            productSCountHTML.innerHTML = producto.soldCount;
            productCategoryHTML.innerHTML = producto.category;
            productCostt.innerHTML = producto.cost + " " + producto.currency;
            productoRel = producto.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImageGallery(producto.images);
        }


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                console.log(resultObj.data);

                coment = resultObj.data;
            sortAndShowComments(ORDER_ASC_BY_NAME, resultObj.data);

            }
        })

});
})