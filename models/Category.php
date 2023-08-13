<?php


class Category {

    private $name;
    private $description;
    private $id_user;
    private $id_categoria;
    private $id_curso;

    public function __construct($name,$description,$id_user,$id_categoria,$id_curso){
        $this->name = $name;
        $this->description = $description;
        $this->id_user = $id_user;
        $this->id_categoria = $id_categoria;
        $this->id_curso = $id_curso;
    }

    public function AddCategory(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Category(1,'".$this->name."','".$this->description."',".$this->id_user.",".$this->id_categoria.",".$this->id_curso.")");
            
            if($query){
              Connection::disconnect($db);
              $categories = null;
                while($row = $query->fetch_assoc()){
                    $categories[] = $row;
                }
                return $categories; 
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


    public function FindAll(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Category(2,'".$this->name."','".$this->description."',".$this->id_user.",".$this->id_categoria.",".$this->id_curso.")");
            
            if($query){
              Connection::disconnect($db);
              $categories = null;
                while($row = $query->fetch_assoc()){
                    $categories[] = $row;
                }
                return $categories; 
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

    public function AddCategoryCurso(){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Category(3,'".$this->name."','".$this->description."',".$this->id_user.",".$this->id_categoria.",".$this->id_curso.")");
          
          if($query){
              return True; 
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

  public static function GetCategoriasByCurso($curso){
    try {
      $db = Connection::connect();
      $query = $db->query("CALL SP_CursoState(2,".$curso.",0)");
      
      if($query){
        Connection::disconnect($db);
        $categories = null;
          while($row = $query->fetch_assoc()){
              $categories[] = $row;
          }
          return $categories; 
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

}