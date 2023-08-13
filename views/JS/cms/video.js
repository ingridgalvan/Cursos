
var nivelesCursosList = [];
$("#btnVideo").click(function(){
    const id_user = JSON.parse(localStorage.getItem("id"));
    Video.getAllNiveles(id_user)
    Video.getAllVideos(id_user)
});

$("#Vcurso").on("change",function(){
    var filter = $("#Vcurso").val()
    $("#Vnivel").html(` <option selected value="0">Seleciona el curso</option>`)
   
    for (var item of nivelesCursosList) {
     
        if (item.id_course == filter) {
            $("#Vnivel").append(`
            <option  value="${item.id_level}">${item.name}</option>
        `);
        }
    }
    
   if(stateVideoCmb){
    $("#Vnivel").val(stateVideoCmb);
    stateVideoCmb = null;
   }
})



$("#formVideo").submit(function (e) {
    e.preventDefault();
    var campos = [];
    const name = $("#Vname").val();
    const curso = $("#Vcurso").val();
    const nivel = $("#Vnivel").val();
    const video = $('#Vvideo').prop('files');

    campos.push({campo:" titulo del video", value:name});
    campos.push({campo:" curso", value: curso == "0" ? "" : curso});
    campos.push({campo:" nivel", value: nivel == "0" ? "" : nivel});
    campos.push({campo:" video ", value:video.length == 0 ? "": video.length});

   
    var success = true;
    for(campo of campos){
        if(campo.value == ""){
            toastr.error('Error', `El campo ${campo.campo} es requerido`);
        success = false;
        }
    }
    if(success){
       // toastr.success('Bien', 'Curso registrado');
       Video.addVideo(name,nivel,video);
    }
    
})

const Video = {
    getAllNiveles: function (user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/LevelController.php",
            data:{action:"findAll",user},
            dataType:"json",
            success: function(resp){
                nivelesCursosList = resp;
                $("#Vcurso").html(` <option selected value="0">Seleciona el curso</option>`)
                var lookup = {};
               
                var result = [];

                for (var item, i = 0; item = nivelesCursosList[i++];) {
                    var name = item.id_course;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({id_course:item.id_course,curso:item.curso});
                    }
                }
                
                for(var item of result){
                    $("#Vcurso").append(`
                    <option  value="${item.id_course}">${item.curso}</option>
                `);
                }
                
                if(stateVideoCmb){
                    for(var item of nivelesCursosList){
                        if(item.id_level == stateVideoCmb){
                            $("#Vcurso").val(item.id_course).change();
                        }
                    }
                   
                 }
               
               console.log(resp);
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    addVideo: function(name,nivel,video){
        var formData = new FormData();
        formData.append('video',video[0]);
        formData.append('action',"addVideo");
        formData.append('title',name);
        formData.append('nivel',nivel);
        formData.append("path",uuidv4())
         debugger
         $("#uploadVideo").removeClass("d-none");
    $.ajax({
        type:"POST",
        enctype: "multipart/form-data",
        url:"./../../controllers/VideoController.php",
        data:formData,
        processData: false, 
        contentType: false ,
        success: function(resp){
            $("#uploadVideo").addClass("d-none");
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Video ${name} agregado`,
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.reload()
          }).catch((err) => {
              console.error(err)
          });
         
        },
        error:function(x,y,z){
            console.error(x)
            $("#uploadVideo").addClass("d-none");
            Swal.fire(
                'Error',
                'Intentelo de nuevo',
                'error'
              )
        }
    });
    },
    getAllVideos: function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/VideoController.php",
            data:{action:"findAllVideosByUser",user},
            dataType:"json",
            success: function(resp){
              $("#tableVideos").html("")
              var i =0;
              resp.map((item)=>{
                  i++;
                $("#tableVideos").append(`
                <tr>
                <td>${i}</td>
                <td>${item.video}</td>
                <td>${item.level}</td>
                <td>${item.curso}</td>
                
                <td><button onclick="Video.deleteVideo(${item.id_video},'${item.video}')" class="btn btn-sm btn-danger"> <i class="fas fa-trash-alt"></i>
                        Eliminar</button></td>
                </tr>
                `)
              })
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    deleteVideo: function(id_video,video){
        Swal.fire({
            title: '¿Estas seguro?',
            html: `¿Quieres eliminar el video <strong> ${video} </strong> ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
             $.ajax({
            type:"GET",
            url:"./../../controllers/VideoController.php",
            data:{action:"eliminarVideoById",id_video},
            success: function(resp){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Video ${video} eliminado`,
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
          }
         })
    }
}