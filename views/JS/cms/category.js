var _categoriasCms = [];

$("#formCategoria").submit(function (e) {
    e.preventDefault();
    var campos = [];
    const name = $("#Catname").val();
    const description = $("#Catdescription").val();
    const id_user = JSON.parse(localStorage.getItem("id"));
    
    campos.push({campo:" nombre de categoria", value:name});
    campos.push({campo:" descripcion de la categoria", value:description});

   
    var success = true;
    for(campo of campos){
        if(campo.value == ""){
            toastr.error('Error', `El campo ${campo.campo} es requerido`);
        success = false;
        }
    }
    for(var i = 0; i < _categoriasCms.length; i++){
        if(name == _categoriasCms[i].name){
            toastr.error('Error', `Esta categoria ya existe`);
            success = false;
        }
    }
    if(success){
       
        $.ajax({
            type:"POST",
            url:"./../../controllers/CategoryController.php",
            data:{action:"addCategory",name,description,id_user},
            dataType:"json",
            success: function(resp){
               showCategories(resp)
                $("#Catname").val("");
                $("#Catdescription").val("");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Categoria ${name} agregada`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            },
            error:function(x,y,z){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: '#141C29',
                    text: 'Error al agregar categoria. Vuelvelo a intentar'
                  })
            }
        });

       
    }
    
});

$("#btnCategory").click(function(){
    $.ajax({
        type:"GET",
        url:"./../../controllers/CategoryController.php",
        data:{action:"findAll"},
        dataType:"json",
        success: function(resp){
            console.log(resp);
            if(resp.length > 0){
                _categoriasCms = resp;
            }
           showCategories(resp)
           
        },
        error:function(x,y,z){
           
        }
    });
});

function showCategories(categories){
    $("#tableShowCategories").html("");
    var i = 0;
    for(var category of categories ){
        i++
        $("#tableShowCategories").append(`
        <tr>
            <td>${i}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
        </tr>
        `)
    }
}