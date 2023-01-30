<?php 
// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
try {
    $pdo = new PDO('mysql:host=localhost;dbname=blog_2023', 'root', '');
    
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>