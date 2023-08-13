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
    case "getInfoCurso":
        $user = $_GET["user"];
        $resp = Curso::GetInfoDash($user);
        echo json_encode($resp);
        break;

    case "getBestCursos":
            $user = $_GET["user"];
            $resp = Curso::GetBestCursos($user);
            echo json_encode($resp);
            break;
     case "getBestCategorias":
            $resp = Curso::GetBestCategorias();
            echo json_encode($resp);
            break;
    case "getMountEachMonth":
            $user = $_GET["user"];
            $resp = Curso::GetMountEachMonth($user);
            echo json_encode($resp);
            break;
    case "getCursosReporte":
            $user = $_GET["user"];
            $resp = Curso::GetCursosReporte($user);
            echo json_encode($resp);
            break;
    case "getPayMethods":
            $user = $_GET["user"];
            $resp = Curso::GetPayMethods($user);
            echo json_encode($resp);
            break;

    case "detalleReporte":
            $curso = $_GET["curso"];
            $resp = Curso::DetalleReporte($curso);
            echo json_encode($resp);
            break;
    case "getCertificado":
            $id = $_GET["id"];
            $curso = $_GET["curso"];
            $resp = Curso::GetCertificado($id,$curso);
            echo json_encode($resp);
             break;
    
    default:
        http_response_code(404);
    break;
}