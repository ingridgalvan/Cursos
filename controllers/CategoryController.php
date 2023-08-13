<?php
include("../models/Category.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case "addCategory":
       if(isset($_POST["name"]) && isset($_POST["description"]) && isset($_POST["id_user"])){
        $name = $_POST["name"];
        $description = $_POST["description"];
        $id_user = $_POST["id_user"];
        $category = new Category($name,$description,$id_user,0,0);
        $resp = $category->AddCategory();
        echo json_encode($resp);
       }else{
        http_response_code(404);
       }
    break;

    case "findAll":
         $category = new Category("","",0,0,0);
         $resp = $category->FindAll();
         echo json_encode($resp);
     break;

     case "addCategoriaCurso":
        if(isset($_POST["curso"]) && isset($_POST["categoria"])){
        $category = new Category("","",0,$_POST["categoria"],$_POST["curso"]);
        $resp = $category->AddCategoryCurso();
        echo json_encode($resp);
        }else{
            http_response_code(404);
        }
    break;

    case "getCategoriasByCurso":
        $curso = $_GET["curso"];
        $resp = Category::GetCategoriasByCurso($curso);
        echo json_encode($resp);
    break;

    default:
        http_response_code(404);
        break;
}