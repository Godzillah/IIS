
<?php
/**
 * Created by PhpStorm.
 * User: majkl
 * Date: 11.10.2018
 * Time: 23:07
 */

include "database/db.php";

function showAllData(){
    global $connection;
    $query = "SELECT * FROM tbl_users";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Query FAILED" . mysqli_error($connection));
    }

    while($row = mysqli_fetch_assoc($result)){
        $id = $row['id'];
    }
}

function createRows(){
    global $connection;
    if (isset($_POST['submit'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $username = mysqli_real_escape_string($connection, $username);      // je to kvoli napirklad aby nebol error pri : Peter's
        $password = mysqli_real_escape_string($connection, $password);

        $hashFormat = "$2a$10$";
        $salt = "iusesomecrazystrings22";
        $hashFAndSalt = $hashFormat . $salt;
        $password = crypt($password, $hashFAndSalt);

        $query = "INSERT INTO tbl_users(username, password) ";
        $query .= "VALUES ('$username', '$password')";
        $result = mysqli_query($connection, $query);
        if (!$result) {
            die("Query FAILED" . mysqli_error($connection));
        }
    }
}

function UpdateTable(){
    global $connection;
    $username = $_POST['username'];
    $password = $_POST['password'];
    $id = $_POST['id'];

    $query = "UPDATE tbl_users SET ";
    $query .= "username = '$username', ";
    $query .= "password= '$password' ";
    $query .= "WHERE id = $id ";

    echo $query;

    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Querry FAILED!" . mysqli_error($connection));
    }
}

function DeleteRows(){
    global $connection;
    $id = $_POST['id'];

    $query = "DELETE FROM tbl_users ";
    $query .= "WHERE id = $id ";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Querry FAILED!" . mysqli_error($connection));
    }
}

function readRows(){
    global $connection;
    $query = "SELECT * FROM tbl_users";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Querry FAILED!" . mysqli_error());
    }
    while($row = mysqli_fetch_assoc($result)){
        print_r($row);
    }
}
