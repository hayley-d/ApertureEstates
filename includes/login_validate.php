<?php

require_once '../config.php';
require_once 'login_model.php';
require_once 'login_contr.php';

if($_SERVER["REQUEST_METHOD"] === "POST")
{

    //get the data from the form inputs
    $email = $_POST['email'];
    $password = $_POST['password'];

    $errors = [];

    if($email == '' || $email == null || $password == "" || $password == null)
    {
        $errors['empty_input'] = "Fill in all fields";
        echo 'Empty Input'. '<br/>';
    }
    if(!is_email_valid($email))
    {
        $errors['invalid_email'] = "Email is invalid";
        echo 'Invalid Email' . '<br/>';
    }

    $user_data = [
        'type' => 'Login_',
        'email' => $email,
        'password' => $password,
    ];


    $url = 'https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php';

    // Encode the username and password for basic authentication
    $username_admin = 'u21528790';
    $password_admin = '345803Moo';
    $auth = base64_encode("$username_admin:$password_admin");


    $jsonData = json_encode($user_data);

    try{
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json', // Set the request content type
            'Authorization: Basic ' . $auth // Set basic authentication header
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        /// Check for errors
        if (curl_errno($ch))
        {
            $error = curl_error($ch);
            var_dump(curl_error($ch));
            $errors = [];
            $errors['Failed Login'] = $error;
            $_SESSION['errors_login'] = $errors;
            header('Location: ./login.php');
            die();
        }
        else {
            // Decode the JSON response
            $responseData = json_decode($response, true); // Decode JSON into associative array


            // Check if the response is successful
            if (isset($responseData['status']) && $responseData['status'] === 'success')
            {
                $userData = $responseData['data'];

                $apiKey = $userData['apikey'];

                if(!is_password_valid($password,$userData['password'],$userData['salt']))
                {
                    $errors['wrong_password'] = "Password is incorrect";
                }



                if(count($errors) > 0)
                {
                    $_SESSION['errors_login'] = $errors;
                    var_dump($_SESSION["errors_login"]);
                   header("location: ./login.php");
                    die();
                }
                else{
                    require_once '../config_session.php';

                    $information = get_user_info($apiKey);

                    $newSessionId = session_create_id();//creates a new id with the users api key
                    $sessionId = $newSessionId . '_' . $apiKey;
                    session_id($sessionId); //sets the session id to the created session id

                    $_SESSION['apikey'] = $apiKey;
                    $_SESSION['email'] = htmlspecialchars($userData['email']);//sanitize result avoid any cross side scripting
                    $_SESSION['password'] = $userData['password'];
                    $_SESSION['name'] = $userData['name'];
                    $_SESSION['information'] = $information;
                    if($information['theme'] == 'dark')
                    {
                        $_SESSION['light'] = false;
                    }
                    else{
                        $_SESSION['light'] = true;
                    }

                    $_SESSION['last_regeneration'] = time();

                    header('location: ../listings.php');
                }

            }
            else {
                // Failed login
                $errors = [];
                $errors['Failed Login'] = "Login Failed";
                $_SESSION['errors_login'] = $errors;
                header('Location: ./login.php');
                die();
            }
        }

        curl_close($ch);


    } catch(mysqli_sql_exception $e)
    {
        $errors = [];
        $errors['Failed Login'] = $e->getMessage();
        $_SESSION['errors_login'] = $errors;
        header('Location: ./login.php');
        die();
    }
}
else{
    //if no post method was recieved
    header("Location: ../listings.php");
    die();
}
?>
