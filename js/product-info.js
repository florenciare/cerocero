var producto = {};
var productosR = {};
var productsRel = [];

var currentComentariosArray = [];
var currentProductosArray = [];
var currentSortCriteria = undefined;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";

function sortComments(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.score < b.score) { return -1; }
            if (a.score > b.score) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.score > b.score) { return -1; }
            if (a.score < b.score) { return 1; }
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
    var amarillo = '<span class="fa fa-star checked"></span>';
    var negro = '<span class="fa fa-star"></span>';


    let htmlContentToAppend = "";
    for (let i = 0; i < currentComentariosArray.length; i++) {
        let commentario = currentComentariosArray[i];

        htmlContentToAppend += `
            <div class="row">
               
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    
                        <h5 class="mb-1">`+ commentario.user + `</h5> ` + `<h6 class="mb-1">` +
            amarillo.repeat(commentario.score) + negro.repeat(5 - commentario.score) + `</h6>
                        
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
    currentComentariosArray = sortComments(currentSortCriteria, currentComentariosArray);

    //Muestro los productos ordenados
    showCommentList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    productsRel = document.getElementById("productR");

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            producto = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSCountHTML = document.getElementById("productSCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostt = document.getElementById("productCost");

            productNameHTML.innerHTML = producto.name;
            productDescriptionHTML.innerHTML = producto.description;
            productSCountHTML.innerHTML = producto.soldCount;
            productCategoryHTML.innerHTML = producto.category;
            productCostt.innerHTML = producto.cost + " " + producto.currency;
            productsRel = producto.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImageGallery(producto.images);
        }
        function eraseText() {
            document.getElementById("cajaTexto").value = "";
        }

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                // console.log(resultObj.data);

                coment = resultObj.data;
                sortAndShowComments(ORDER_DESC_BY_NAME, resultObj.data);

            }
        })
    
        console.log(productsRel);
       
        getJSONData(PRODUCTS_URL).then(function (resultt) {
            if (resultt.status === "ok") {
                 productosR = resultt.data; 
               // productosR= productosR[productsRel];
                //console.log(productosR);   
                //showProdRel();  
                let htmlContentToApend = "";
            for (let i = 0; i < productsRel.length; i++) {
                let produc = productosR[productsRel[i]];
           htmlContentToApend += `
           <div class="relatedd"
           <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + produc.imgSrc + `" alt=" `
                         + produc.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ produc.name + ` - ` + produc.cost + ` ` + produc.currency + `</h4>
                            <small class="text-muted">` + produc.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + produc.description + `</p>

                    </div>
                </div>
            </a>
            </div>
            `
            }

         document.getElementById("prod-list-container").innerHTML = htmlContentToApend;     

            }
        })

        document.getElementById("btnComentario").addEventListener("click", function () {         
            let amarillo = '<span class="fa fa-star checked"></span>';
            let negro = '<span class="fa fa-star"></span>';
            let username = JSON.parse(localStorage.getItem('user')); 
            let xx="";
           
            if (document.getElementById("star1").checked){
               xx = amarillo + negro.repeat(4);
               return document.getElementById("coment-list-container").innerHTML += `
               <div class="row">
                  
                   <div class="col">
                       <div class="d-flex w-100 justify-content-between">
                       
                           <h5 class="mb-1">`+ username[0].usuario + `</h5> ` + `<h6 class="mb-1">` + xx + `</h6>
                           
                       </div>
                       <p class="mb-1">` + cajaTexto.value + `</p>
                       
                       <hr>
   
                   </div>
               </div>
           </a>` + [eraseText()];
            } 
            else if(document.getElementById("star2").checked){
                xx = amarillo.repeat(2) + negro.repeat(3);
                return document.getElementById("coment-list-container").innerHTML += `
                <div class="row">
                   
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        
                            <h5 class="mb-1">`+ username[0].usuario + `</h5> ` + `<h6 class="mb-1">` + xx + `</h6>
                            
                        </div>
                        <p class="mb-1">` + cajaTexto.value + `</p>
                        
                        <hr>
    
                    </div>
                </div>
            </a>` + [eraseText()];
            }
            else if(document.getElementById("star3").checked){
                xx = amarillo.repeat(3) + negro.repeat(2);
                return document.getElementById("coment-list-container").innerHTML+= `
                <div class="row">
                   
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        
                            <h5 class="mb-1">`+ username[0].usuario + `</h5> ` + `<h6 class="mb-1">` + xx + `</h6>
                            
                        </div>
                        <p class="mb-1">` + cajaTexto.value + `</p>
                        
                        <hr>
    
                    </div>
                </div>
            </a>` + [eraseText()];
            }
            else if (document.getElementById("star4").checked){
                xx = amarillo.repeat(4) + negro;
                return document.getElementById("coment-list-container").innerHTML+= `
                <div class="row">
                   
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        
                            <h5 class="mb-1">`+ username[0].usuario + `</h5> ` + `<h6 class="mb-1">` + xx + `</h6>
                            
                        </div>
                        <p class="mb-1">` + cajaTexto.value + `</p>
                        
                        <hr>
    
                    </div>
                </div>
            </a>` + [eraseText()];
            }
            else if (document.getElementById("star5").checked){
                xx = amarillo.repeat(5);
                return document.getElementById("coment-list-container").innerHTML+= `
                <div class="row">
                   
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        
                            <h5 class="mb-1">`+ username[0].usuario + `</h5> ` + `<h6 class="mb-1">` + xx + `</h6>
                            
                        </div>
                        <p class="mb-1">` + cajaTexto.value + `</p>
                        
                        <hr>
    
                    </div>
                </div> 
            </a>` + [eraseText()];
            } 
        }) 
       
    
    });
});

