<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>CURSOS+</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="./../CSS/categorias.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" defer></script>
    <script src="./../JS/buscar.js"  defer>  </script>
</head>

<body>

    <?php include_once("layout_nav.php") ?>
    <div class="container cat-nav p-2" >
        <div class="container">
        <div class="  row align-items-center" >
            <div class="col-md-2">
                
                    <select id="inputState" class="form-control">
                        <option value="0" selected>Categoria</option>
                    </select>
                

            </div>
            <div class="col-md-1 ">
                <p class="text-dark text-center pt-2">Desde:</p>
            </div>
            <div class="col-md-2">
                
                    <input type="date" name="" id="desdeDate" class="form-control" >
                

            </div>
            <div class="col-md-1 ">
                <p class="text-dark text-center pt-2">A:</p>
            </div>
            <div class="col-md-2  ">
                
                    <input type="date" name="" id="aDate"  class="form-control" >
                   

            </div>
       
            <div class="col-md-3 ">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="isByCurso" value="option1">
                <label class="form-check-label" for="inlineRadio1">Curso</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="isByUser" value="option2">
                <label class="form-check-label" for="inlineRadio2">Usuario</label>
            </div>
            </div>

            <div class="col-md-1"> 
            <button id="btnRefresh"class="btn btn-dark " style="background-color:#B3541E">Restablecer </button> 

            </div>
        </div>

        </div>
    </div>
    <div id="contSearchCursos" style="min-height:100vh" class="container mt-3 mb-3">
        

      
       


       

    </div>
    <?php include_once("layout_footer.php") ?>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>

</body>



</html>