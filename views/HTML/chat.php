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
    <link rel="stylesheet" href="./../CSS/chat.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" defer></script>
    <script src="./../JS/chat.js" defer></script>
</head>

<body>

  <?php include_once("layout_nav.php") ?>

  

  <div class="container cont">
      <div class="row">
          <div class="col-md-4 p-3 ">
              <div class="head-chat m-2 d-flex justify-content-between">
              <div class="title-chat" style="color:#635985">
                  Chats
              </div>
              
              </div>
              <div class="users-chat " id="users-chat">
                  
              </div>
          </div>
          <div class="col-md-8 p-3 ">
              <div class="card card-msg p-3 h-100  ">
                  <div id="head-msg" class="head-msg">

                  </div>
                  <div id="contMsg" class="messages ">
                       
                       
                  </div>
                  <div class="box-message">
                      <textarea rows="1" id="textMessageChat" class="text-message" placeholder="Escribe un mensaje..."></textarea>
                      <button id="btnEnviarChat" class=" btn btn" style=" background-color:#B3541E">Enviar</button>
                  </div>
              </div>
          </div>
      </div>
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