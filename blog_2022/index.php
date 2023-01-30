<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once('conexion.php');

function tokens($length = 15){
 $caracteres ="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 $token = "";

 for ($i=0; $i < $length ; $i++) { 
    $token .= $caracteres[rand(0,61)];
 }

 return $token;
}

if (isset($_GET["login"])){

    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
    $password = sha1($data->password);
    $cokie = '';
       
    $sql = "SELECT id,token FROM users WHERE email = '$email' and password = '$password'";
  
    $sentencia = $pdo->prepare($sql);
    $sentencia->execute();


    if ($sentencia->rowCount() <= 0){
        $cokie = 'null';
  }else{
      $cokie = $sentencia->fetch();
     }
  echo json_encode($cokie); 
   
     exit();
  }



if (isset($_GET["consultar_users"])) {

    $token = $_GET["consultar_users"];
    $sql = "SELECT id FROM users WHERE token = '$token'";

    $sentencia = $pdo->prepare($sql);
    $sentencia->execute();
    if (!$sentencia) {
        $dato = false;
        echo json_encode($dato);
    } else {
        $dato = $sentencia->fetch();
        echo json_encode($dato);
    }
    exit();
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
  $sql = "SELECT publication.id As id_p,date,title,publication.picture AS img, html, users.picture as photo,
  description,category.name AS categoria,category.id As cat_id, users.name AS autor FROM `publication` 
  INNER JOIN category ON category.id = publication.fk_category INNER JOIN users 
  ON users.id = publication.fk_users WHERE publication.id = ".$_GET['consultar'] ."";

  $sentencia = $pdo->prepare($sql);
  $sentencia->execute();
  if (!$sentencia){
    echo 'Error al ejecutar la consulta';
}else{
    $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode($arreglo); 	
  exit();
}


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultarForUpdate"])){
    $sql = "SELECT publication.id As id_p,date,title,publication.picture AS img, html, users.picture as photo,
    description,category.name AS categoria,category.id As cat_id, users.name AS autor FROM `publication` 
    INNER JOIN category ON category.id = publication.fk_category INNER JOIN users 
    ON users.id = publication.fk_users WHERE publication.id = ".$_GET['consultarForUpdate'] ."";
  
    $sentencia = $pdo->prepare($sql);
    $sentencia->execute();
    if (!$sentencia){
      echo 'Error al ejecutar la consulta';
  }else{
      $arreglo = $sentencia->fetch(PDO::FETCH_ASSOC);
  }
  echo json_encode($arreglo); 	
    exit();
  }



if (isset($_GET["updateArticulos"])) {
    date_default_timezone_set('America/Mexico_City');
    $fecha = date("Y-m-d");
    $token = tokens(10);
    $data = json_decode(file_get_contents("php://input"));
    $categoria = $data->categoria;
    $id = $data->id;
    $title = $data->title;
    $description = $data->description;
    $html = $data->html;
    $nombreImagen = $data->nombreImg;
    $imagenEnBase64 = $data->fileSource;
    $imagenBorrar = $data->img_old;
    $fk_users = $data->id_user;

  
             
    if ($nombreImagen) {

        $imagen = base64_decode($imagenEnBase64);
        $ruta_salida = "picture/articulos/".$fecha.$token.$nombreImagen;
        $bd_img = $_SERVER["DOCUMENT_ROOT"].'/picture/articulos/'.$fecha.$token.$nombreImagen;
        $image_parts = explode(";base64,",$imagenEnBase64);
        $image_base64 = base64_decode($image_parts[1]);                
        file_put_contents($ruta_salida, $image_base64);
        
        $update = $pdo->prepare("UPDATE publication 
        SET 
         
         date = :date,
         title = :title,
         picture = :picture,
         description = :description,
         html = :html,
         fk_users = :fk_users,
         fk_category = :fk_category
       
        WHERE id = :id");
        
        $update->bindParam(':date', $fecha);
        $update->bindParam(':title', $title);
        $update->bindParam(':picture', $bd_img);
        $update->bindParam(':description', $description);
        $update->bindParam(':html', $html);
        $update->bindParam(':fk_users', $fk_users);
        $update->bindParam(':fk_category', $categoria);
        $update->bindParam(':id', $id);
        $update->execute();
        if ($update->rowCount() > 0) {
            echo json_encode('exito');
            unlink(substr($imagenBorrar,30));
          
        } else {
            echo json_encode('error');
        }
    }else{

        $update = $pdo->prepare("UPDATE publication 
        SET 
         
         date = :date,
         title = :title,
         description = :description,
         html = :html,
         fk_users = :fk_users,
         fk_category = :fk_category
       
        WHERE id = :id");
        
        $update->bindParam(':date', $fecha);
        $update->bindParam(':title', $title);
        $update->bindParam(':description', $description);
        $update->bindParam(':html', $html);
        $update->bindParam(':fk_users', $fk_users);
        $update->bindParam(':fk_category', $categoria);
        $update->bindParam(':id', $id);
        $update->execute();
        if ($update->rowCount() > 0) {
            echo json_encode('exito');
          
        } else {
            echo json_encode('error');
        }

    }

    exit();
}

if (isset($_GET["insertarArticulos"])) {
    date_default_timezone_set('America/Mexico_City');
    $fecha = date("Y-m-d");
    $token = tokens(10);

    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $categoria = $data->categoria;
    $title = $data->title;
    $description = $data->description;
    $nombreImagen = $data->nombreImg;
    $imagenEnBase64 = $data->fileSource;
    $html = $data->html;
 

    $imagen = base64_decode($imagenEnBase64);
    
    $ruta_salida = "picture/articulos/".$fecha.$token.$nombreImagen;
    $bd_img = $_SERVER["DOCUMENT_ROOT"].'/picture/articulos/'.$fecha.$token.$nombreImagen;

    
         $image_parts = explode(";base64,",$imagenEnBase64);
         $image_base64 = base64_decode($image_parts[1]);                
         file_put_contents($ruta_salida, $image_base64);
             
    if (($categoria != "") && ($title != "")  && ($description != "") && ($html != "")) {

        $sentencia = $pdo->prepare("INSERT INTO publication(date,title,picture,description,html,fk_users,fk_category) 
VALUES (:date, :title, :picture, :description,:html,:fk_users, :fk_category)");
        $sentencia->bindParam(':date', $fecha);
        $sentencia->bindParam(':title', $title);
        $sentencia->bindParam(':picture', $bd_img);
        $sentencia->bindParam(':description', $description);
        $sentencia->bindParam(':html', $html);
        $sentencia->bindParam(':fk_users', $id);
        $sentencia->bindParam(':fk_category', $categoria);
        $sentencia->execute();
        if ($sentencia->rowCount() > 0) {
            echo json_encode('exito');
          
        } else {
            echo json_encode('error');
        }
    }
    exit();
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if (isset($_GET["insertar"])) {
    date_default_timezone_set('America/Mexico_City');
    $fecha = date("Y-m-d");

    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $email = $data->email;
    $subject = $data->subject;
    $message = $data->message;
    if (($email != "") && ($name != "") && ($subject != "") && ($message != "")) {

        $sentencia = $pdo->prepare("INSERT INTO contact(date,name,email,subject,message) 
VALUES (:date, :name, :email, :subject, :message)");
        $sentencia->bindParam(':date', $fecha);
        $sentencia->bindParam(':name', $name);
        $sentencia->bindParam(':email', $email);
        $sentencia->bindParam(':subject', $subject);
        $sentencia->bindParam(':message', $message);
        $sentencia->execute();
        if ($sentencia->rowCount() > 0) {
            echo json_encode('exito');
        } else {
            echo json_encode('error');
        }
    }
    exit();
}

if (isset($_GET["subs"])) {
    date_default_timezone_set('America/Mexico_City');
    $fecha = date("Y-m-d");

    $data = json_decode(file_get_contents("php://input"));
    $email = $data->emailSubs;
   
    if (($email != "")) {

        $sentencia = $pdo->prepare("INSERT INTO subscribe(date,email) 
VALUES (:date, :email)");
        $sentencia->bindParam(':date', $fecha);
        $sentencia->bindParam(':email', $email);
        $sentencia->execute();
        if ($sentencia->rowCount() > 0) {
            echo json_encode('exito');
        } else {
            echo json_encode('error');
        }
    }
    exit();
}

if (isset($_GET["cards"])) {
   
        $sentencia = $pdo->prepare("SELECT publication.id As id_p,date,title,publication.picture AS img,description,category.name AS categoria, users.name AS autor FROM `publication` INNER JOIN category ON category.id = publication.fk_category INNER JOIN users ON users.id = publication.fk_users ORDER by date DESC LIMIT ".$_GET['cards'].", 8");
        $sentencia->execute();
        if (!$sentencia){
            echo 'Error al ejecutar la consulta';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo); 
        exit();	
    }
    
    if (isset($_GET["random"])) {
   
        $sentencia = $pdo->prepare("SELECT publication.id As id_p,date,title,publication.picture AS img,description,category.name AS categoria, users.name AS autor FROM `publication` INNER JOIN category ON category.id = publication.fk_category INNER JOIN users ON users.id = publication.fk_users ORDER by date DESC LIMIT 0, ".$_GET['random']."");
        $sentencia->execute();
        if (!$sentencia){
            echo 'Error al ejecutar la consulta';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo); 
        exit();	
    }


    if (isset($_GET["category"])) {
   
        $sentencia = $pdo->prepare("SELECT id,name FROM category");
        $sentencia->execute();
        if (!$sentencia){
            echo 'Error al ejecutar la consulta';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo); 
        exit();	
    }


    if (isset($_GET["filtrado"])) {
   
        $sentencia = $pdo->prepare("SELECT publication.id As id_p,date,title,publication.picture AS img,description,category.name AS categoria, users.name AS autor FROM `publication` INNER JOIN category ON category.id = publication.fk_category INNER JOIN users ON users.id = publication.fk_users WHERE publication.fk_category = ".$_GET['filtrado']." ORDER by date DESC");
        $sentencia->execute();
        if (!$sentencia){
            echo 'Error al ejecutar la consulta';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo); 
        exit();	
    }

    if(isset($_GET["contactos"])){
      
        $contacto = "SELECT id,date,name,email,subject,message FROM contact";
        $sentencia = $pdo->prepare($contacto);
        $sentencia->execute();
            
        if (!$sentencia){
            $arreglo = 'false';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo);
        exit();	
    }

    if(isset($_GET["subscribe"])){
      
        $contacto = "SELECT id,date,email FROM subscribe";
        $sentencia = $pdo->prepare($contacto);
        $sentencia->execute();
            
        if (!$sentencia){
            $arreglo = 'false';
        }else{
            $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($arreglo);
        exit();	
    }

    if(isset($_GET["deleteContacto"])){
        $id = $_GET["deleteContacto"];
        $deleteSubs = "DELETE FROM contact WHERE id = '$id'";
        $sentencia = $pdo->prepare($deleteSubs);
        $sentencia->execute();
       
        if (!$sentencia){
            $arreglo = 'error';
        }else{
            $arreglo = 'ok';
        }
        echo json_encode($arreglo);
        exit();	
    }

    if(isset($_GET["deleteSubscribe"])){
        $id = $_GET["deleteSubscribe"];
        $deleteSubs = "DELETE FROM subscribe WHERE id = '$id'";
        $sentencia = $pdo->prepare($deleteSubs);
        $sentencia->execute();
       
        if (!$sentencia){
            $arreglo = 'error';
        }else{
            $arreglo = 'ok';
        }
        echo json_encode($arreglo);
        exit();	
    }

    if(isset($_GET["deleteArticulo"])){
        $id = $_GET["deleteArticulo"];

        $deleteSubs = "DELETE FROM publication WHERE id = '$id'";
        $sentencia = $pdo->prepare($deleteSubs);
        $sentencia->execute();
       
        if (!$sentencia){
            $arreglo = 'error';
        }else{
            $arreglo = 'ok';
        }
        echo json_encode($arreglo);
        exit();	
    }
    

    if (isset($_GET["count_publication"])) {
          
        $sql = "SELECT count(*) FROM publication";
        $sentencia = $pdo->prepare($sql);
        $sentencia->execute();
        $data = $sentencia->fetch();

        if (!$data) {
            echo json_encode('error');
        }else{
            echo json_encode($data);
        }
        exit();
    }

    if (isset($_GET["count_contact"])) {
          
        $sql = "SELECT count(*) FROM contact";
        $sentencia = $pdo->prepare($sql);
        $sentencia->execute();
        $data = $sentencia->fetch();

        if (!$data) {
            echo json_encode('error');
        }else{
            echo json_encode($data);
        }
        exit();
    }

    if (isset($_GET["count_subscribe"])) {
          
        $sql = "SELECT count(*) FROM subscribe";
        $sentencia = $pdo->prepare($sql);
        $sentencia->execute();
        $data = $sentencia->fetch();

        if (!$data) {
            echo json_encode('error');
        }else{
            echo json_encode($data);
        }
        exit();
    }

// Consulta todos los registros de la tabla publication
$publicaciones = "SELECT publication.id As id_p,date,title,publication.picture AS img,html,description,category.name AS categoria, users.name AS autor FROM `publication` INNER JOIN category ON category.id = publication.fk_category INNER JOIN users ON users.id = publication.fk_users ORDER by date DESC";
$sentencia = $pdo->prepare($publicaciones);
$sentencia->execute();
     
if (!$sentencia){
    echo 'Error al ejecutar la consulta';
}else{
    $arreglo = $sentencia->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode($arreglo);
