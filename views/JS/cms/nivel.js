var listNiveles = {};
var listCursos = [];
var listResources = [];
var stateVideoCmb = null;
$("#btnLevel").click(function(){
    const id_user = JSON.parse(localStorage.getItem("id"));
    Nivel.getAllNiveles(id_user);

    Nivel.getAllCursos(id_user);

   
});

$("#filesNivelCms").on("change",function(e){
   // const image = $('#Cimagen').prop('files');
    var files = e.target.files;
    ///for(var file of files){
        listResources.push(files);
        $("#contResourcesCms").append(`
    <div class="list-group-item"> File : ${files[0].name}</div>
    `)
    //}
    console.log(listResources);
});

$("#btnUrl").click(function(){
    var url = $("#urlInput").val();
    if(url != ""){
        listResources.push({url:url})
    $("#contResourcesCms").append(`
    <div class="list-group-item"> URL : <a target="blank" href="${url}"> ${url} </a></div>
    `)
    $("#urlInput").val("");
    }
    console.log(listResources);
});

function setStateVideoCmb(id){
    stateVideoCmb = id;
    $("#btnVideo").click();
}

$("#formNivel").submit(function (e) {
    e.preventDefault();
    var campos = [];
    const name = $("#Nnivel").val();
    const curso = $("#Ncurso").val();
    const gratis = $('#switchLevel').is(':checked');
    const precio = $("#Lprecio").val();
    campos.push({ campo: " nombre del nivel", value: name });
    campos.push({ campo: " curso", value: curso == "0"? "":curso });
     
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
     
   for(var item of listCursos){
       if(item.id_course == curso){
           if(item.price == null && !gratis){
            Swal.fire(
                {title: 'El curso es gratis, actualiza el precio del curso para ponerle un precio a tu nivel',
                confirmButtonColor: '#141C29',
                icon:'warning'}
               )
            success = false;
           }
       }
   }
    if (success) {
       Nivel.addNivel(curso,name,gratis? "":precio);
    }

});


const Nivel = {
    
    getAllCursos: function (user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/CourseController.php",
            data:{action:"getAllCursosByUserNotPublic",user},
            dataType:"json",
            success: function(resp){
                listCursos = resp;
                $("#Ncurso").html("")
                $("#Ncurso").append(' <option selected value="0">Seleciona el curso</option>')
                resp.map((item)=>{
                    $("#Ncurso").append(`
                    <option value="${item.id_course}">${item.name}</option>
                    `)
                })
                if(stateCursoCmb){
                     $("#Ncurso").val(stateCursoCmb);
                      stateCursoCmb = null
                  }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    addNivel:function(curso,name,price){
        $.ajax({
            type:"POST",
            url:"./../../controllers/LevelController.php",
            data:{action:"addNivel",curso,name,price},
            dataType:"json",
            success: function(resp){
               for(var file of listResources){
                var formData = new FormData();
                formData.append('action',"addNivelResource");
                formData.append("id_level",resp.id);
                if(file.url)
                formData.append("resource",file.url);
                else
                formData.append("resource",file[0]);
                 
                $.ajax({
                    type:"POST",
                    url:"./../../controllers/LevelController.php",
                    enctype: "multipart/form-data",
                    data:formData,
                    dataType:"json",
                    processData: false, 
                    contentType: false ,
                    success: function(data){
                      console.log(data);
                      
                    },
                    error:function(x,y,z){
                         
                        console.error(x,y,z);
                    }
                });
               }
               
               Swal.fire({
                position: 'center',
                icon: 'success',
                html: `Nivel <strong> ${name} </strong> agregado`,
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                window.location.reload()
              }).catch((err) => {
                  console.error(err)
              });
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
   
    getAllNiveles: function (user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/LevelController.php",
            data:{action:"findAll",user},
            dataType:"json",
            success: function(resp){
                listNiveles = resp;
                $("#tableNivel").html("")
                var i = 0;
                resp.map((item)=>{
                    i++
                    $("#tableNivel").append(`
                    <tr>
                                            <td>${i}</td>
                                            <td>${item.name}</td>
                                            <td>${item.curso} </td>
                                            <td> ${item.price?  "$ " + item.price:"Gratis"} </td>
                                            <td><button onclick="setStateVideoCmb(${item.id_level})"  class="btn  btn-sm btn-primary" onclick="toggleNav('video')"><i
                                                        class="fas fa-plus"></i> Agregar Video</button></td>
                                           
                                            <td><button onclick="Nivel.deleteNivel(${item.id_level},'${item.name}')" class="btn  btn-sm btn-danger"> <i class="fas fa-trash-alt"></i>
                                                    Eliminar</button></td>
                                        </tr>
                    `)
                });
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    deleteNivel: function(id,name){
       
        Swal.fire({
            title: '¿Estas seguro?',
            html: `¿Quieres eliminar el nivel <strong> ${name} </strong> ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type:"GET",
                    url:"./../../controllers/LevelController.php",
                    data:{action:"eliminarNivel",id},
                    dataType:"json",
                    success: function(resp){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `Nivel ${name} eliminado`,
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

}