const id_user = JSON.parse(localStorage.getItem("id"));
 
$(document).ready(function () {

    var vars = {};
var progrss = null;
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });

  if(vars.o == "h"){
    $(".division1").addClass("d-none");
    $(".division2").removeClass("d-none");
  }

    const createdAt = localStorage.getItem("created_at").substr(0, 10);
    const avatar = JSON.parse(localStorage.getItem("avatar"))
    const name = localStorage.getItem("name");
    const birth = localStorage.getItem("date_birth");
    const email = localStorage.getItem("email");
    const pass = localStorage.getItem("password");
    const gender = JSON.parse(localStorage.getItem("gender"));
    const isStudent = localStorage.getItem("is_student");
    $("#nameUser").html(localStorage.getItem("name"));
    $("#createdAt").html(`Cuenta creada en: ${createdAt}`);
    $('#avatar').attr("src", avatar == null || avatar == "" ? "./../IMG/user.png" : `data:${typeImage};base64,${avatar}`);
    $("#nameP").val(name);
    $("#emailP").val(email);
    $("#passwordP").val(pass);
    $("#genderP").val(gender === null ? "" : gender);
    $("#birthdaytime").val(birth)

    $("#isStudent").html(isStudent == "0" ? "Profesor" : "Estudiante")
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $("#boton0").on('click', function () {
        $(".division1").removeClass("d-none");
        $(".division2").addClass("d-none");
    });



    $("#boton1").on('click', function () {
        $(".division1").removeClass("d-none");
        $(".division2").addClass("d-none");
    });

    $("#boton2").on('click', function () {
        $(".division1").addClass("d-none");
        $(".division2").removeClass("d-none");
    });

 
   

});


/////////////////////////// USER UPDATE

$("#formularioCuenta").submit( function (e) {
    e.preventDefault();
    var name = document.getElementById("nameP").value;
    var email = document.getElementById("emailP").value;
    var password = document.getElementById("passwordP").value;
    var gender = document.getElementById("genderP").value;
    var birth = document.getElementById("birthdaytime").value;
    var avatar = $('#updateAvatar').prop('files');
    var ps = validar_clave(password);
    var boolean = true;
    if (ps == false || password == "") {
        toastr.error('Error', 'Contraseña debe tener al menos 8 caracteres,un numero y un caracater raro');
        boolean = false;
    }
    if (email == "" || name == "") {
        toastr.error('Error', 'Llena los campos correctamente');
        boolean = false;
    }
    if (avatar.length > 0) {
        if (!(avatar[0].type == "image/jpg" || avatar[0].type == "image/png" || avatar[0].type == "image/jpeg")) {
            toastr.error('Error', 'Solo se aceptan imagenes .jpg y .png');
            boolean = false;

        }
    }
    if (boolean == true) {
        var id = JSON.parse(localStorage.getItem("id"));
        //var type = avatar.length == 0 ? null : avatar[0].type;
        avatar = avatar.length == 0 ? null : avatar[0] ;
        //var files = avatar; //$('#updateAvatar')[0].files[0];
        var formData = new FormData();
        formData.append('method',"PUT");
        formData.append('id',id);
        formData.append('avatar',avatar);
        formData.append('name',name);
        formData.append('pass',password);
        formData.append('email',email);
        formData.append('gender',gender);
        formData.append('birth',birth);
        
        $.ajax({
            type: "POST",
            url: "./../../controllers/UserController.php",
            enctype: "multipart/form-data",
            data: formData, 
            dataType:"json",
            processData: false, 
            contentType: false ,
            success: function (response) {
                if (response.name) {
                    
                    toastr.info('Bien', 'Perfil actualizado');
                    setUser(response);
                    setTimeout(function () { location.reload(); }, 700);
                } else {
                    
                    toastr.error('Error', 'Error al actualizar usuario');
                }
            },
            error: function (x, y, z) {
                
                toastr.error('Error', 'Eror interno al actualizar usuario');
            }
        });

    }


})

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function  showImage(){
    var avatar = $('#updateAvatar').prop('files');
    var image = await toBase64(avatar[0]);
     
    $('#avatar').attr("src",image);
}

function validar_clave(password) {

    if (password.length >= 8) {

        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {

                mayuscula = true;
            } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {

                minuscula = true;
            } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {

                numero = true;
            }
            else {
                caracter_raro = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
            return true;
        }
    }
    return false;
}

function setUser(user) {
    // localStorage.setItem("id",user.id_user);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.pass);
    localStorage.setItem("is_student", user.is_student);
    localStorage.setItem("created_at", user.created_at);
    localStorage.setItem("updated_at", user.updated_at);
    localStorage.setItem("type_image", JSON.stringify(user.type_image));
    localStorage.setItem("avatar", JSON.stringify(user.avatar));
    localStorage.setItem("gender", user.gender);
    localStorage.setItem("date_birth", user.date_birth);
}


  $.ajax({
    type:"POST",
    url:"./../../controllers/CourseController.php",
    data:{action:"obtenerHistorial",userId:id_user},
    dataType:"json",
    success:function(resp){
        for(var item of resp){
            let currentDateCurso = new Date(item.creacion);
            let dateCurso = currentDateCurso.toLocaleDateString();
            let currentDateLevel = new Date(item.lastDateLevel);
            let dateLevel = currentDateLevel.toLocaleDateString();
            let concluidoDate= new Date(item.concluido);
            let dateShortConcluido = concluidoDate.toLocaleDateString();
            console.log(resp);
            $("#agregaCursos").append(`
            <div class="col-lg-12 col-md-12 col-sm-12 row pb-3"
            style="border:rgb(48, 16, 16) 1px !important; border-style: 1px !important;">
            <div class="col-lg-4">
                <img class="shadow card-img-right" alt="" style="width: 300px; height:213px;"
                    src="${"data:"+item.tipo + ";base64,"+item.imagen}" data-holder-rendered="true">
            </div>
            <div class="col-lg-8">
                <div class="text-muted h5">Adquirido : ${dateCurso}</div>
                <div class="text h5">${item.concluido?"Concluido: "+dateShortConcluido:""}</div>
                <h5 class="mb-0" id="obtenerCategoriaU${item.idCurso}">
                   
                </h5>
            
                <p class="card-text mb-auto" style="font-size: 15px;">${item.descripcionCurso}</p>
                <div class="text-center">
                    <span class=" mx-auto">Progreso del curso : ${item.porcentaje}%</span>
                </div>
            
                <div class="progress mx-auto" style="width: 500px;">
                    <div class="progress-bar" role="progressbar" style="width: ${item.porcentaje}%"
                        aria-valuenow="${item.porcentaje}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="text-center">
                    <button type="button" onclick="location.href = 'curso.php?curso=${item.idCurso}'"
                        class="btn btn-dark  btn-lg mt-2  justify-content-center"
                        style="width:150px; font-size: 17px;">Ver
                        curso</button>
                    <button type="button" onclick="location.href = 'Certificado.html?curso=${item.idCurso}'"
                        class="btn btn-dark ${item.porcentaje == 100? "":"d-none"}  btn-lg mt-2 justify-content-center"
                        style="width:150px; font-size: 17px;"> Ver certificado </button>
                </div>
            
            
            
            
            </div>
            
            </div>
            <hr class="w-100"/>
               
                <div class=" w-75 align-items-center d-flex justify-content-between"> 
                <div class="h5 m-0  d-flex align-items-center">${item.lastNameLevel?"Continuar viendo: "+item.lastNameLevel:"No has visto niveles" }
                <div class="text-muted my-0 mx-2 h6" >${item.lastDateLevel?dateLevel:""}</div>
                </div> 
                 <button type="button" onclick="location.href = 'video.php?nivel=${item.idNivelLast}&curso=${item.idCurso}'"
                class="btn btn-dark ${item.idNivelLast?"":"d-none"}  btn-lg justify-content-center"
                style="width:150px; font-size: 17px;">
                Ver Nivel</button>   </div>
            <hr class="w-100"/>
            `);
            var curso = item.idCurso;
             console.log(curso);
            $.ajax({
                type:"GET",
                url:"./../../controllers/CategoryController.php",
                data:{action:"getCategoriasByCurso",curso:curso},
                dataType:"json",
                async:false,
                success:function(resp2){
                     
                  console.log(resp2)
                  for( var item2 of resp2){

                    $("#obtenerCategoriaU"+item.idCurso).append(`<a class="text-dark" href="categorias.php?categoria=${item2.id_category}">${item2.name + "  "}</a>`);
                  }
                   
                  
               
                },
                error:function (x,y,z){
                   
                
                  
                }
              })




          }
        
      
 
    },
    error:function (x,y,z){
        
      //location.href = "index.php"
      
    }
  })



