$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$.ajax({
    type:"GET",
    url:"./../../controllers/CategoryController.php",
    data:{action:"findAll"},
    dataType:"json",
    success: function(resp){
         console.log(resp);
     if(resp){
        $("#showCatTop").html("")
        resp.map((item)=>{
            $("#showCatTop").append(`
            <a class=" tooltip1 dropdown-item"  href="categorias.php?categoria=${item.id_category}">${item.name}
            <span class="tooltiptext1">${item.description}</span>
            </a>
    
            `)
        })
     }
     
    },
    error:function(x,y,z){
        
    }
});
