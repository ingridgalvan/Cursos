<?php


class Video {

    private $id_video;
    private $id_nivel;
    private $title;
    private $type;
    private $path;
    

    public function __construct($id_video,$id_nivel,$title,$type,$path){
        $this->id_video = $id_video;
        $this->id_nivel = $id_nivel;
        $this->title = $title;
        $this->type = $type;
        $this->path = $path;
    }

    public function AddVideo(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Video(1,".$this->id_video.",".$this->id_nivel.",'".$this->title."','".$this->type."','".$this->path."')");
            
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
    public function findAllVideosByUser(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Video(2,".$this->id_video.",".$this->id_nivel.",'".$this->title."','".$this->type."','".$this->path."')");
            
            if($query){
              Connection::disconnect($db);
              $videos = null;
              while($row = $query->fetch_assoc()){
                  $videos[] = $row;
              }
              return $videos; 
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
    public function eliminarVideoById(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Video(3,".$this->id_video.",".$this->id_nivel.",'".$this->title."','".$this->type."','".$this->path."')");
            
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

    public static function GetVideo($id){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Video(4,".$id.",0,'','','')");
          
          if($query){
            Connection::disconnect($db);
            $resp = $query->fetch_assoc();
              return $resp; 
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

  public static function GetResources($id){
    try {
        $db = Connection::connect();
        $query = $db->query("CALL SP_Nivel(5,".$id.",'',0,0,'','','',0,'')");
        
        if($query){
          Connection::disconnect($db);
          $recursos = null;
          while($row = $query->fetch_assoc()){
            if($row['resource'] != null){
              $row["resource"] = base64_encode($row["resource"]);
            }
            $recursos[] = $row;
          }
             return $recursos; 
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

public static function SetProgress($id,$user){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Video(5,".$id.",".$user.",'','','')");
      
      if($query){
        Connection::disconnect($db);
        $recursos = null;
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

public static function GetVideosByLevel($id){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Video(6,0,".$id.",'','','')");
      
      if($query){
        Connection::disconnect($db);
        $videos = null;
        while($row = $query->fetch_assoc()){
          $videos[] = $row;
        }
        return $videos;
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