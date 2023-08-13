var listCursos = [];
var isCursoUpdate = false;
var currentCurso = 0;
var stateCursoCmb = null;
$("#btnCourse").click(function(){
    $.ajax({
        type:"GET",
        url:"./../../controllers/CategoryController.php",
        data:{action:"findAll"},
        dataType:"json",
        success: function(resp){
             
            $("#Ccategoria").html("")
          resp.map((item)=>{
              $("#Ccategoria").append(`
              <option value="${item.id_category}"> ${item.name} </option>
              `)
          })
        },
        error:function(x,y,z){
            
        }
    });
    const id_user = JSON.parse(localStorage.getItem("id"));
    getAllCursos(id_user);
});

$("#formCurso").submit(function (e) {
    e.preventDefault();
    var campos = [];
    const curso = $("#Ccurso").val();
    const description = $("#Cdescription").val();
    const categoria = $('#Ccategoria').val();
    const image = $('#Cimagen').prop('files');
    const gratis = $('#switch').is(':checked');
    const precio = $("#Cprecio").val();
    campos.push({ campo: " nombre de curso", value: curso });
    campos.push({ campo: " descripcion", value: description });
    campos.push({ campo: " categoria", value:  categoria.length == 0 ? "" : categoria });
    campos.push({ campo: "imagen", value: image.length == 0 ? "" : image.length });
    if (!gratis && precio == "") {
        campos.push({ campo: " precio", value: "" });
    } else {
        campos.push({ campo: " precio", value: "validate" });
    }
    var success = true;
    for (campo of campos) {
        if (campo.value == "") {
            toastr.error('Error', `El campo ${campo.campo} es requerido`);
            success = false;
        }
    }
    if (success) {
        const id_user = JSON.parse(localStorage.getItem("id"));
        if(!isCursoUpdate)
        addCurso(image,curso,description,gratis? "":precio,id_user,categoria);
        else
        updateCurso(image,curso,description,gratis? "":precio,id_user,categoria);
    }

});

function addCurso(image,name,description,price,user,categoria){
    var formData = new FormData();
        formData.append('image',image[0]);
        formData.append('action',"addCurso");
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('user',user);
         
    $.ajax({
        type:"POST",
        enctype: "multipart/form-data",
        url:"./../../controllers/CourseController.php",
        data:formData,
        dataType:"json",
        processData: false, 
        contentType: false ,
        success: function(resp){
           for(item of categoria){
            addCursoCategoria(resp.id,item)
           }
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Curso ${name} agregado`,
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.reload()
          }).catch((err) => {
              console.error(err)
          });
         
        },
        error:function(x,y,z){
        }
    });
}

function updateCurso(image,name,description,price,user,categoria){
    var formData = new FormData();
        formData.append('image',image[0]);
        formData.append('action',"updateCurso");
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('user',user);
        formData.append('curso',currentCurso);
     
    $.ajax({
        type:"POST",
        enctype: "multipart/form-data",
        url:"./../../controllers/CourseController.php",
        data:formData,
        dataType:"json",
        processData: false, 
        contentType: false ,
        success: function(resp){
           for(item of categoria){
            addCursoCategoria(resp.id,item)
           }
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Curso ${name} agregado`,
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.reload()
          }).catch((err) => {
              console.error(err)
          });
         
        },
        error:function(x,y,z){
        }
    });
}

function addCursoCategoria(curso,categoria){
    $.ajax({
        type:"POST",
        url:"./../../controllers/CategoryController.php",
        data:{action:"addCategoriaCurso",curso,categoria},
        dataType:"json",
        success: function(resp){
        },
        error:function(x,y,z){
        }
    });
}

function getAllCursos(user){
    $.ajax({
        type:"GET",
        url:"./../../controllers/CourseController.php",
        data:{action:"getAllCursosByUser",user},
        dataType:"json",
        success: function(resp){
             
            listCursos = resp;
            $("#tableShowCursos").html("");
            var i = 0;
            resp.map((item)=>{
                i++;
                $("#tableShowCursos").append(`
                <tr>
                <td>${i}</td>
                <td>${item.name}</td>
                <td> ${item.price? "$ " + item.price:"Gratis"} </td>
                <td><button onclick="setStateNivelCmb(${item.id_course})" ${item.is_public == 1?"disabled":""} class="btn btn-sm btn-primary" onclick="toggleNav('nivel')"><i
                            class="fas fa-plus"></i> Agregar Nivel</button></td>
                <td><button onclick="publicarCurso(${item.id_course},${item.count})" ${item.is_public == 1?"disabled":""} class="btn btn-sm btn-secondary"><i
                            class="fas fa-globe-americas"></i> Publicar</button></td>
                <td> <button onclick="prepareUpdate(${item.id_course})" class="btn  btn-sm btn-info"> <i class="fas fa-pen"></i>
                        Editar</button> </td>
                <td><button onclick="deleteCurso(${item.id_course})" class="btn btn-sm btn-danger"> <i class="fas fa-trash-alt"></i>
                        Eliminar</button></td>
                 </tr>
    
                `);
            })
        },
        error:function(x,y,z){
             
            console.error(x,y,z);
        }
    });
}

function setStateNivelCmb(id){
    stateCursoCmb = id;
     
    $("#btnLevel").click();
}

function prepareUpdate(id){
    currentCurso = id;
    isCursoUpdate = true;
    $("#btnAddCurso").val("Actualizar")
    var curso = {};
    for(item of listCursos){
        if(item.id_course == id ){
            curso = item;
        }
    }
    $("#Ccurso").val(curso.name);
    $("#Cdescription").val(curso.description);
    if(curso.price == null){
        $('#switch').prop("checked",true);
        $('#Cprecio').attr('disabled', true);
        $("#Cprecio").val("")
    }else{
        $('#switch').prop("checked",false);
        $('#Cprecio').removeAttr('disabled');
        $("#Cprecio").val(curso.price);
    }
    Swal.fire(
        {title: 'Cuidado',
        html:'Si pones tu curso gratis todos los niveles se harán gratis',
        confirmButtonColor: '#141C29',
        icon:'warning'}
       )
    
}

function deleteCurso(id){
    var curso = {};
    for(item of listCursos){
        if(item.id_course == id ){
            curso = item;
        }
    }
    Swal.fire({
        title: '¿Estas seguro?',
        html: `¿Quieres eliminar el curso <strong> ${curso.name} </strong> ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type:"GET",
                url:"./../../controllers/CourseController.php",
                data:{action:"eliminarCurso",user:id},
                dataType:"json",
                success: function(resp){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Curso ${curso.name} eliminado`,
                        showConfirmButton: false,
                        timer: 1500
                      }).then((result) => {
                        window.location.reload()
                      }).catch((err) => {
                          console.error(err)
                      });
                },
                error:function(x,y,z){
                }
            });
         
        }
      })
}

function publicarCurso(id,count){
    var curso = {};
    for(item of listCursos){
        if(item.id_course == id ){
            curso = item;
        }
    }
    if(count > 0){
        Swal.fire({
            title: '¿Estas seguro?',
            html: `Si publicas este curso, ya no podrás agregar niveles ni videos`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Publicar'
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type:"GET",
                    url:"./../../controllers/CourseController.php",
                    data:{action:"publicarCurso",user:id},
                    dataType:"json",
                    success: function(resp){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `Curso ${curso.name} publicado`,
                            showConfirmButton: false,
                            timer: 1500
                          }).then((result) => {
                            window.location.reload()
                          }).catch((err) => {
                              console.error(err)
                          });
                    },
                    error:function(x,y,z){
                    }
                });
             
            }
          })
    }else{
        Swal.fire(
           {title: 'No se puede publicar',
           html:'Agrega videos a este curso para publicarlo',
           confirmButtonColor: '#141C29',
           icon:'error'}
          )
    }
   
}