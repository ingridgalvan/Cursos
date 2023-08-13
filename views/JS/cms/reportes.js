
$("#reporteDetalle").hide();


const Reportes = {
    getCursosReporte: function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getCursosReporte",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                 console.log(resp);
                 for(var item of resp){
                     $("#contMyCursos").append(`
                     <tr>
                     <td>${item.name}</td>
                     <td> ${item.is_public == 1?"Público":"No Público"}<i class="fas fa-globe-americas ${item.is_public == 1?"text-success":"text-muted"}"></i></td>
                     <td> ${item.price? "$ " + numberWithCommasR(item.price) +" MXN": "Gratis"} </td>
                     <td>${item.inscritos?item.inscritos:"0"}</td>
                     <td> ${item.ingresos? "$ " + numberWithCommasR(item.ingresos) +" MXN": "$ 0.00 MXN"}</td>
                     <td>${item.nlPromedio?item.nlPromedio:"0"}</td>
                     <td><button class="btn btn-sm btn-primary " onclick="Reportes.detalle(${item.id_course},${item.ingresos})" >Ver detalle</button></td>
                     
                     <td><button class="btn btn-sm btn-ligth"
                             onclick="location.href='curso.php?curso=${item.id_course}'"><i
                                 class="far fa-eye"></i></button></td>
                 </tr>
                     `)
                 }
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    getPayMethods:function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getPayMethods",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                 console.log(resp);
                for(var item of resp){
                    if(item.payment_method == 2){
                        $("#totalMC").html(`$ ${item.monto?numberWithCommasR(item.monto):"0.00"} MXN`);
                    }
                    if(item.payment_method == 1){
                        $("#totalP").html(`$ ${item.monto?numberWithCommasR(item.monto):"0.00"} MXN`);
                    }
                    
                }
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    getInfoDash : function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getInfoCurso",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                   $("#totalMethodP").html(` Total : $ ${resp.monto?numberWithCommasR(resp.monto):"0.00"} MXN`);
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    detalle : function(curso,total){
        $("#reporteDetalle").show()
        goToByScroll("reporteDetalle");

        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"detalleReporte",curso},
            dataType:'json',
            success: function(resp){
                $("#contDetalle").html("")
               if(resp){
                  console.log(resp);
                  var i = 0;
                  
                  for(var item of resp){
                      var d = new Date(item.created_at);
                      const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                      const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];


                        let month = months[d.getMonth()];
                        let day = d.getDate();
                      i++;
                      $("#contDetalle").append(`
                      <tr>
                      <td>${i++}</td>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${day +"/" +month + "/" + d.getFullYear()}</td>
                      <td>${item.progreso?item.progreso:"0"}%</td>
                      <td> $ ${item.monto?numberWithCommasR(item.monto):"0.00"} MXN</td>
                      <td>${item.metodos}</td>
                  </tr>
                      `)
                  }
                  $("#contDetalle").append(`
                  <tr>
                                           
                  <td></td>
                  <th> Total: $ ${total?numberWithCommasR(total):"0.00"} MXN</th>
                  <td></td>
              </tr>
                  `)
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });

    }
}

const numberWithCommasR = (
    number
)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const id_userReportes = JSON.parse(localStorage.getItem("id"));
Reportes.getCursosReporte(id_userReportes);
Reportes.getPayMethods(id_userReportes);
Reportes.getInfoDash(id_userReportes);

function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}