<?php

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    //get the data from the form inputs
    $email = $_POST['email'];
    $password = $_POST['password'];


    try{

        require_once '../config.php';
        require_once 'login_model.php';
        require_once 'login_contr.php';

        $errors = [];

        if(is_input_empty($email,$password)){
            $errors['empty_input'] = "Fill on all fields";
        }

        $result = get_user($email);

        if(!is_email_valid($result['email']))
        {
            $errors['invalid_email'] = "Email is invalid";
        }

        if(is_email_valid($result['email']))
        {
            if(!is_password_valid($password,$result['password']))
            {
                $errors['wrong_password'] = "Password is incorrect";
            }
        }

        require_once '../config_session.php';

        if($errors){
            $_SESSION['errors_login'] = $errors;

            header("location: ./login.php");
            die();
        }

        $newSessionId = session_create_id();//creates a new id with the users api key
        $sessionId = $newSessionId . '_' . $result['apikey'];
        session_id($sessionId); //sets the session id to the created session id

        $_SESSION['apikey'] = $result['apikey'];
        $_SESSION['email'] = htmlspecialchars($result['email']);//sanitize result avoid any cross side scripting
        $_SESSION['password'] = $result['password'];
        $_SESSION['name'] = $result['name'];

        $_SESSION['last_regeneration'] = time();

        header('location: ../listings.php');

        $stmt = null;//close statement
        die();

    } catch(mysqli_sql_exception $e){
        die("Login Failed: " . $e->getMessage());
    }
}
else{
    //if no post method was recieved
    header("Location: ../listings.php");
    die();
}
?>
