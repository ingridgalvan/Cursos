<?php
include("../models/Buscar.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case 'buscarRecientes':
        $limit = 9;
        if(isset($_GET["limit"]))
            $limit = $_GET["limit"];
        $resp = Buscar::buscarRecientes($limit);
        echo json_encode($resp);
        break;

    case 'buscarCalificados':
            $resp = Buscar::buscarCalificados();
            echo json_encode($resp);
        break;

    case 'buscarComprados':
              
                $resp = Buscar::buscarComprados();
                echo json_encode($resp);
            break;

    case 'buscar':

        if(
            isset($_GET["buscar"]) &&
            isset($_GET["categoria"]) &&
            isset($_GET["desde"]) &&
            isset($_GET["a"]) &&
            isset($_GET["by"]) 
        
        ){
            $buscar = $_GET["buscar"];
            $categoria = $_GET["categoria"];
            $desde = $_GET["desde"];
            $a = $_GET["a"];
            $by = $_GET["by"];
            $resp = Buscar::buscarAll($buscar,$categoria,$desde,$a,$by);
            echo json_encode($resp);

        }else{
            echo json_encode(false);
        }
        
    break;
    default:
    http_response_code(404);
        break;
}