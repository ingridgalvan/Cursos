<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css">
  
    <!--  Link de css -->
    <link rel="stylesheet" href="../CSS/Curso.css">
    <link rel="stylesheet" href="../CSS/Cuenta.css">

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


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@1,300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap" rel="stylesheet">
    <title>CURSOS+</title>
</head>

<body style="background-color: #F2F7F9;">
    <?php include_once("layout_nav.php") ?>
    <div class="wrapper" style="padding-top: 66px; overflow-x: hidden;">

        <nav id="sidebar" style="background-color: #393053; padding-top: 80px;">

            <div class="sidebar-header" style="color: ghostwhite !important; background-color: #393053;">
                <h3 style="font-family: 'sans-serif', sans-serif;"></h3>
            </div>

            <ul class="list-unstyled components" style="font-family: 'sans-serif', sans-serif;">

                
                <li>
                    <a type="button " class="opcion" style="padding-left: 20px;" id="boton2">Mis Cursos</a>
                </li>

                
               
                <li>
                    <a type="button" class="opcion  " style="padding-left: 20px;" id="boton1">
                        Perfil</a>

                </li>


                <!--     <button id="boton1" class="button mt-2"><span>Mi cuenta</span></button>
                 <button id="boton2" class="button mt-2"><span>Cursos</span></button> -->
            </ul>
        </nav>

        <div class="contenidoGeneral pl-4 col-lg-12" style="font-family:  sans-serif;">
            <div class="d-none division2">
                <div class=" d-flex  justify-content-center mx-auto"
                    style="  padding-top: 20px; font-family: sans-serif;">
                    <h2>Mis Cursos</h2>
                </div>
                <div class="division2 pb-4" id="cursotes " style="font-family: sans-serif;">
                    <section class="pt-4   cursos d-flex align-items-center" id="misCursos" >
                        <div class="container " id="agregaCursos" style="overflow-x: hidden; overflow-y: scroll; height: 550px;" >
                            
                        </div>
                        <div> 
                        
                        </div>
                    </section>
                    
                </div>
            </div>
           
            <div class="division1">
                <div class="division container" id="cuentota">

                    <section class=" cuenta d-flex align-items-center" id="home" data-scroll-index="0"
                        style="padding-top: 70px;">

                        <div class="col-lg-5 mx-auto text-center pt-4">
                            <img class="rounded-circle" id="avatar" alt=""
                                style="height: 150px; width: 150px;object-fit:cover ">
                            <title>Placeholder</title>
                            </svg>
                            <h5 id="isStudent"></h5>
                            <h2 id="nameUser"></h2>
                            <div class="text-center  mx-auto justify-content m-3">
                                <label class=" p1p btn button mt-0 ml-1 " for="updateAvatar"
                                    style="sans-serif; font-size: 20px; width: 250px;background-color:#B3541E;">Cambiar
                                    Imagen de Perfil</label>

                                    <input multiple="false" accept="image/*" type="file" class="d-none" accept="image/png, image/jpeg" onchange="showImage()" id="updateAvatar">

                            </div>
                        </div>

                    </section>
                    <section id="cursotes" class="  cursos d-flex align-items-center " id="home" data-scroll-index="0">

                        <div class="mx-auto col-lg-6 col-md-12 col-sm-12">
                            <div class="box-shadow justify-content-center mx-auto">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h4 class="mb-3 mx-auto text-center" id="createdAt"></h4>
                                </div>
                                <form id="formularioCuenta" class="row justify-content-center">
                                    <div class=" col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label for="fullName" style="font-size: 20px;">Nombre Completo</label>
                                            <input type="text" class="form-control" id="nameP"
                                                placeholder="Ingrese el nombre">
                                        </div>
                                    </div>
                                    <div class=" col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label for="eMail" style="font-size: 20px;">Correo electrónico</label>
                                            <input type="email" class="form-control" id="emailP"
                                                placeholder="Ingrese el correo ">
                                        </div>
                                    </div>
                                    <div class=" col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label for="password" style="font-size: 20px;">Contraseña</label>
                                            <input type="password" class="form-control" id="passwordP"
                                                placeholder="Contraseña" style="font-size:  15px;">
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-sm-12 pb-3 ">
                                        <label for="eMail" style="font-size: 20px;">Genero</label>

                                        <select id="genderP" class="custom-select mr-sm-2" 
                                            style="width: 100% !important;">
                                            <option id="opcion" value="">Seleccionar</option>
                                            <option id="opcion" value="1">Masculino</option>
                                            <option id="opcion" value="2">Femenino</option>
                                            <option id="opcion" value="3">Otro</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center">

                                        <div class="form-group text-left">

                                            <label for="birthdaytime" class="" style="font-size: 20px;">Fecha de
                                                nacimiento</label>
                                            <input type="date" class="form-control" id="birthdaytime"
                                                name="birthdaytime" style="width: 100%; font-size: 15px;">
                                        </div>
                                    </div>


                                    <div class="col-lg-12 col-md-12 col-sm-12 ">
                                        <div class="text-center  mx-auto justify-content m-3">
                                            <button class=" p1p btn button mt-0 ml-1" 
                                                type="submit"
                                                style="font-family:  sans-serif; font-size: 20px; width: 200px;background-color:#B3541E">Actualizar
                                                perfil</button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </section>
                </div>

            </div>
         
        </div>



    </div>
    <?php include_once("layout_footer.php") ?>



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
<script src="../JS/Cuenta.js"></script>

</html>