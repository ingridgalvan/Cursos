<?php
include("../models/Nivel.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case "addNivel":
       if(isset($_POST["curso"]) && isset($_POST["name"]) && isset($_POST["price"])){
        $curso = $_POST["curso"];
        $name = $_POST["name"];
        $price = $_POST["price"];
        $price = $price == "" ? "null":$price;
        $nivel = new Nivel(0,$name,$curso,$price,"","","",0,"");
        $resp = $nivel->AddNivel();
        echo json_encode($resp);
       }else{
        http_response_code(404);
       }
    break;

    case "addNivelResource":
        if(isset($_POST["id_level"])){
            $id_level  = $_POST["id_level"];
            $resource = "";
            $type = "";
            $name = "";
            $url = "";
            if(count($_FILES) > 0){ //si es archivo
                $resource = addslashes(file_get_contents($_FILES['resource']['tmp_name']));
                $name = $_FILES['resource']['name'];
                $type = $_FILES['resource']['type'];
            }else{
                $url = $_POST["resource"];
            }

         $nivel = new Nivel($id_level,"",0,"null",$type,$resource,$name,0,$url);
         $resp = $nivel->AddNivelResource();
         if($resp){
             echo json_encode(array("message"=>"success"));
         }else{
            echo $resp;
         }
        }else{
         http_response_code(404);
        }
     break;

    case "findAll":
        $user = $_GET["user"];
         $nivel = new Nivel($user,"",0,"null","","","",0,"");//id de user
         $resp = $nivel->FindAll();
         echo json_encode($resp);
     break;

     case "eliminarNivel":
        $id = $_GET["id"];
         $nivel = new Nivel($id,"",0,"null","","","",0,"");
         $resp = $nivel->DeleteNivel();
         echo json_encode($resp);
     break;

     

    default:
        http_response_code(404);
        break;
}