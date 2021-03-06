const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var precioMin = undefined;
var precioMax = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(product.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(product.cost) <= precioMax))) {

            htmlContentToAppend += `               
                    <div class="col-md-4">
                    <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="card mb-4 shadow-sm">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    
                    <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                            <h4 class="mb-1">`+ product.name + ` - ` + product.cost + ` ` + product.currency + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <div class="w-100 d-none d-md-block"></div>
                        </div>
                       </a>
                        </div>             
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // console.log(resultObj);
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    document.getElementById("sortBySoldcount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    document.getElementById("ordAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("ordDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    //////LIMPIAR FILTRO
    document.getElementById("clearFilter").addEventListener("click", function () {
        document.getElementById("filterCountMin").value = "";
        document.getElementById("filterCountMax").value = "";

        precioMin = undefined;
        precioMax = undefined;

        showProductsList();
    });

    /////////FILTRO
    document.getElementById("rangeFilter").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar 

        precioMin = document.getElementById("filterCountMin").value;
        precioMax = document.getElementById("filterCountMax").value;

        if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0) {
            precioMin = parseInt(precioMin);
        }
        else {
            precioMin = undefined;
        }

        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0) {
            precioMax = parseInt(precioMax);
        }
        else {
            precioMax = undefined;
        }

        showProductsList();
    });

});