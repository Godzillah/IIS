<?php
/**
 * Created by PhpStorm.
 * User: majkl
 * Date: 11.10.2018
 * Time: 22:41
 */


    $connection = mysqli_connect('localhost', 'root', 'prospektivny159', 'db_nemocnica');
    if(!$connection ) {
        die("Database connection failed!");
    }