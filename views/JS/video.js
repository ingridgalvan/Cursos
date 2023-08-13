var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });
const id_user = JSON.parse(localStorage.getItem("id"))

var vid = document.getElementById("srcVideo");
vid.onplay = function() {
    setTimeout(function(){
      toastr.success( 'Progreso Guardado','Bien!');
      Video.progreso()
    },5000)
};
var videoDefault = {};
const Video = {
    getVideo: function(){
        $.ajax({
            type:"GET",
            url:"./../../controllers/VideoController.php",
            data:{action:"getVideo",id:vars.video},
            dataType:"json",
            success:function(resp){
              
              $("#srcVideo").append(`
              <source src="${"./../.." + resp.path}" type="${resp.type}" >
              `)
              $("#titleVideo").html(resp.title)
            },
            error:function (x,y,z){
               
              console.error(x.responseText);
              window.location.href = "notfound.php"
            }
          })
    },
    getResources: function(){
      $.ajax({
        type:"POST",
        url:"./../../controllers/VideoController.php",
        data:{action:"getResources",id:vars.nivel},
        dataType:"json",
        success:function(resp){
           console.log(resp);
          if(resp ){
              for(var item of resp){
                if(item.url == null){
                  $("#contResources").append(`
                  <li class="list-group-item" style="background-color: rgb(71, 67, 67);">
                  <span class="float-left">${item.nombre}</span>  <a  download="${item.type}" href="${"data:" + item.type + ";base64," + item.resource}" class="btn-hover float-right p1p btn button mt-0 ml-1" 
                  style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: small;">Descargar</a>
                 </li>
                  `)
                }else{
                  $("#contResources").append(`
                  <li class="list-group-item" style="background-color: rgb(71, 67, 67);">
                  <span class="float-left">${item.url.substring(0,20) + "..."}</span> 
                   <a target="blank" href="${item.url}" class="btn-hover float-right p1p btn button mt-0 ml-1 "  
                  style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: small;">Ver</a>
                 </li>
                  `)
                }
              }
          }
         
        },
        error:function (x,y,z){
           
          console.error(x.responseText);
          window.location.href = "notfound.php"
        }
      })
    },
    progreso: function(){
      $.ajax({
        type:"POST",
        url:"./../../controllers/VideoController.php",
        data:{action:"setProgress",id:vars.video,user:id_user},
        success:function(resp){
          
          $("#showProgress").html(`
            <p class="text-success"><i class="fas fa-check"></i> Progreso Actualizado</p>
          `)
       
        },
        error:function (x,y,z){
           
          console.error(x.responseText);
        }
      })
    },
    getVideoByLevel: function(){
      $.ajax({
        type:"POST",
        url:"./../../controllers/VideoController.php",
        data:{action:"getVideosByLevel",id:vars.nivel},
        dataType:"json",
        async:false,
        success:function(resp){
           console.log(resp);
           if(resp ){
            for(var item of resp){
             
                $("#contVideos").prepend(`
                <li class="list-group-item" style="background-color: rgb(71, 67, 67);">
                <span class="float-left">${item.title}</span>  <a   href="video.php?video=${item.id_video}&nivel=${vars.nivel}&curso=${vars.curso}" class="btn-hover text-ligth float-right  btn button mt-0 ml-1" 
                style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: small;">Ver</a>
               </li>
                `)
               
              videoDefault=item;
            }
        }
        },
        error:function (x,y,z){
           
          console.error(x.responseText);
          window.location.href = "notfound.php"
        }
      })
    },
}

if(vars.video){
    Video.getVideo()
    if(vars.nivel){
      Video.getVideoByLevel()
    }
    if(vars.curso){
      $("#btnBackCurso").attr("href",`curso.php?curso=${vars.curso}`)
    }
}else if (vars.nivel){
  Video.getVideoByLevel();
  console.log(videoDefault);
  $("#srcVideo").append(`
  <source src="${"./../.." + videoDefault.path}" type="${videoDefault.type}" >
  `)
  $("#titleVideo").html(videoDefault.title);
  if(vars.curso){
    $("#btnBackCurso").attr("href",`curso.php?curso=${vars.curso}`)
  }
}else{
  window.location.href = "notfound.php"
}

Video.getResources()