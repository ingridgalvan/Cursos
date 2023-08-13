console.log("hola");
var vars = {};

var progrss = null;
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });

  const id_user = JSON.parse(localStorage.getItem("id"));
  const is_student = JSON.parse(localStorage.getItem("is_student"));
if(is_student == 0 || !vars.curso){
    window.location.href = "notfound.php"
}else{
  $.ajax({
    type: "GET",
    url: "../../controllers/DashBoardController.php",
    data: {action:"getCertificado",id:id_user,curso:vars.curso},
    dataType: 'json',
    success: function(data){
      if(data.inicio || data.fin || data.nombre || data.curso){
        var inicio = new Date(data.inicio);
        var fin = new Date(data.fin);
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        


          let monthIni = months[inicio.getMonth()];
          let dayIni = inicio.getDate();
          let monthFin = months[fin.getMonth()];
          let dayFin = fin.getDate();
        $("#cerName").html(data.nombre);
        
        $("#curso2").append(`${data.curso} de ${dayIni+"/"+monthIni+"/"+inicio.getFullYear()} a ${dayFin+"/"+monthFin+"/"+fin.getFullYear()}`)
      }else{
        window.location.href = "notfound.php"
      }

    },error:function(x,y,z){
      console.log("error");
    }
  });
}
