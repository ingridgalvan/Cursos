<?php


class Nivel {

    private $idNivel;
    private $name;
    private $curso;
    private $price;
    private $type;
    private $resource;
    private $nameResource;
    private $idResource;
    private $url;

    public function __construct($idNivel,$name,$curso,$price,$type,$resource,$nameResource,$idResource,$url){
        $this->idNivel = $idNivel;
        $this->name = $name;
        $this->curso = $curso;
        $this->price = $price;
        $this->type = $type;
        $this->resource = $resource;
        $this->nameResource = $nameResource;
        $this->idResource = $idResource;
        $this->url = $url;
    }

    public function AddNivel(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Nivel(1,".$this->idNivel.",'".$this->name."',".$this->curso.",".$this->price.",'".$this->type."','".$this->resource."','".$this->nameResource."',".$this->idResource.",'')");
            
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

    public function AddNivelResource(){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Nivel(3,".$this->idNivel.",'".$this->name."',".$this->curso.",".$this->price.",'".$this->type."','".$this->resource."','".$this->nameResource."',".$this->idResource.",'".$this->url."')");
          
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


    public function FindAll(){
        try {
            $db = Connection::connect();
            $query = $db->query("CALL SP_Nivel(2,".$this->idNivel.",'".$this->name."',".$this->curso.",".$this->price.",'".$this->type."','".$this->resource."','".$this->nameResource."',".$this->idResource.",'')");
            
            if($query){
              Connection::disconnect($db);
              $niveles = null;
                while($row = $query->fetch_assoc()){
                    $niveles[] = $row;
                }
                return $niveles; 
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

    public function DeleteNivel(){
      try {
          $db = Connection::connect();
          $query = $db->query("CALL SP_Nivel(4,".$this->idNivel.",'".$this->name."',".$this->curso.",".$this->price.",'".$this->type."','".$this->resource."','".$this->nameResource."',".$this->idResource.",'')");
          
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
  


}