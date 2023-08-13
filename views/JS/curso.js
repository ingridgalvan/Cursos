$(document).ready(function () {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    });


  var countNlComprados = 0;
  var countNl = 0;
  var esComprado = false;
  var esCursoTerminado = false;
  var precioCurso = null;
  if (!vars.curso) {
    location.href = "notfound.php"
  }
  const id_user = JSON.parse(localStorage.getItem("id"));
  const is_student = JSON.parse(localStorage.getItem("is_student"));

  $("#btnVerCertificado").attr("onclick",`location.href='../HTML/Certificado.html?curso=${vars.curso}'`)

  // Para traer las categorias del curso
  $.ajax({
    type: "GET",
    url: "./../../controllers/CategoryController.php",
    data: {
      action: "getCategoriasByCurso",
      curso: vars.curso
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      for (var item of resp) {
        $("#categoriasCurso").append(` <a style="cursor:pointer;" href="categorias.php?categoria=${item.id_category}"> ${item.name} </a> -`)
      }
    },
    error: function (x, y, z) {

      console.error(x)
    }
  })

  $('#ratingCurso')
    .rating({
      initialRating: 1,
      maxRating: 1,
      interactive: false
    });

  $('#ratingModal')
    .rating({
      initialRating: 0,
      maxRating: 5
    });

  $('#ratingCalificate')
    .rating({
      maxRating: 5,
      interactive: true
    });

  $('#ratingModalOpen').on('shown.bs.modal', function () {
    var rating = $('#ratingModal').rating('get rating');
    $('#ratingCalificate').rating('set rating', rating);
   
    
  })

  $("#onclickCalificar").click(function(){
    var value = $('#ratingCalificate').rating('get rating');
     
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "addCalificate",
        valor: value,
        user:id_user,
        curso:vars.curso
      },
      success: function (resp) {
        location.reload()
      },
      error: function (x, y, z) {
         
      }
    })
  
  })

  //////HACERLE UN INSERT ALA TABLA COMPRAR TRAYENDO EL ID DEL CURSO DEL USUARIO PRECIO /uuidv4()
  $("#btnComprarPaypalCurso").click(function () {
    if(!id_user){
      $("#sesioninicia").click()
    }else{
    if(is_student == 0){
      Swal.fire(
        'Eres maestro',
        'Cambia de tipo de cuenta para comprar cursos',
        'warning'
      )
    }else{
   
    var paymentMethod = 1;
    var key = uuidv4()
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarCurso",
        userId: id_user,
        courseId: vars.curso,
        amount: precioCurso,
        paymentMethod,
        key
      },
      success: function (resp) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Curso comprado`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })


  }
}
  });
  $("#btnpagartarjetaCurso2").click(function () {
    if(!id_user){
      $("#sesioninicia").click()
    }else{
    if(is_student == 0){
      Swal.fire(
        'Eres maestro',
        'Cambia de tipo de cuenta para comprar cursos',
        'warning'
      )
    }else{

    var paymentMethod = 2;
    var key = uuidv4()
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarCurso",
        userId: id_user,
        courseId: vars.curso,
        amount: precioCurso,
        paymentMethod,
        key
      },
      success: function (resp) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Curso comprado`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })


  }
}
  });

  $("#btnComprarGratis").click(function () {
    if(!id_user){
      $("#sesioninicia").click()
    }else{
    if(is_student == 0){
      Swal.fire(
        'Eres maestro',
        'Cambia de tipo de cuenta para comprar cursos',
        'warning'
      )
    }else{

    var paymentMethod = 3;
    var key = uuidv4()
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarCurso",
        userId: id_user,
        courseId: vars.curso,
        amount: precioCurso,
        paymentMethod,
        key
      },
      success: function (resp) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Curso comprado`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })


  }
}
  });


  if (id_user != null) {
    //Para traer datos del curso cuando esta logeado
    if (is_student == 0) { // SI ES MAESTRO
      $.ajax({
        type: "GET",
        url: "./../../controllers/CourseController.php",
        data: {
          action: "getCursobyId",
          user: id_user,
          curso: vars.curso
        },
        dataType: "json",
        success: function (resp) {
          esComprado = resp.is_comprado == 0 ? false : true;
          precioCurso = resp.price ? resp.price : 0

          $("#titleCurso").html(resp.curso)
          $("#precioCurso").html(resp.price ? "$ " + numberWithCommas(resp.price) + " MXN" : "Gratis")
          $("#descriptionCurso").html(resp.description);
          $("#imageCurso").attr("src", `${"data:" + resp.type_image + ";base64," + resp.image}`)
          $("#chatearCurso").append(`Creado por : ${resp.name} / ${resp.email} <i class="far fa-comment-dots"></i>`)
          $("#chatearCurso").attr("href", `chat.php?to=${resp.id_user}`)
          
          //$("#cursocal").addClass("invisible");
          var puntos = parseFloat(resp.puntos)
          if(resp.countPts > 0)
          $("#ptsCurso").html(`${puntos.toFixed(1)} (${resp.countPts})`)
          else
          $("#ptsCurso").html("Sin calificar")
          
          //$("#ratingCurso").addClass("invisible");
          $('#chatearCurso').addClass("disabled");
          $('#chatearCurso').addClass("btn");


        },
        error: function (x, y, z) {

          console.error(x)

        }
      })

      var curso = vars.curso;
      $.ajax({
        type: "POST",
        url: "./../../controllers/CourseController.php",
        data: {
          action: "obtenerNiveles",
          curso: curso
        },
        dataType: "json",
        success: function (resp3) {
  
          console.log(resp3);
          for (item3 of resp3) {
            if(item3.cantidad > 0){
              $("#accordion").append(`
              <div class="col-lg-8 mx-auto">
              <div class="card-header" id="headingOne${item3.idNivel}">
                  <h5 class="mb-0">
                      <button class="btn" data-toggle="collapse" data-target="#collapseOne${item3.idNivel}" aria-expanded="true"
                          aria-controls="collapseOne${item3.idNivel}">
                         Videos
                      </button>
                      <span>${item3.nombreNivel}</span>
                      <button  onclick="location.href='../HTML/index.php'"
                              class="m-0 btn text-light btn-dark zoom float-right ml-1" style="font-size: 10px;">Paypal <i class="fab fa-paypal"></i></button>    
                          <button   onclick="location.href='../HTML/index.php'"
                              class="m-0 btn btn-dark zoom float-right ml-1" style="font-size: 10px;">MasterCard <i class="fab fa-cc-mastercard"></i></button>
                  </h5>
              </div>
              <div id="collapseOne${item3.idNivel}" class="collapse show" aria-labelledby="headingOne${item3.idNivel}" data-parent="#accordion">
                
              </div>
          </div>  `);
      
                var level = item3.idNivel;
                $.ajax({
                  type: "POST",
                  url: "./../../controllers/CourseController.php",
                  data: {
                    action: "obtenervideoslevel",
                    level: level
                  },
                  dataType: "json",
                  async: false,
                  success: function (resp4) {
      
                    for (item4 of resp4) {
                      $("#collapseOne" + item3.idNivel).append(`
                      <div class="card-body">
                                  <span>${item4.tituloVideo}</span>
                                  
                              </div>
                      `)
      
                    }
                  },
                  error: function (x, y, z) {
      
      
                    // location.href = "index.php"
                  }
                })
            }
          }
  
  
        },
        error: function (x, y, z) {
  
          console.error(x)
  
        }
      })



    } else {
      var curso = vars.curso;
      var user = id_user;
      //SI ES ESTUDIANTE
      $.ajax({
        type: "GET",
        url: "./../../controllers/CourseController.php",
        data: {
          action: "getCursobyId",
          user: id_user,
          curso: vars.curso
        },
        dataType: "json",
        success: function (resp) {
          console.log(resp);
          esComprado = resp.is_comprado == 0 ? false : true;
          precioCurso = resp.price ? resp.price : 0
          esCursoTerminado = resp.porcentaje == 100 ? true:false;

          $("#titleCurso").html(resp.curso)
          $("#precioCurso").html(resp.price ? "$ " + numberWithCommas(resp.price) + " MXN" : "Gratis")
          $("#descriptionCurso").html(resp.description);
          $("#imageCurso").attr("src", `${"data:" + resp.type_image + ";base64," + resp.image}`)
          $("#chatearCurso").append(`Creado por : ${resp.name} / ${resp.email} <i class="far fa-comment-dots"></i>`)
          $("#chatearCurso").attr("href", `chat.php?to=${resp.id_user}`)
          var puntos = parseFloat(resp.puntos)
          if(resp.countPts > 0)
          $("#ptsCurso").html(`${puntos.toFixed(1)} (${resp.countPts})`)
          else
          $("#ptsCurso").html("Sin calificar")
          //  $("#cursocal").hide();

          $("#numerop").append(resp.porcentaje + "%");
          $("#numeropp").css("width", resp.porcentaje + "%");

          if(precioCurso == 0){
            $('#btnComprarPaypalCurso').hide();
            $('#btnComprarMasterCardCurso').hide();
            $('#btnComprarGratis').removeClass("d-none");
          }

          if (esComprado) {

            $('#btnComprarPaypalCurso').hide();
            $('#btnComprarMasterCardCurso').hide();
            $('#btnComprarGratis').hide();
            

          }



          if (esCursoTerminado) {
            $("#btnVerCertificado").removeClass("d-none");
            $("#containerComentarios").removeClass("d-none");
            console.log(resp.isCalificado);
             
            if(resp.isCalificado == 0)
            $("#contAllCailf").removeClass("d-none");

          }
          var cursito = vars.curso;

         
          //$('#btnComprarPaypal').prop("disabled",true);
          //$('#btnComprarMasterCard').prop("disabled",true);
          if (esComprado) {
            //TRAE NIVELES CUANDO EL CURSO ESTA COMPRADO Y LOS MUESTRA TODOS
            $("#btnComprarPaypal").hide();
            $("#btnComprarMasterCard").hide();
            $("#comprarCon").hide();
            $("#contProgreso").removeClass("d-none");
            
            var curso = vars.curso;
            $.ajax({
              type: "POST",
              url: "./../../controllers/CourseController.php",
              data: {
                action: "obtenerNiveles",
                curso: curso
              },
              dataType: "json",
              success: function (resp3) {

                console.log(resp3);

                for (item3 of resp3) {
                  console.log(item3);
                  if (item3.cantidad > 0) {
                    $("#accordion").append(`
        <div class="col-lg-8 mx-auto">
        <div class="card-header" id="headingOne${item3.idNivel}">
            <h5 class="mb-0">
               
                <button class="btn" data-toggle="collapse" data-target="#collapseOne${item3.idNivel}" aria-expanded="true"
                    aria-controls="collapseOne${item3.idNivel}">
                   Videos
                </button>
                <span id="nombreN${item3.idNivel}">${item3.nombreNivel}</span>
                <div id="progresoDiv${item3.idNivel}" class="float-right text-muted"></div>
            </h5>
        </div>
        <div id="collapseOne${item3.idNivel}" class="collapse show" aria-labelledby="headingOne${item3.idNivel}" data-parent="#accordion">
          
        </div>
    </div>  `);
                  }
                  var level = item3.idNivel;
                  var user = id_user;
                  $.ajax({
                    type: "POST",
                    url: "./../../controllers/CourseController.php",
                    data: {
                      action: "obtenervideoslevel",
                      level: level
                    },
                    dataType: "json",
                    async: false,
                    success: function (resp4) {
                      resp4 = resp4? resp4 : []
                      console.log(resp4);
                      for (item4 of resp4) {
                        if (item3.cantidad > 0) {
                          $("#collapseOne" + item3.idNivel).append(`
       <div class="card-body">
                   <span>${item4.tituloVideo}</span>
                   <button class=" p1p btn button mt-0 ml-1 zoom float-right" onclick="location.href = 'video.php?video=${item4.videoid}&nivel=${level}&curso=${vars.curso}'"
                        type="submit"
                       style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: small;">Ver</button>
               </div>
       `)
                        }

                      }
                    },
                    error: function (x, y, z) {


                      // location.href = "index.php"
                    }
                  })


                  $.ajax({
                    type: "POST",
                    url: "./../../controllers/CourseController.php",
                    data: {
                      action: "estatusnivel",
                      level: level,
                      user: user
                    },
                    dataType: "json",
                    async: false,
                    success: function (resp4) {

                        console.log(resp4);
                      $("#progresoDiv" + item3.idNivel).append(`
                   (${resp4.Progreso})
                  `);
                    },
                    error: function (x, y, z) {


                      // location.href = "index.php"
                    }
                  })

                }

              },
              error: function (x, y, z) {
                console.error(x)
               

              }
            })
          } else {
            // TRAE NIVELES CUANDO EL CURSO NO SE COMPRA PERO LOS NIVELES SI
         
           

            var curso = vars.curso;
            $.ajax({
              type: "POST",
              url: "./../../controllers/CourseController.php",
              data: {
                action: "obtenerNivelesUser",
                user: user,
                curso: curso
              },
              dataType: "json",
              success: function (resp3) {
                // $('#btnComprarPaypal').prop("disabled",true);
                // $('#btnComprarMasterCard').prop("disabled",true);


                console.log(resp3);
                for (item3 of resp3) {
                  if (item3.cantidad > 0) {
                    countNl++;
                    $("#accordion").append(`
      <div class="col-lg-8 mx-auto">
      <div class="card-header" id="headingOne${item3.idNivel}">
          <h5 class="mb-0">
          
              <button class="btn" data-toggle="collapse" data-target="#collapseOne${item3.idNivel}" aria-expanded="true"
                  aria-controls="collapseOne${item3.idNivel}">
                 Videos
              </button>
              <span id="nombreN${item3.idNivel}">${item3.nombreNivel} </span>
              <div id="progresoDiv${item3.idNivel}" class="float-right text-muted">(${item3.Progreso})</div> 
              <button target="blank" id="btnComprarPaypal" type="button" name="${item3.idNivel}" accessKey="${item3.precio}"
                      class=" ${item3.precio?"":"d-none"} m-0 btn text-light btn-dark zoom float-right ml-1 btnComprarPaypal${item3.idNivel}" style="font-size: 10px;">Paypal <i class="fab fa-paypal"></i></button>    
                  <button id="btnComprarMasterCard" type="button" data-toggle="modal" data-target="#tarjeta" type="submit" name="${item3.idNivel}" accessKey="${item3.precio}"
                      class="${item3.precio?"":"d-none"} m-0 btn btn-dark zoom float-right ml-1 btnComprarMasterCard${item3.idNivel} " style="font-size: 10px;">MasterCard <i class="fab fa-cc-mastercard"></i></button>
                  <button id="btnComprarGratisNivel" type="button" type="submit" name="${item3.idNivel}" accessKey="${item3.precio}"
                      class="${item3.precio?"d-none":""} m-0 btn btn-dark zoom float-right ml-1 btnComprarGratisClass${item3.idNivel}"  style="font-size: 10px;">Obtener Gratis </button>
                      <div id="priceNivel${item3.idNivel}" class="float-right text-success mx-2"> ${ item3.precio? "$ "+item3.precio + "MXN" :"Gratis"}  </div>
          </h5>
      </div>
      <div id="collapseOne${item3.idNivel}" class="collapse show" aria-labelledby="headingOne${item3.idNivel}" data-parent="#accordion">
          

      </div>
  </div>  `);
                  }

                  if (item3.Comprado == 0) {
                   
                    $('#progresoDiv' + item3.idNivel).hide();
                    $('.btnComprarPaypal' + item3.idNivel).prop("disabled", false);
                    $('.btnComprarMasterCard' + item3.idNivel).prop("disabled", false);
                    $('.btnComprarGratisClass' + item3.idNivel).prop("disabled", false);
                  } else {
                    countNlComprados++;
                    $("#contProgreso").removeClass("d-none");
                    $('#priceNivel' + item3.idNivel).hide();
                    $('.btnComprarPaypal' + item3.idNivel).hide();
                    $('.btnComprarMasterCard' + item3.idNivel).hide();
                    $('.btnComprarGratisClass' + item3.idNivel).hide();
                  }
               
                  var level = item3.idNivel;
                  var nivel = item3.nombreNivel;
                  var precio = item3.precio;
                  var llave = uuidv4();
                  if (precio == null) {
                    precio = 0;
                  }
 
                

                  var level = item3.idNivel;
                  var user = id_user;
                  $.ajax({
                    type: "POST",
                    url: "./../../controllers/CourseController.php",
                    data: {
                      action: "obtenervideosleveluser",
                      level: level,
                      user: user
                    },
                    dataType: "json",
                    async: false,
                    success: function (resp4) {
                      resp4 = resp4?resp4 : [];
                      for (item4 of resp4) {
                        if (item3.cantidad > 0) {
                          if (item3.Comprado == 1) {


                            $("#collapseOne" + item3.idNivel).append(`
                        <div class="card-body">
                      <span>${item4.tituloVideo}</span>
                       <button class=" p1p btn button mt-0 ml-1 zoom float-right" onclick="location.href = 'video.php?video=${item4.videoid}&nivel=${level}&curso=${vars.curso}'"
                          type="submit"
                          style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: small;">Ver</button>
                           </div>
                            `)
                          }else{
                            
                            $("#collapseOne" + item3.idNivel).append(`
                        <div class="card-body">
                      <span>${item4.tituloVideo}</span>
                       
                           </div>
                            `)
                          }
                        }
                      }

                     
                    },
                    error: function (x, y, z) {


                      // location.href = "index.php"
                    }
                  })
                  



                }
                if(countNl == countNlComprados){
                  $('#compraBotones').hide();
                }

              },
              error: function (x, y, z) {


                // location.href = "index.php"

              }
            })
          }

        },
        error: function (x, y, z) {

         // location.href = "index.php"
         console.error(x)
        }
      })
    }
  } else {
    
    $("#btnComprarPaypal1").click(function () {
      location.href = "index.php"
    })

    $("#btnComprarMasterCard1").click(function () {
      location.href = "index.php"

    })
    var curso = vars.curso;
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "traercurso",
        curso
      },
      dataType: "json",
      success: function (resp) {
        console.log(resp);
        var valPrecio = resp.precioc ? resp.precioc : 0

        $("#titleCurso").html(resp.nombrec)
        $("#precioCurso").html(resp.precioc ? "$ " + numberWithCommas(resp.precioc) +" MXN" : "Gratis")
        $("#descriptionCurso").html(resp.decripcionc);
        $("#imageCurso").attr("src", `${"data:" + resp.tipo + ";base64," + resp.imagen}`)
        //$("#chatearCurso").append(`Creado por : ${resp.name } / ${resp.email} <i class="far fa-comment-dots"></i>`)
        //$("#chatearCurso").attr("href",`chat.php?to=${resp.id_user}`)
        var puntos = parseFloat(resp.puntos)
          if(resp.countPts > 0)
          $("#ptsCurso").html(`${puntos.toFixed(1)} (${resp.countPts})`)
          else
          $("#ptsCurso").html("Sin calificar")
       
        $('#btnComprarMasterCardCurso').attr("data-target","#exampleModal");
        if(valPrecio == 0){
          $('#btnComprarPaypalCurso').hide();
          $('#btnComprarMasterCardCurso').hide();
          $('#btnComprarGratis').removeClass("d-none");
        }

      },
      error: function (x, y, z) {

        // location.href = "index.php"
      }
    })

    //Para traer datos del curso cuando no esta logeado

    var curso = vars.curso;
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "obtenerNiveles",
        curso: curso
      },
      dataType: "json",
      success: function (resp3) {

        console.log(resp3);
        for (item3 of resp3) {
          if(item3.cantidad > 0){
            $("#accordion").append(`
            <div class="col-lg-8 mx-auto">
            <div class="card-header" id="headingOne${item3.idNivel}">
                <h5 class="mb-0">
                    <button class="btn" data-toggle="collapse" data-target="#collapseOne${item3.idNivel}" aria-expanded="true"
                        aria-controls="collapseOne${item3.idNivel}">
                       Videos
                    </button>
                    <span>${item3.nombreNivel}</span>
                    <button  onclick="$('#sesioninicia').click()"
                            class="m-0 btn text-light btn-dark zoom float-right ml-1" style="font-size: 10px;">Paypal <i class="fab fa-paypal"></i></button>    
                        <button   onclick="$('#sesioninicia').click()"
                            class="m-0 btn btn-dark zoom float-right ml-1" style="font-size: 10px;">MasterCard <i class="fab fa-cc-mastercard"></i></button>
                            <div id="priceNivel${item3.idNivel}" class="float-right text-success mx-2"> ${ item3.precio? "$ "+item3.precio + " MXN" :"Gratis"}  </div>
                </h5>
            </div>
            <div id="collapseOne${item3.idNivel}" class="collapse show" aria-labelledby="headingOne${item3.idNivel}" data-parent="#accordion">
              
            </div>
        </div>  `);
    
              var level = item3.idNivel;
              $.ajax({
                type: "POST",
                url: "./../../controllers/CourseController.php",
                data: {
                  action: "obtenervideoslevel",
                  level: level
                },
                dataType: "json",
                async: false,
                success: function (resp4) {
    
                  for (item4 of resp4) {
                    $("#collapseOne" + item3.idNivel).append(`
                    <div class="card-body">
                                <span>${item4.tituloVideo}</span>
                                
                            </div>
                    `)
    
                  }
                },
                error: function (x, y, z) {
    
    
                  // location.href = "index.php"
                }
              })
          }
        }


      },
      error: function (x, y, z) {

        console.error(x)

      }
    })

  }
  var userm = null;;
  var levelm = null;
  var nivelm = null;
  var preciom = null;
  var metodom = null;
  var llavem = null;

  $(this).on('click', '#btnComprarPaypal', function (e) {

    console.log(e.target.name, e.target.accessKey);
    var user = id_user;
    var level = e.target.name;
    var nivel = "nada";
    var precio = e.target.accessKey;
    var metodo = 1;
    var llave = uuidv4;
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarNivel",
        user: user,
        level: level,
        nivel: nivel,
        precio: precio,
        metodo: metodo,
        llave: llave
      },
      dataType: "json",
      async: false,
      success: function (resppago) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Nivel comprado`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })

  })


  $(this).on('click', '#btnComprarGratisNivel', function (e) {

    var user = id_user;
    var level = e.target.name;
    var nivel = "nada";
    var precio = e.target.accessKey;
    var metodo = 3;
    var llave = uuidv4;
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarNivel",
        user: user,
        level: level,
        nivel: nivel,
        precio: precio,
        metodo: metodo,
        llave: llave
      },
      dataType: "json",
      async: false,
      success: function (resppago) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Nivel conseguido`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })

  })

  $(this).on('click', '#btnComprarMasterCard', function (e) {
debugger
    console.log(e.target.name, e.target.accessKey);
    userm = id_user;
    levelm = e.target.name;
    nivelm = "nada";
    preciom = e.target.accessKey;
    metodom = 2;
    llavem = uuidv4;
   
  })

  $(this).on('click', '#btnpagartarjeta', function (e) {
    var user = userm;
    var level = levelm;
    var nivel = nivelm;
    var precio = preciom;
    var metodo = metodom;
    var llave = llavem;

    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "pagarNivel",
        user: user,
        level: level,
        nivel: nivel,
        precio: precio,
        metodo: metodo,
        llave: llave
      },
      dataType: "json",
      async: false,
      success: function (resppago) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Nivel comprado`,
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        }).catch((err) => {
            console.error(err)
        });
      },
      error: function (x, y, z) {
         
        Swal.fire(
          'Error',
          'Intentelo de nuevo',
          'error'
        )
      }
    })

  })

  $("#comentariosu").click(function () {

    var curso = vars.curso;
    var user = id_user;
    var comentario = document.getElementById('comment').value;
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "comentar",
        curso: curso, user: user, comentario: comentario
      },
      success: function (resp) {
        $("#comment").val("");
        showComentarios()
      },
      error: function (x, y, z) {

        console.error(x)

      }
    })



  });


  var curso = vars.curso;
  function showComentarios(){
    $.ajax({
      type: "POST",
      url: "./../../controllers/CourseController.php",
      data: {
        action: "comentar2",
        curso: curso
      }, dataType: "json",
      success: function (respc) {
        //${"data:"+item.tipo + ";base64,"+item.imagen}
  
        respc = respc ? respc : [];
        $("#agregacomentario").html("")
        for (var item444 of respc) {
  
          $("#agregacomentario").append(`  <div class="card p-3 m-1">
  <div class="d-flex justify-content-between align-items-center">
      <div class="user d-flex flex-row align-items-center"> 
      <img src="${item444.imagen?"data:" + item444.tipo + ";base64," + item444.imagen:"./../IMG/user.png"}" class="user-img rounded-circle mr-2"
              style="object-fit: contain; width: 30px; height:30px;"> <span><small
                  class="font-weight-bold text-primary">${item444.correo}:</small> <small
                  class="font-weight-bold">${item444.comentario}</small></span> </div>
      <small>${item444.fecha}</small>
  </div>
  </div>
  `)
  
  
        }
  
  
      },
      error: function (x, y, z) {
  
        console.error(x)
  
      }
    })
  }

  showComentarios()

  const numberWithCommas = (
    number
)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
});