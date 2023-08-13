<?php
include("../models/Curso.php");
include("../models/User.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case "addCurso":
       if(isset($_POST["name"]) && isset($_POST["description"])
        && isset($_POST["user"]) && isset($_POST["price"]) ){
        $name = $_POST["name"];
        $description = $_POST["description"];
        $id_user = $_POST["user"];
        $price = $_POST["price"];
        $price = $price == "" ? "null":$price;
        $image =  addslashes(file_get_contents($_FILES['image']['tmp_name']));
        $type = $_FILES['image']['type'];
        $curso = new Curso($id_user,$name,$description,$price,$image,$type,"",0);
        $resp = $curso->AddCurso();
        echo json_encode($resp);
       }else{
        http_response_code(404);
       }
    break;

    case "updateCurso":
        if(isset($_POST["name"]) && isset($_POST["description"])
         && isset($_POST["user"]) && isset($_POST["price"]) && isset($_POST["curso"]) ){
         $name = $_POST["name"];
         $curso = $_POST["curso"];
         $description = $_POST["description"];
         $id_user = $_POST["user"];
         $price = $_POST["price"];
         $price = $price == "" ? "null":$price;
         $image =  addslashes(file_get_contents($_FILES['image']['tmp_name']));
         $type = $_FILES['image']['type'];
         $curso = new Curso($id_user,$name,$description,$price,$image,$type,"",$curso);
         $resp = $curso->UpdateCurso();
         echo json_encode($resp);
        }else{
         http_response_code(404);
        }
     break;

    case "getAllCursosByUserNotPublic":
        $user = $_GET["user"];
         $curso = new Curso($user,"","","null","","",0,0);
         $resp = $curso->getAllCursosByUserNotPublic();
         echo json_encode($resp);
     break;

     case "getAllCursosByUser":
        $user = $_GET["user"];
         $curso = new Curso($user,"","","null","","",0,0);
         $resp = $curso->GetCursoByUser();
         echo json_encode($resp);
     break;

     case "eliminarCurso":
        $user = $_GET["user"];
         $curso = new Curso(0,"","",0,"","","",$user);
         $resp = $curso->DeleteCurso();
         echo json_encode($resp);
     break;

     case "publicarCurso":
        $user = $_GET["user"];
         $curso = new Curso(0,"","",0,"","","",$user);
         $resp = $curso->PublicarCurso();
         echo json_encode($resp);
     break;

     case "getCursobyId":
        $curso = $_GET["curso"];
        $user = $_GET["user"];
         $resp = Curso::GetCursobyId($curso,$user);
         echo json_encode($resp);
     break;
     case "pagarCurso":
     
         $courseid = $_POST["courseId"];
         $userid = $_POST["userId"];
         $precio = $_POST["amount"];
         $payment = $_POST["paymentMethod"];
         $keyp = $_POST["key"];

      
         $resp = Curso :: BuyCourse($courseid,$userid,$precio,$payment,$keyp);
         echo json_encode($resp);
        
     break;
     case "obtenerHistorial":
        $userid = $_POST["userId"];
        $resp = User :: GetHist($userid);
        echo json_encode($resp);

    break;
    case "obtenerNiveles":
        $curso = $_POST["curso"];
        $resp = Curso :: ObtenerNiveles($curso);
        echo json_encode($resp);
    break;
    case "traercurso":
        $curso = $_POST["curso"];
        $resp = User :: GetCursobyId3($curso);
        echo json_encode($resp);
    break;
    case "obtenerNivelesUser":
        $curso = $_POST["curso"];
        $user = $_POST["user"];
        $resp = Curso :: ObtenerNivelesUser($user,$curso);
        echo json_encode($resp);
    break;
    case "obtenervideosleveluser":
        $user = $_POST["user"];
        $level = $_POST["level"];
        $resp = Curso :: ObtenerVideosUser($user,$level);
        echo json_encode($resp);
    break;
    case "obtenervideoslevel":
        $level = $_POST["level"];
        $resp = Curso :: ObtenerVideos($level);
        echo json_encode($resp);
    break;
    case "estatusnivel":
        $level = $_POST["level"];
        $user = $_POST["user"];
        $resp = Curso :: estatusNivel($level,$user);
        echo json_encode($resp);
    break;
    case "obtenerporcentaje":
        $user = $_POST["user"];
        $cursito = $_POST["cursito"];
        $resp = Curso :: progresocurso($user,$cursito);
        echo json_encode($resp);
    break;
    case "comentar":
        $curso = $_POST["curso"];
        $user = $_POST["user"];
        $comentario = $_POST["comentario"];
        $resp = Curso :: comentario($curso,$user,$comentario);
        echo json_encode($resp);
    break;
    case "comentar2":
        $curso = $_POST["curso"];
        $resp = Curso :: comentario2($curso);
        echo json_encode($resp);
    break;
    case "pagarNivel":
        $user = $_POST["user"];
        $level = $_POST["level"];
        $nivel = $_POST["nivel"];
        $precio = $_POST["precio"];
        $metodo = $_POST["metodo"];
        $llave = $_POST["llave"];
        $resp = Curso :: PagarNivel($user,$level,$nivel,$precio,$metodo,$llave);
        echo json_encode($resp);
    break;
    case "addCalificate":
        $user = $_POST["user"];
        $curso = $_POST["curso"];
        $value = $_POST["valor"];
        $resp = Curso::AddCalificate($user,$curso,$value);
        echo json_encode($resp);
    break;
    default:
        http_response_code(404);
        break;
}