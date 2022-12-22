var imagenesFiltrada = $(".box-img");
var pagina = 0;
var paginador;            //Referencia el elemento
var totalPaginas;         //Paginaciones
var itemsPorPagina = 24;   //Imágenes a mostrar en cada paginación

$(document).ready(function () {
    imagenesFiltrada.slice(24,imagenesFiltrada.length).hide();
    crearPaginador(imagenesFiltrada.length)
    filtrar();    
});

function filtrar(){    
    $(".btn-menu").click(function(){
        let filtro = $(this).attr("data-filter");
        pagina = 0;
        $(".box-img").not("."+filtro).hide();
        if (filtro == "todos"){             
            imagenesFiltrada = $(".box-img")            
        } else {
            imagenesFiltrada = $(".box-img").filter("."+filtro)
        }
        imagenesFiltrada.slice(0,24).show();
        crearPaginador(imagenesFiltrada.length);
    })
}

function crearPaginador(totalItems){
    $(".page-item").remove();
    paginador = $(".pagination"); //Obtener la referencia el elemento
    totalPaginas = Math.ceil(totalItems/itemsPorPagina); //Calcular el numero de paginas para el paginador            
    //PAGINACIÓN START
    $('<li class="page-item"><a href="#" aria-label="Previous" class="prev_link"><span aria-hidden="true"><</span></a></li>').appendTo(paginador); //Enlace que lleva a la página previa
    var pag = 0;
    while(totalPaginas > pag){
        $('<li class="page-item page'+(pag+1)+'"><a href="#" class="page-link">'+(pag+1)+'</a></li>').appendTo(paginador);
        pag++;
    }
    $('<li class="page-item"><a href="#" aria-label="Next" class="next_link"><span aria-hidden="true">></span></a></li>').appendTo(paginador); //Enlace que lleva a la página siguiente
    paginador.find(".page-link:first").parents("li").addClass("active"); //Añade la clase "active" al primer elemento de la lista de enlaces del paginador
    //PAGINACIÓN END
    
    //Carga la página al hacer click en el enlace    
    paginador.find("li .page-link").click(function(){
        pagina =$(this).html().valueOf() - 1;
        cargarImagenes(pagina, imagenesFiltrada);
        console.log("en la que doy clic",pagina)
        return false;
    });

    //Añadir clase active
    $(".page-link").click(function () { 
        paginador.find(".active").removeClass("active");
        $(this).closest(".page-item").addClass("active");
    });

    //Carga la página previa    
    paginador.find("li .prev_link").click(function(){
        if(pagina > 0){
            pagina -= 1;
            paginador.find(".active").removeClass("active");
            paginador.find(".page"+(pagina+1)).addClass("active")
            cargarImagenes(pagina, imagenesFiltrada);
            console.log("previa ", pagina)        
        }else{
            cargarImagenes(pagina, imagenesFiltrada);
        }
        return false;
    });
    
    //Carga la siguiente página    
    paginador.find("li .next_link").click(function(){
        if(pagina < totalPaginas - 1){
            pagina += 1;
            paginador.find(".active").removeClass("active");
            paginador.find(".page"+(pagina+1)).addClass("active")            
            cargarImagenes(pagina, imagenesFiltrada);
            console.log("sig",pagina)
        }else{
            cargarImagenes(pagina, imagenesFiltrada);
        }
        return false;
    });
    
}

function cargarImagenes(pagina, imagenesFiltrada){      
    imagenesFiltrada.hide();
    imagenesFiltrada.slice(pagina * itemsPorPagina, ((pagina + 1) * itemsPorPagina)).show();
}