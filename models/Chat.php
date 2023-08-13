<?php

class Chat {

    public static function Add($from,$to,$msg){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Chat(1,".$from.",".$to.",'".$msg."')");
            
            if($query){
              Connection::disconnect($db);
                return true; 
              }
              else{
                echo $db->error;
                Connection::disconnect($db);
                return false;
              }
           } catch (Exception $th) {
               return false;
           }
           Connection::disconnect($db);
    }


    public static function GetEachUserChat($from){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Chat(3,".$from.",0,'')");
          
          if($query){
            Connection::disconnect($db);
            $chats = null;
            while($row = $query->fetch_assoc()){
                if($row['image'] != null){
                  $row["image"] = base64_encode($row["image"]);
                }
                $chats[] = $row;
            }
            return $chats; 
              
            }
            else{
              echo $db->error;
              Connection::disconnect($db);
              return false;
            }
         } catch (Exception $th) {
             return false;
         }
         Connection::disconnect($db);
  }

  public static function GetInfoUser($to){
    try {
        $db = Connection::connect();
        $query = $db->query("CALL SP_Chat(5,0,".$to.",'')");
        
        if($query){
          Connection::disconnect($db);
          $user = $query->fetch_assoc();
          $user["image"] = base64_encode($user["image"]);
          return $user; 
            
          }
          else{
            echo $db->error;
            Connection::disconnect($db);
            return false;
          }
       } catch (Exception $th) {
           return false;
       }
       Connection::disconnect($db);
}

public static function GetChatByUser($from,$to){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Chat(2,".$from.",".$to.",'')");
      
      if($query){
        Connection::disconnect($db);
        $chats = null;
        while($row = $query->fetch_assoc()){
            $chats[] = $row;
        }
        return $chats; 
          
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     Connection::disconnect($db);
}

public static function GetLastMessage($from,$to){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Chat(4,".$from.",".$to.",'')");
      
      if($query){
        Connection::disconnect($db);
        $msg =  $query->fetch_assoc();
        
        return $msg; 
          
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     Connection::disconnect($db);
}
}