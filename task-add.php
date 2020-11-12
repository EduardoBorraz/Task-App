<?php
    include("database.php");

    if (isset($_POST['name'])) {
        $task_name = $_POST['name'];
        $task_description = $_POST['description'];

        $query = "INSERT INTO task(name, description) VALUES ('$task_name', '$task_description')";
        $resutl = mysqli_query($connection,$query);

        if (!$result) {
            die('query field.');
        }
        echo "Task add Succeessfully";
    }

    
   
?>