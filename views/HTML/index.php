<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css">
  <!--  Link de css -->
  <link rel="stylesheet" href="../CSS/IndexNuevo.css">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <!-- or the reference on CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/3.2.1/introjs.css"
    integrity="sha512-i+WzzATeaDcwcfi5CfLn63qBxrKqiQvDLC+IChU1zVlaPguPgJlddOR07nU28XOoIOno9WPmJ+3ccUInpmHxBg=="
    crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css">

   
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" defer></script>
  <!-- FONTS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">

  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@1,300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap" rel="stylesheet">
  <script src="./../JS/landing.js" defer> </script>
  <title>CURSOS+</title>

</head>

<body>
<?php include_once("layout_nav.php") ?>

  <section class="inicio shadow" id="home" data-scroll-index="0" style="background-color: rgb(239, 242, 245);">

      <div class="mt-0 row row-inicio align-items-center" style="font-family: 'sans-serif'">
      <!--   <div class="col-sm-2 col-md-7 col-sm-12">
           <div class="inicio-text text-center mt-5">

             <p style="font-size: 40px;">
              Visita nuestros cursos 
            </p>
            <button onclick="location.href = 'categorias.php'" class="p1p btn button " type="submit"
              style="font-family: 'Yanone Kaffeesatz', sans-serif; font-size: large;">Ver Cursos</button> 
          </div>
        </div>-->
       <!-- <div class="col-lg-5 col-md-5 col-sm-12 inicioDer" style="padding:0%;"> -->
          <div class="mx-auto col-md-8">
            <div class=" mx-auto col-sm-8  ">
              <div id="carouselExampleIndicators" class="mt-4 carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="test " src="../IMG/php.png" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <img class="test" src="../IMG/Modelado.png" alt="Second slide">
                  </div>
                  <div class="carousel-item">
                    <img class="test" src="../IMG/react.png" alt="Third slide">
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      
      
      </div>
   
  </section>

  <section class="categorias pb-5" style="background-color: rgb(239, 242, 245);">
  
    <div class="text-center pt-4">
   
      <h2 style=" color: rgb(99, 89, 133);"> RECIEN AGREGADOS </h2>
    </div>

    <div class="container pt-0" id="_productos">
      <div class="splide pt-3 d-flex mx-auto justify-content-center col-lg-12 col-md-12 col-sm-12 " id="splide" 
        style="font-family: 'sans-serif'">
        <div class="splide__track " style="border-radius: 10px">
          <ul id="splideManage" class="splide__list">
           
           
          </ul>
        </div>
      </div>

      <div class="splide__progress">
        <div class="splide__progress__bar">
        </div>
      </div>
    </div>

    <!---mas comprados-->
    <div class="text-center pt-4">
      <h2 style=" color: rgb(99, 89, 133);">CURSOS DESTACADOS</h2>
    </div>

    <div class="container px-4 px-lg-5 mt-5">
      <div id="contMasComprados" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      

      </div>
    </div>

 
    <!-- los favoritos-->
    <div class="text-center pt-4">
      <h2 style=" color: rgb(99, 89, 133);">LOS FAVORITOS</h2>
    </div>

    <div class="container px-4 px-lg-5 mt-5">
      <div id="contMasCalificados" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
       
        

      </div>
    </div>
 

  </section>
  <?php include_once("layout_footer.php") ?>
  <script>
    </script>

</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
</script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js"></script>

</html>