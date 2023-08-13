<?php

class Curso{

    private $name;
    private $description;
    private $user;
    private $precio;
    private $image;
    private $type;
    private $isPublic;
    private $curso;

    public function __construct($user,$name,$description,$precio,$image,$type,$isPublic,$curso){
        $this->user = $user;
        $this->name=$name;
        $this->description=$description;
        $this->precio = $precio;
        $this->image = $image;
        $this->type = $type;
        $this->isPublic = $isPublic;
        $this->curso = $curso;
    }

    public function AddCurso(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Curso(1,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',0)");
            
            if($query){
              Connection::disconnect($db);
              $category = $query->fetch_assoc();
                return $category; 
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

    public function getAllCursosByUserNotPublic(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Curso(12,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',0)");
            
            if($query){
                Connection::disconnect($db);
                $cursos = null;
                  while($row = $query->fetch_assoc()){
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

    public function GetCursoByUser(){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Curso(2,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',0)");
          
          if($query){
              Connection::disconnect($db);
              $cursos = null;
                while($row = $query->fetch_assoc()){
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

    public function UpdateCurso(){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Curso(3,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',".$this->curso.")");
          
          if($query){
            Connection::disconnect($db);
            $category = $query->fetch_assoc();
              return $category; 
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

  public function DeleteCurso(){
    try {
        $db = Connection::connect();
        $query = $db->query("CALL SP_Curso(4,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',".$this->curso.")");
        
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

  public function PublicarCurso(){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Curso(5,".$this->user.",0,'".$this->name."','".$this->description."',".$this->precio.",'".$this->image."','".$this->type."',".$this->curso.")");
      
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

  public static function GetCursobyId($curso,$user){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_CursoState(1,".$curso.",".$user.")");
      
      if($query){
          Connection::disconnect($db);
          $curso = $query->fetch_assoc();
          $curso["image"] = base64_encode($curso["image"]);
          return $curso; 
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     
  }

  public static function BuyCourse($courseid,$userid,$precio,$payment,$keyp){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Pago(".$courseid.",".$userid.",".$precio.",".$payment.",'".$keyp."')");
      
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
     
  }
  public static function ObtenerNiveles($curso){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_GetLevel(".$curso.")");
      
      if($query){
          Connection::disconnect($db);
          $curso = null;
          while($row = $query->fetch_assoc()){
              $curso[] = $row;
          }
          return $curso; 
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     
  }

  public static function ObtenerNivelesUser($iduser,$curso){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_GetLevelUS(".$curso.",".$iduser.")");
      
      if($query){
          Connection::disconnect($db);
          $curso = null;
          while($row = $query->fetch_assoc()){
              $curso[] = $row;
          }
          return $curso; 
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     
  }
  public static function ObtenerVideosUser($iduser,$idlevel){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_GetVideoLevelUser(".$idlevel.",".$iduser.")");
      
      if($query){
          Connection::disconnect($db);
          $curso = null;
          while($row = $query->fetch_assoc()){
              $curso[] = $row;
          }
          return $curso; 
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     
  }
  public static function ObtenerVideos($level){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_GetVideoLevel(".$level.")");
      
      if($query){
          Connection::disconnect($db);
          $curso = null;
          while($row = $query->fetch_assoc()){
              $curso[] = $row;
          }
          return $curso; 
        }
        else{
          echo $db->error;
          Connection::disconnect($db);
          return false;
        }
     } catch (Exception $th) {
         return false;
     }
     
  }

  public static function estatusNivel($level,$user){
    try {
        $db = Connection::connect();
        $estatus = null;
        $query = $db->query("CALL SP_statusNivel(".$level.",".$user.")");
        
        if($query){
          Connection::disconnect($db);
          $estatus = $query->fetch_assoc();
            return $estatus; 
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
public static function comentario($curso,$user,$comentario){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Comentarios(1,".$curso.",".$user.",'".$comentario."')");
      
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
public static function comentario2($curso){
  try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_Comentarios(2,".$curso.",0,'nulo')");
      
      if($query){
        Connection::disconnect($db);
        $comentarios = null;
        while($row = $query->fetch_assoc()){
            $row["imagen"] = base64_encode($row["imagen"]);
            $comentarios[] = $row;
        }
        return $comentarios; 
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

public static function progresocurso($user,$curso){
  try {
      $db = Connection::connect();
      $progreso = null;
      $query = $db->query("CALL SP_PROGRESOTOTAL(".$user.",".$curso.")");
      
      if($query){
        Connection::disconnect($db);
        $progreso = $query->fetch_assoc();
          return $progreso; 
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

public static function PagarNivel($iduser,$idlevel,$nombreNivel,$precio,$metodo,$llave){
  try {
   $result = null;
   $db = Connection::connect();
   $query = $db->query("CALL SP_PagarNivel(".$iduser.",".$idlevel.",'".$nombreNivel."',".$precio.",".$metodo.",'".$llave."')");
   
   if($query){
     Connection::disconnect($db);
       return true; 
     }
     else{
       echo $db->error;
       Connection::disconnect($db);
       return false;
     }
   return true;
  } catch (\Throwable $th) {
      return false;
  }
  Connection::disconnect($db);
}


public static function addCalificate($user,$curso,$valor){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Score(1,".$user.",".$curso.",".$valor.")");
      
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

public static function GetInfoDash($user){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(6,".$user.",null,null,null,null,null,null,null)");
      
      if($query){
        Connection::disconnect($db);
          return $query->fetch_assoc();
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
public static function GetBestCursos($user){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(7,".$user.",null,null,null,null,null,null,null)");
      
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

public static function GetBestCategorias(){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Category(4,null,null,null,null,null)");
      
      if($query){
        Connection::disconnect($db);
        $categorias = null;
        while($row = $query->fetch_assoc()){
            $categorias[] = $row;
        }
          return $categorias;
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

public static function GetMountEachMonth($user){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(8,".$user.",null,null,null,null,null,null,null)");
      
      if($query){
        Connection::disconnect($db);
        return $query->fetch_assoc();
     
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

public static function GetCursosReporte($user){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(9,".$user.",null,null,null,null,null,null,null)");
      
      if($query){
        Connection::disconnect($db);
        $cursos = null;
        while($row = $query->fetch_assoc()){
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

public static function GetPayMethods($user){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(10,".$user.",null,null,null,null,null,null,null)");
      
      if($query){
        Connection::disconnect($db);
        $metodos = null;
        while($row = $query->fetch_assoc()){
            $metodos[] = $row;
        }
          return $metodos;
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

public static function DetalleReporte($curso){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Curso(11,null,null,null,null,null,null,null,".$curso.")");
      
      if($query){
        Connection::disconnect($db);
        $usuarios = null;
        while($row = $query->fetch_assoc()){
            $usuarios[] = $row;
        }
          return $usuarios;
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

public static function GetCertificado($id,$curso){
  try {
      $db = Connection::connect();
      
      $query = $db->query("CALL SP_Historial(2,".$id.",".$curso.")");
      
      if($query){
        Connection::disconnect($db);
        return $query->fetch_assoc();
        
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