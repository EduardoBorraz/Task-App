<?php
   include('database.php');

   $task = $_POST['task'];
    echo $task;
   if(!empty($task)) {
     $query = "SELECT * FROM task WHERE name LIKE '$task%'";
     $result = mysqli_query($connection, $query);
     
     if(!$result) {
       die('Query Error' . mysqli_error($connection));
     }
     
     $json = array();
     while($row = mysqli_fetch_array($result)) {
       $json[] = array(
         'name' => $row['name'],
         'description' => $row['description'],
         'id' => $row['id'],
       );
     }
     $jsonstring = json_encode($json);
     echo $jsonstring;
     
   }
?>