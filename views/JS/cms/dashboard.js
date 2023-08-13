

$("#btnDashBoard").click(function(){
    const id_user = JSON.parse(localStorage.getItem("id"));
    Dashboard.getInfoDash(id_user);

   
});

const Dashboard ={
    getInfoDash : function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getInfoCurso",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                   $("#cardTotal").html(`$ ${resp.monto?numberWithCommas(resp.monto):"0.00"} MXN`);
                   $("#cardTotalMonth").html(`$ ${resp.montoMes?numberWithCommas(resp.montoMes):"0.00"} MXN`);
                   $("#cardCursosVendidos").html(resp.cursos?numberWithCommas(resp.cursos):"0" + " cursos");
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    getBestCursos : function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getBestCursos",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                   console.log(resp);
                  $("#listCursosBest").html("");
                  var count = 0
                  for(var item of resp){
                      count++;
                    $("#listCursosBest").append(`
                    <li
                    class="list-group-item d-flex flex-row justify-content-between align-items-center list-group-item-action">
                    <div class="h4">${count}</div>
                    <div><img width="40" height="40" src="data:${item.type_image};base64,${item.image}" alt="Curso" style="object-fit:cover" />${item.name.substr(0,12)}</div>
                    <div class="h5">$ ${item.monto?numberWithCommas(item.monto):"0.00"} MXN</div>
                </li>
                    `)
                  }
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    getBestCategorias: function(){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getBestCategorias"},
            dataType:'json',
            success: function(resp){
               if(resp){
                  
                  console.log(resp);
                    var dataCategories = [];
                    var labels = [];
                  for(var item of resp){
                    dataCategories.push(item.cant);
                        labels.push(item.name)
                  }

                 
                const dataCategory = {
                    labels: labels,
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: ['rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(54,235,162)',
                            'rgb(162,54,240)',
                            'rgb(40,255,100)'
                        ],
                        borderColor: 'rgb(255, 99, 132)',
                        data:dataCategories,
                    }]
                };
            
               
                var categoryChart = new Chart(
                    document.getElementById('categoryChart'), {
                        type: 'doughnut',
                        data: dataCategory,
                        options: {}
                    }
                );
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    },
    getMountEachMonth:function(user){
        $.ajax({
            type:"GET",
            url:"./../../controllers/DashBoardController.php",
            data:{action:"getMountEachMonth",user},
            dataType:'json',
            success: function(resp){
               if(resp){
                  
                var labels = [];
                var dataMonths = [];
                var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                    ];
                    monthNames[-1] = "Diciembre";
                    monthNames[-2] = "Noviembre";
                    monthNames[-3] = "Octubre";
                    monthNames[-4] = "Septiembre";
                    monthNames[-5] = "Agosto";
                    monthNames[-6] = "Julio";
                    monthNames[-7] = "Junio";
                    monthNames[-8] = "Mayo";
                    monthNames[-9] = "Abril";
                    monthNames[-10] = "Marzo";
                    monthNames[-11] = "Febrero";
                    monthNames[-11] = "Enero";
                const d = new Date();
                for(var i = 5; i >=0; i--){
                labels.push(monthNames[d.getMonth() - i]); 
                dataMonths.push(resp[i] ? resp[i]:0)
          
                }
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Monto MXN',
                        backgroundColor: 'rgb(54,162,235)',
                        borderColor: 'rgb(54,162,235)',
                        data: dataMonths,
                    }]
                };
                const config = {
                    type: 'line',
                    data: data,
                    options: {}
                };
                var myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
               }
            },
            error:function(x,y,z){
                console.error(x,y,z);
            }
        });
    }
}

const numberWithCommas = (
    number
)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const id_user = JSON.parse(localStorage.getItem("id"));
    Dashboard.getInfoDash(id_user);
    Dashboard.getBestCursos(id_user);
    Dashboard.getBestCategorias();
    Dashboard.getMountEachMonth(id_user);

   