var btnIniciarSesion = document.getElementById('sesioninicia');
var btnRegistrate = document.getElementById('sesionregistrate');
var infoCuenta = document.getElementById('infocuenta');

const avatar = JSON.parse(localStorage.getItem("avatar"));
const typeImage = JSON.parse(localStorage.getItem("type_image"));
document.getElementById("navImagePerfil").src = avatar == null || avatar == "" ? "./../IMG/user.png" : `data:${typeImage};base64,${avatar}`;

if (localStorage.getItem("name") !== null) {
    infoCuenta.classList.add("d-block")
    if (JSON.parse(localStorage.getItem("is_student")) == true) {
        document.getElementById("admins").style.display = "none"
    }
} else {
    btnIniciarSesion.classList.add("d-block")
    btnRegistrate.classList.add("d-block")
}

