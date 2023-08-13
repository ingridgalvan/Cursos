var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });
let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

var _categoria = null;
var _desde =`1970/${month}/${day}`;
var _a = `${year + 1}/${month}/${day}`;
var _by = null;
var _buscar = null;



if(vars.b){
_buscar = vars.b;
$("#b_buscar").val(_buscar)
}
if(vars.categoria){
_categoria = vars.categoria;
$("#b_categoria").val(_categoria)
}

if(vars.desde){
_desde = vars.desde;
$("#b_desde").val(_desde)
$("#desdeDate").val(_desde)
}

if(vars.a){
_a = vars.a;
$("#b_a").val(_a)
$("#aDate").val(_a)
}

if(vars.by){
_by = vars.by;
if(_by == 1){
    $('#isByCurso').attr("checked","true")
}
if(_by == 2){
    $('#isByUser').attr("checked","true");
}
$("#b_option").val(_by)
}




function dateValidate(){
    var desde = _desde;
    var a = _a;

    var dateDesde = new Date(desde);
    var dateA = new Date(a);
    
    if(dateA < dateDesde){
        toastr.warning("Cuidado","Fechas deben estar en un rango")
        return true;
    }
    return false;
}


    $.ajax({
        type:"GET",
        url:"./../../controllers/CategoryController.php",
        data:{action:"findAll"},
        dataType:"json",
        success: function(resp){
             
            $("#Ccategoria").html("")
          resp.map((item)=>{
              $("#inputState").append(`
              <option  value="${item.id_category}"> ${item.name} </option>
              `)
          })
          if(_categoria){
            $("#inputState").val(_categoria)
          }
        },
        error:function(x,y,z){
            
        }
    });

    const numberWithCommas = (
        number
    )=>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    if(!dateValidate()){
$.ajax({
    type:"GET",
    url:"./../../controllers/BuscarController.php",
    data:{action:"buscar",
    buscar:_buscar,
    categoria:_categoria,
    desde:_desde,
    a:_a,
    by:_by
},dataType:"json",
    success: function(resp){
        console.log(resp);
    if(resp){
        var rows = Math.trunc( resp.length / 4) + 1;
        for(var i = 0; i < rows ; i++ ){
            $("#contSearchCursos").append(
                `<div class="row" id="row${i}"> </div>`
            )
            let temp = (i+1) * 4;
            let init = (i) * 4;
            for(var j = init; j < temp && j < resp.length ; j++ ){
                var item = resp[j];
                var d = new Date(item.created_at);
                const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                


                  var month = months[d.getMonth()];
                  var day = d.getDate();
                  console.log(d);
                $("#row" + i).append(
                    `   <div class="col-lg-3 col-md-3 col-sm-6">
                    <div class="product-grid">
                        <div class="product-image">
                            <a href="curso.php?curso=${item.id_course}">
                                <img class="pic-1" src="data:${item.type_image};base64,${item.image}">
    
                            </a>
                            <ul class="social">
                                <li><a href="curso.php?curso=${item.id_course}" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
                                
                            </ul>
                            <span class="product-new-label">Sale</span>
                        </div>
                       
                        <div class="product-content">
                            <h3 class="title"><a href="curso.php?curso=${item.id_course}">${item.title}</a></h3>
                            <h3 class="title"><a href="curso.php?curso=${item.id_course}">${day +"/"+month+"/"+d.getFullYear()}</a></h3>
                            <div class="price pb-2 ${item.price?"":"text-success"}" >${ item.price? "$" + numberWithCommas(item.price) + "MXN":"Gratis"}
                            </div>
                        </div>
                    </div>
                </div>`
                )
            }
        }
        
    }else{
        $("#contSearchCursos").append(
            `<h2 class="mt-3"> No se encontraron cursos con  ${_buscar?"'"+_buscar+"'":"tu busqueda"} </h2>`
        )
    }
    if(resp.length == 0){
        $("#contSearchCursos").append(
            `<h2 class="mt-3"> No se encontraron cursos con  ${_buscar?"'"+_buscar+"'":"tu busqueda"} </h2>`
        )
    }
    },
    error:function(x,y,z){
        $("#contSearchCursos").append(
            `<h2 class="mt-3"> No se encontraron cursos con  ${_buscar?"'"+_buscar+"'":"tu busqueda"} </h2>`
        )
    }
});

    }

$("#inputState").change(function(){
    _categoria = $("#inputState").val();
    $("#b_categoria").val(_categoria);
})

$("#b_buscar").change(function(){
    _buscar = $("#b_buscar").val();
    console.log(_buscar);
})

$("#desdeDate").change(function(){
    _desde = $("#desdeDate").val();
    $("#b_desde").val(_desde);
    dateValidate()
      
})

$("#aDate").change(function(){
    _a = $("#aDate").val();
    $("#b_a").val(_a);
    dateValidate()
})

$("#isByCurso").change(function(){
    if($('#isByCurso').is(':checked')){
        _by = 1;
        $("#b_option").val(_by);
    }
    
})

$("#isByUser").change(function(){
    if($('#isByUser').is(':checked')){
        _by = 2;
        $("#b_option").val(_by);
    }
    
})

$("#btnRefresh").click(function(){
    $("#b_categoria").val("0");
    $("#inputState").val("0");
    $("#b_desde").val("")
    $("#desdeDate").val("")
    $("#b_a").val("")
    $("#aDate").val("")
    $("#b_option").val("")
    $('#isByCurso').prop("checked",false)
    $('#isByUser').prop("checked",false);
})