<?php

include("../models/User.php");
include("../db/Connection.php");

header('Content-Type: application/json');


if (isset($_SERVER['REQUEST_METHOD']))
{
  switch ($_SERVER['REQUEST_METHOD'])
  {
    
      case 'POST':
        try {
          $json = file_get_contents('php://input');
          $data = json_decode($json);
          $user = $data->user;
          $pass = $data->pass;
          
          if($user && $pass ){
            $user = new User($user, null, $pass,null,null,null,null);
            $resp = $user->Auth();
            if( $resp  != false ){
              http_response_code(200);
              echo json_encode($resp);
            }else{
              echo $resp;
              http_response_code(500);
              echo json_encode(array("message"=>"Internal Error "));
            }
          }else{
            http_response_code(400);
            echo json_encode(array("message"=>"Bad Request"));
          }
        } catch (\Throwable $th) {
          http_response_code(500);
          echo json_encode(array("message"=>"Internal Error"));
        }
        break;

      default :
      http_response_code(404);
      echo json_encode(array("message"=>"Resource Not Found "));
  }
}



?>