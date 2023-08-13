<?php
include("../models/Video.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case "addVideo":
       if(isset($_POST["title"]) && isset($_POST["nivel"])
        && isset($_POST["path"])){
        $title = $_POST["title"];
        $nivel = $_POST["nivel"];
        $path = "/videos/". $_POST["path"];
        $pathSave =  "./../videos/". $_POST["path"];
        move_uploaded_file($_FILES["video"]["tmp_name"],$pathSave);
        $type = $_FILES["video"]["type"];
        $video = new Video(0,$nivel,$title,$type,$path);
        $resp = $video->AddVideo();
        echo $resp;
       }else{
        http_response_code(404);
       }
    break;

    case "findAllVideosByUser":
        $user = $_GET["user"];
        $video = new Video($user,0,"","","");
        $resp = $video->findAllVideosByUser();
         echo json_encode($resp);
     break;

     case "eliminarVideoById":
        $id = $_GET["id_video"];
        $video = new Video($id,0,"","","");
        $resp = $video->eliminarVideoById();
         echo $resp;
     break;

     case "getVideo":
        $id = $_GET["id"];
        $resp = Video::GetVideo($id);
         echo json_encode($resp);
     break;

     case "getResources":
        $id = $_POST["id"];
        $resp = Video::GetResources($id);
        echo json_encode($resp);
     break;

     case "setProgress":
        $id = $_POST["id"];
        $user = $_POST["user"];
        $resp = Video::SetProgress($id,$user);
        echo json_encode($resp);
     break;

     case "getVideosByLevel":
        $id = $_POST["id"];
        $resp = Video::GetVideosByLevel($id);
        echo json_encode($resp);
     break;

    
    default:
        http_response_code(404);
        break;
}