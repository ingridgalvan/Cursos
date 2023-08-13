<?php

include("../models/User.php");
include("../db/Connection.php");


//header('Content-Type: application/json');

if (isset($_POST["method"]))
{
  switch ($_POST["method"]) {
    case 'PUT':
      //$json = file_get_contents('php://input');
      // $data = json_decode($json);
    
      try {
        $id = $_POST["id"];
        $name = $_POST["name"];
        $email = $_POST["email"];
        $pass = $_POST["pass"];
        $gender = $_POST["gender"];
        $birth = $_POST["birth"];
        $avatar = count($_FILES) > 0 ?  addslashes(file_get_contents($_FILES['avatar']['tmp_name'])) : "";
        $type = count($_FILES) > 0 ?  "'".$_FILES['avatar']['type']."'" : "null";
        $update_avatar = false;
        $update_avatar = $avatar == ""? "false": "true";
        $gender = $gender == ""? "null":$gender;
        $birth = $birth == "" ? "null": "'".$birth."'";
       
        
        if($id){
          $user = new User($name, $email, $pass,null,$avatar,$gender,$birth);
          $resp = $user->Update($id,$update_avatar,$type);
          if( $resp != false){
            http_response_code(200);
            echo json_encode($resp);
          }else{
            http_response_code(500);
            echo json_encode(array("message"=>" Internal Error"));
          }
        }else{
          http_response_code(400);
          echo json_encode(array("message"=>"Bad Request"));
        } 
      } catch (\Throwable $th) {
        http_response_code(500);
        echo json_encode(array("message"=>"Internal Error "));
      }  
    break;

  

      case 'POST':
        try {
          $name = $_POST["name"];
          $email = $_POST["email"];
          $pass = $_POST["pass"];
          $isStudent = $_POST["isStudent"];
         
          if($name && $email && $pass && $isStudent){
            $user = new User($name, $email, $pass,$isStudent,null,null,null);
            $resp = $user->Save();
            if( $resp != false){
              http_response_code(200);
              echo json_encode($resp);
            }else{
              http_response_code(500);
              echo json_encode(array("message"=>"Internal Error"));
            }
          }else{
            http_response_code(400);
            echo json_encode(array("message"=>"Bad Request"));
          }
        } catch (\Throwable $th) {
          http_response_code(500);
          echo json_encode(array("message"=>"Internal Error "));
        }
        break;

      default :
      http_response_code(404);
      echo json_encode(array("message"=>"Resource Not Found "));
  }
}









?>