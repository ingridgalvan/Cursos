<?php

class Buscar {

    public static function buscarRecientes($limit){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Buscar(1,".$limit.",null,null,null,null,null)");
            
            if($query){
                Connection::disconnect($db);
                $cursos = null;
                  while($row = $query->fetch_assoc()){
                    $row["image"] = base64_encode($row["image"]);
                    $cursos[] = $row;
                      
                  }
                  return $cursos; 
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


    public static function buscarAll($buscar,$categoria,$desde,$a,$by){
      try {
          $categoria= $categoria? $categoria: 0;
          $by = $by? $by:0;
          $db = Connection::connect();
          $query = $db->query("CALL SP_Buscar(4,null,'".$buscar."','".$a."','".$desde."',".$categoria.",".$by.")");
          
          if($query){
              Connection::disconnect($db);
              $cursos = null;
                while($row = $query->fetch_assoc()){
                  $row["image"] = base64_encode($row["image"]);
                 $cursos[] = $row;
                    
                }
                return $cursos;
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


  public static function buscarCalificados(){
    try {
        
        $db = Connection::connect();
        $query = $db->query("CALL SP_Buscar(2,null,null,null,null,null,null)");
        
        if($query){
            Connection::disconnect($db);
            $cursos = null;
              while($row = $query->fetch_assoc()){
                $row["image"] = base64_encode($row["image"]);
               $cursos[] = $row;
                  
              }
              return $cursos;
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


public static function buscarComprados(){
  try {
      
      $db = Connection::connect();
      $query = $db->query("CALL SP_Buscar(3,null,null,null,null,null,null)");
      
      if($query){
          Connection::disconnect($db);
          $cursos = null;
            while($row = $query->fetch_assoc()){
              $row["image"] = base64_encode($row["image"]);
             $cursos[] = $row;
                
            }
            return $cursos;
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