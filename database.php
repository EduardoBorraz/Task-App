<?php
 $user = 'root';
 $password = 'root';
 $db = 'task-db';
 $host = '127.0.0.1';
 $port = 8889;
 $socket = 'localhost:/Applications/MAMP/tmp/mysql/mysql.sock';
 
 
 $connection = mysqli_connect(
    $host,
    $user,
    $password,
    $db,
    $port,
    $socket
 );

    /* if ($connection) {
        echo "Database is contected";
    }else{
        echo "Error Contected";
    } */
?>