<?php
include("../models/Chat.php");
include("../db/Connection.php");

$action = null;

if(isset($_POST["action"])){
    $action = $_POST['action'];
}

if(isset($_GET["action"])){
    $action = $_GET['action'];
}

switch ($action) {
    case "addChat":
      $msg = $_POST["msg"];
      $from = $_POST["from"];
      $to = $_POST["to"];
      $resp = Chat::Add($from,$to,$msg);
      echo json_encode(array("message"=>"success"));
    break;

    case "getEachUserChat":
        $user = $_GET["user"];
        $resp = Chat::GetEachUserChat($user);
        echo json_encode($resp);
    break;
  
    case "getInfoUser":
        $to = $_GET["to"];
        $resp = Chat::GetInfoUser($to);
        echo json_encode($resp);
    break;

    case "getChatByUser":
      $from = $_POST["from"];
      $to = $_POST["to"];
      $resp = Chat::GetChatByUser($from,$to);
      echo json_encode($resp);
    break;

    case "getLastMessage":
      $from = $_POST["from"];
      $to = $_POST["to"];
      $resp = Chat::GetLastMessage($from,$to);
      echo json_encode($resp);
    break;
  

    default:
        http_response_code(404);
        break;
}