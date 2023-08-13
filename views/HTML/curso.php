<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css">
    <!-- jolj -->
    <!--  Link de css -->
    <link rel="stylesheet" href="../CSS/Curso.css">

    <!-------Semantic UI----->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/rating.min.css"
        integrity="sha512-RFEUlwT70pTUPWqm2Uv8cpqeLisUAM7YWG/LIrXcZo7F0zgvp3TbViqX6xQz0Oou++N9AcwpogmEf8sDuN/OoQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/rating.min.js" defer
        integrity="sha512-GKPaQJKsw7I5CTRr27RvbXXpv/kulDkVilCQmqQen2doK07UxhEQLnSe2ozB/8yTJ8x6ofF63FXfIpYnETz9Jw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" defer></script>

    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@1,300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap" rel="stylesheet">
    <script src="./../JS/curso.js" defer></script>
    <title>CURSOS+</title>
</head>

<body>

    <?php include_once("layout_nav.php") ?>
    <div class="container" style="padding-top: 100px;">




        <div class="p-1" id="caja" style="background-color:#635985">
            <div class="row m-3">

                <div class="img-big-wrap col-lg-5">
                    <div> 
                        <img id="imageCurso" src=""
                                style="object-fit:initial; height: 300px; width: 450px;"></div>
                </div>
                <div class="col-lg-7">
                    <div class="card-body m-0 pt-0 pl-5" >
                        <h3 id="titleCurso" class="title text-uppercase" style="font-size: 25px;color: white">
                        </h3>

                        <div class="mb-3 mt-3">
                            <span > <span id="categoriasCurso" class="h7 text-success"></span>
                                <div class="ui float-right huge star rating" id="ratingCurso" data-rating="1">
                                    
                                </div>
                                <p id="ptsCurso" class="float-right" style="font-size: 15px;color: white"></p>
                            </span>
                        </div>
                        <div class="mb-3 mt-3">
                            <span class="price-title">Precio: </span>
                            <span id="precioCurso" class="price text">199</span>
                        </div>
                        <dl class="item-property" style="font-size: 20px;color: white">
                            <dt>Descripcion</dt>
                            <dd>
                                <p id="descriptionCurso"></p>
                            </dd>
                            <a style="cursor:pointer" id="chatearCurso" class="h6 text-primary"> </a>
                        </dl>
                        <div class="compra" id="compraBotones">
                        <span id="comprarCon" class=" disabled ">Metodo pago: </span>
                        <center>
                        <button target="blank" id="btnComprarPaypalCurso" type="button"
                            class="m-0 mb-4 btn text-light btn-dark " style="font-size: 19px; width: 150px;">Paypal </button>    
                        <button id="btnComprarMasterCardCurso" type="button" data-toggle="modal" data-target="#tarjeta2" type="submit"
                            class="m-0 mb-4 btn btn-dark   " style="font-size: 19px; width: 150px;">Tarjeta </button>
                            <button id="btnComprarGratis" type="button"  type="submit"
                            class="m-0 mb-4 btn btn-dark  d-none  " style="font-size: 19px; width: 150px;">Gratis</i></button>
                       </center>
                        </div>
                       <center>
                       <button id="btnVerCertificado" type="button" type="submit" class="m-0 mb-4 btn btn" style="font-size: 19px; width: 150px;background-color:#B3541E; color:white">Ver certificado</button>
                       </center>
                        <div id="contAllCailf" class="d-none">
                             <div class="  mb-4 mt-3 d-flex flex-column">
                                <div class="h3 text-center" style="font-size: 19px;color:white"><span>Califica este curso</span></div>
                                <div data-toggle="modal" data-target="#ratingModalOpen" 
                                     class="ui float-right massive star rating" id="ratingModal" data-rating="0"></div>
                            </div>
                        </div>
                    </div>



                </div>

            </div>

        </div>
        <div id="contProgreso" class="medio d-none justify-content-center mt-5 " style="font-size: 20px;">
            <dl class="param param-feature  text-center">
                <dt class="text-center" style="font-size: 25px;color: #635985">Progreso del curso:
                <dt id="numerop"></dt>
                </dt>
                <div class="progress mx-auto" style="width: 500px;">
                    <div class="progress-bar" id="numeropp" role="progressbar" style="width: 0%" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </dl>
        </div>
    </div>

    <h2 class="title text-center pt-5" id="nombreCurso" style="font-size: 25px;color: #635985">Niveles
        </h2>
    <div id="accordion" class="pb-5 justify-content-center" style="font-size: 25px;color: #635985">
      
    </div>


    </div>


    </div>
    <div class="headings d-flex justify-content-center align-items-center mb-3"
        >
        <h2 style="font-size: 25px;color: #443C68">Comentarios del curso</h2>
    </div>

    <form action="" class="col-lg-12 col-md-8 col-sm-12 mb-2" style=" 
            overflow-x:hidden;">
        <div class="comentarios borde">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8 pb-5 examplee " id="agregacomentario"   style=" 
                    overflow-y: scroll; height: 300px;  padding: 10px; background-color:white">

                  
                  
                  

                </div>

            </div>


        </div>




    </form>
    </div>
    <div id="containerComentarios" class=" d-none container pt-3" style="font-size: 20px;" style=" sans-serif;">
        <div class="form-group d-flex">
           
            <textarea class="form-control" rows="0" id="comment"></textarea>
            <div class=" botonsub max-height my-auto pl-3">
                <button type="button" id="comentariosu" class=" btn btn" style="font-size: 10px; width: 80px; height: 80px;">Enviar</button>

            </div>
        </div>

    </div>


    <?php include_once("layout_footer.php") ?>



    <div class="modal fade" data-backdrop="static" id="tarjeta" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered modal-md">
            <div class="modal-content" style="background-color: transparent;border-color: transparent;">

               
                    <form class="form" autocomplete="off" id="tarjeta_click" novalidate>
                        <fieldset>
                            <label for="card-number">Numero de tarjeta</label>
                            <input type="num" id="card-number" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-1" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-2" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-3" class="input-cart-number" maxlength="4" required />
                        </fieldset>
                        <fieldset>
                            <label for="card-holder">Titular de tarjeta</label>
                            <input type="text" id="card-holder" required />
                        </fieldset>
                        <fieldset class="card-expire">
                            <label for="expire-month">Fecha de expiracion.</label>
                            <div class="select">
                                <select id="expire-month">
                                    <option></option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </select>
                            </div>
                            <div class="select">
                                <select id="expire-year">
                                    <option></option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset class="fieldset-ccv">
                            <label for="card-ccv">CCV</label>
                            <input type="text" id="card-ccv" maxlength="3" required />
                        </fieldset>

                    </form>
                    <center>
                        <button type="button" class="btn btn-second" data-dismiss="modal">Cancelar</button>
                        <button class="btn  my-1 btn-main " id="btnpagartarjeta"><i class="fa fa-lock"></i> Pagar</button>
                    </center>
                </div>

            </div>
        </div>

    </div>
    <div class="modal fade" data-backdrop="static" id="tarjeta2" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered modal-md">
            <div class="modal-content" style="background-color: transparent;border-color: transparent;">

                <div class="checkout" >
                  
                    <form class="form" autocomplete="off" id="tarjeta_click" novalidate>
                        <fieldset>
                            <label for="card-number">Numero de tarjeta</label>
                            <input type="num" id="card-number" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-1" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-2" class="input-cart-number" maxlength="4" required />
                            <input type="num" id="card-number-3" class="input-cart-number" maxlength="4" required />
                        </fieldset>
                        <fieldset>
                            <label for="card-holder">Titular de tarjeta</label>
                            <input type="text" id="card-holder" required />
                        </fieldset>
                        <fieldset class="card-expire">
                            <label for="expire-month">Fecha de expiracion</label>
                            <div class="select">
                                <select id="expire-month">
                                    <option></option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </select>
                            </div>
                            <div class="select">
                                <select id="expire-year">
                                    <option></option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset class="fieldset-ccv">
                            <label for="card-ccv">CCV</label>
                            <input type="text" id="card-ccv" maxlength="3" required />
                        </fieldset>

                    </form>
                    <center>
                        <button type="button" class="btn btn-second" data-dismiss="modal">Cancelar</button>
                        <button class="btn  my-1 btn-main " id="btnpagartarjetaCurso2"><i class="fa fa-lock"></i> Pagar</button>
                    </center>
                </div>

            </div>
        </div>

    </div>
    <!---Modal rating-->
    <div class="modal fade"  id="ratingModalOpen" tabindex="-2" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Calificar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                <div class="ui float-right massive star rating" id="ratingCalificate" ></div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="onclickCalificar" class="btn btn-primary">Calificar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

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
<script src="../JS/Tarjeta.js"></script>

</html>