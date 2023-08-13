
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

var menus = [];
menus.push('dashboard');
menus.push('misCursos');
menus.push('curso');
menus.push('nivel');
menus.push('video');
menus.push('categoria');

function hideNavs() {
    for (item of menus) {
        $('#' + item).hide()
    }
}

function toggleNav(id) {
    hideNavs()
    $('#' + id).show();
    window.history.replaceState(null,id,location.pathname.concat(`?o=${id}`))
}

function init() {
    hideNavs()
    $("#dashboard").show();
}

init()

if(vars.o == "categoria")
$("#btnCategory").click();
if(vars.o == "video")
$("#btnVideo").click();
if(vars.o == "nivel")
$("#btnLevel").click();
if(vars.o == "curso")
$("#btnCourse").click();
if(vars.o == "misCursos")
$("#btnMyCourses").click();

function stateSwitch() {
    var check = document.getElementById('switch').checked;
     
    if (!check) {
        $('#Cprecio').removeAttr('disabled');
    } else {
        $('#Cprecio').attr('disabled', true);
    }
}

function stateSwitchLevel() {
    var check = document.getElementById('switchLevel').checked;
     
    if (!check) {
        $('#Lprecio').removeAttr('disabled');
    } else {
        $('#Lprecio').attr('disabled', true);
    }
}

$('.ui.drop').dropdown();

$('#sidebarCollapse').on('click', function () {
    $('#nav-cms').toggleClass('toggle-nav');
    $("#cms-container").toggleClass('col-lg-12')
});