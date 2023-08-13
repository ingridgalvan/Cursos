toastr.options.closeButton = true
////////////////Iniciar sesion
$("#rertol").submit(function (e) {
    e.preventDefault();

    var email = document.getElementById("emaili").value;
    var password = document.getElementById("passwordi").value;
    var ps = validar_clave(password);
    var boolean = true;

    if (ps == false || password == "") {

        toastr.error('Error', 'Ingresa la contraseña correctamente')
        boolean = false
    }
    if (email == "") {

        toastr.error('Error', 'Ingresa el usuario correctamente')
        boolean = false
    }
    if (boolean == true) {

        
        $.ajax({
            type: "POST",
            url: "./../../controllers/AuthController.php",
            contentType: "application/json",
            data: JSON.stringify({user:email,pass:password}),
            dataType: "json",
            success: function (response) {
                if(response.name ){
                    setUser(response);
                    location.reload(); 

                }else{
                    toastr.error('Error', 'El usuario ya existe');
                }
            },
            error:function(x,y,z){
                toastr.error('Error', 'El usuario y la contraseña no coinciden');
            }
        });

    }



})








$("#rerto").submit(function (e) {
    e.preventDefault();

    var name = document.getElementById("nombrer").value;
    var email = document.getElementById("emailr").value;
    var password = document.getElementById("passwordr").value;
    var Estudiante = document.getElementById("tipoest").value;
  
    var ps = validar_clave(password);
    var boolean = true;

    if (ps == false || password == "") {
        toastr.error('Error', 'Ingresa la contraseña correctamente')
        boolean = false;
    }
    if (email == "" || name == "") {
        toastr.error('Error', 'Llena bien los campos')
        boolean = false;
    }
    if ((Estudiante == null)) {
        toastr.error('Error', 'Selecciona una opcion')
        boolean = false;
    }
    if (boolean == true) {
        //toastr.success('Bien', 'Te has registrado correctamente');
        $.ajax({
            type: "POST",
            url: "./../../controllers/UserController.php",
            data: {method:"POST",name,email,pass:password,isStudent:Estudiante},
            dataType: "json",
            success: function (response) {
                if(response.name){
                    toastr.success('Bien', 'Cuenta creada');
                    setUser(response);
                    setTimeout(function(){ location.reload(); }, 700);
                }else{
                    toastr.warning('Cuidado', 'El usuario ya existe');
                }
            },
            error:function(x,y,z){
                toastr.error('Error', 'Error interno al registrar usuario');
            }
        });

    }

})


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

function setUser(user){
    localStorage.setItem("id",user.id_user);
    localStorage.setItem("name",user.name);
    localStorage.setItem("email",user.email);
    localStorage.setItem("password",user.pass);
    localStorage.setItem("is_student",user.is_student);
    localStorage.setItem("created_at",user.created_at);
    localStorage.setItem("updated_at",user.updated_at);
    localStorage.setItem("type_image", JSON.stringify(user.type_image));
    localStorage.setItem("avatar",JSON.stringify(user.avatar));
    localStorage.setItem("gender",user.gender);
    localStorage.setItem("date_birth",user.date_birth);
}

function deleteUser(){
    localStorage.clear();
}

function cerrarSesion(){
    deleteUser();
    location.href = "index.php";
}