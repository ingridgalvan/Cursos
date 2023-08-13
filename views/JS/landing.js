// obtiene los cursos mas recientess

const numberWithCommas = (
  number
)=>{
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const is_studentVali = JSON.parse(localStorage.getItem("is_student"));

if(is_studentVali == 0){
$("#siNoEsMaestro").hide();
}
debugger
$.ajax({
    type:"GET",
    url:"./../../controllers/BuscarController.php",
    data:{action:"buscarRecientes",limit:9},
    dataType:"json",
    success: function(resp){
        console.log(resp);
        const data = resp;
       

         
    
          
       if(resp.length > 0){
         $("#splideManage").append(` <li class="liRecientes1 splide__slide p-2 d-flex " id="splide-slide01" style="background-color:#383a41">
         </li>`);
       }
       if(resp.length >3){
        $("#splideManage").append(` <li class=" liRecientes2 splide__slide p-2 d-flex" id="splide-slide02" style="background-color:#383a41">
        </li>`);
       }

       if(resp.length >6){
        $("#splideManage").append(`
        <li class=" liRecientes3 splide__slide p-2 d-flex" id="splide-slide03" style="background-color:#383a41">

        </li>`);
       }
        new Splide('.splide').mount();
    
          var elms = document.getElementsByClassName('.splide');
          for (var i = 0, len = elms.length; i < len; i++) {
            new Splide(elms[i]).mount();
          }
    
          var splide = new Splide('#splide');
    
          splide.on('autoplay:playing', function (rate) {
            console.log(rate);
          });

          splide.mount();
        for(var i = 0; i < data.length && i < 3; i++){
          var d = new Date(data[i].created_at);
          const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          
            var month = months[d.getMonth()];
            var day = d.getDate();
            $(".liRecientes1").append(`
            <div class="col-lg-4 col-md-3 col-sm-12  pt-2">
            <div class="imagen text-center" style="border-color: white !important;;">
              <img src="${'data:'+data[i].type_image + ";base64," + data[i].image }" style="height: 200px; width: 200px; object-fit:cover">
            </div>
            <div class="stats mt-2 text-center">
              <div class="mx-auto p-price w-100" style="color: white;">
                <h4> ${data[i].name}</h4>
                <h6 class="fw-bolder">${day+"/"+month+"/"+d.getFullYear()}</h6>
                <span>Precio</span>
                <p class="lead" style="color: white;">
                  <span> ${data[i].price?"$"+numberWithCommas(data[i].price) + " MXN":"Gratis"}</span>
                </p>
                 <button style="font-family: 'Bebas Neue'; background-color: rgb(100, 100, 96);  color: white;"
                  class="p1p btn mt-3 mb-4 zoom" type="submit" onclick="location.href='curso.php?curso=${data[i].id_course}';">Ver Curso</button>
              </div>
            </div>
          </div>
            `)
        }
        for(var i = 3; i < data.length && i < 6; i++){
          var d = new Date(data[i].created_at);
          const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          
            var month = months[d.getMonth()];
            var day = d.getDate();
            $(".liRecientes2").append(`
            <div class="col-lg-4 col-md-3 col-sm-12  pt-2">
            <div class="imagen text-center" style="border-color: white !important;;">
              <img src="${'data:'+data[i].type_image + ";base64," + data[i].image }" style="height: 200px; width: 200px;">
            </div>
            <div class="stats mt-2 text-center">
              <div class="mx-auto p-price" style="color: white;">
                <h4> ${data[i].name}</h4>
                <h6 class="fw-bolder">${day+"/"+month+"/"+d.getFullYear()}</h6>
                <span>Precio</span>
                <p class="lead" style="color: white;">
                <span> ${data[i].price?"$"+numberWithCommas(data[i].price) + " MXN":"Gratis"}</span>
                </p>
                 <button style="font-family: 'Bebas Neue'; background-color: rgb(100, 100, 96);  color: white;"
                  class="p1p btn mt-3 mb-4 zoom" type="submit" onclick="location.href='curso.php?curso=${data[i].id_course}';">Ver Curso</button>
              </div>
            </div>
          </div>
            `)
        }
        for(var i = 6; i < data.length && i < 9; i++){
          var d = new Date(data[i].created_at);
          const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          
            var month = months[d.getMonth()];
            var day = d.getDate();
            $(".liRecientes3").append(`
            <div class="col-lg-4 col-md-3 col-sm-12  pt-2">
            <div class="imagen text-center" style="border-color: white !important;;">
              <img src="${'data:'+data[i].type_image + ";base64," + data[i].image }" style="height: 200px; width: 200px;">
            </div>
            <div class="stats mt-2 text-center">
              <div class="mx-auto p-price" style="color: white;">
                <h4> ${data[i].name}</h4>
                <h6 class="fw-bolder">${day+"/"+month+"/"+d.getFullYear()}</h6>
                <span>Precio</span>
                <p class="lead" style="color: white;">
                <span> ${data[i].price?"$"+numberWithCommas(data[i].price) + " MXN":"Gratis"}</span>
                </p>
                 <button style="font-family: 'Bebas Neue'; background-color: rgb(100, 100, 96);  color: white;"
                  class="p1p btn mt-3 mb-4 zoom" type="submit" onclick="location.href='curso.php?curso=${data[i].id_course}';">Ver Curso</button>
              </div>
            </div>
          </div>
            `)
        }
    },
    error: function(x,y,z){
        console.error(x,y,z)
    }
})

// Mas comprados

$.ajax({
  type:"GET",
  url:"./../../controllers/BuscarController.php",
  data:{action:"buscarComprados"},
  dataType:"json",
  success: function(resp){
    if(resp){
      for(var item of resp){
        var d = new Date(item.created_at);
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        
          var month = months[d.getMonth()];
          var day = d.getDate();

      $("#contMasComprados").append(`
      <div class="col-lg-3 col-md-3 col-sm-12 mb-5 zoom">
      <div class="card h-100" style="background-color: #383a41; color: white;">
        <!-- Product image-->
        <img class="card-img-top" src="data:${item.type_image};base64,${item.image}" alt="..." style="object-fit: cover; height:158px;">
        <!-- Product details-->
        <div class="card-body p-4">
          <div class="text-center">
            <!-- Product name-->
            <h5 class="fw-bolder">${item.title}</h5>
            <h6 class="fw-bolder">${day+"/"+month+"/"+d.getFullYear()}</h6>
            <!-- Product price-->
            Precio: ${item.price? "$"+numberWithCommas(item.price)+"MXN":"Gratis"}
          </div>
          <div class="text-light text-center"> (${item.cant == 1? item.cant + " usuario":item.cant+" usuarios"}) </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
          <button style="font-family: 'Bebas Neue'; background-color: rgb(100, 100, 96);  color: white;"
          class="p1p btn mt-3 mb-4 zoom" type="submit" onclick="location.href='../HTML/curso.php?curso=${item.id_course}';">Ver Curso</button>
        </div>
      </div>
    </div>
      `)
      }
    }
  },
  error: function(x,y,z){
      console.error(x,y,z)
  }
})

/// mejor calificados

$.ajax({
  type:"GET",
  url:"./../../controllers/BuscarController.php",
  data:{action:"buscarCalificados"},
  dataType:"json",
  success: function(resp){
      if(resp){
        for(var item of resp){
          var puntos = parseFloat(item.puntos)
          var d = new Date(item.created_at);
          const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          
            var month = months[d.getMonth()];
            var day = d.getDate();

          $("#contMasCalificados").append(`
          <div class="col-lg-3 col-md-3 col-sm-12 mb-5 zoom">
          <div class="card h-100" style="background-color: #383a41; color: white;">
            <!-- Product image-->
            <img class="card-img-top" src="data:${item.type_image};base64,${item.image}" alt="..." style="object-fit: cover; height:158px;">
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${item.title}</h5>
                <h6 class="fw-bolder">${day+"/"+month+"/"+d.getFullYear()}</h6>
                <!-- Product price-->
                Precio: ${item.price? "$"+numberWithCommas(item.price)+"MXN":"Gratis"}
              </div>
              <div class="text-warning text-center"> <i class="fas fa-star"></i> ${item.puntos? puntos.toFixed(1):" Sin calificar"} </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
              <button style="font-family: 'Bebas Neue'; background-color: rgb(100, 100, 96);  color: white;"
              class="p1p btn mt-3 mb-4 zoom" type="submit" onclick="location.href='../HTML/curso.php?curso=${item.id_course}';">Ver Curso</button>
            </div>
          </div>
        </div>
      `)
        }
      }
  },
  error: function(x,y,z){
      console.error(x,y,z)
  }
})

