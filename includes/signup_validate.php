<?php
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    //get all the data from the form
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $surname = filter_input(INPUT_POST, 'surname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];



    try{
        require_once '../config.php';
        require_once 'signup_model.php';
        require_once 'signup_contr.php';

        //Step 4: Error handlers
        $errors = [];

        if(is_input_empty($name,$surname,$email,$password,$confirm_password)){
            $errors['empty_input'] = 'Please enter all required fields.';
        }
        else if(!is_email_valid($email))
        {
            $errors['invalid_email'] = 'Please enter an email address';
        }
        else if(!passwords_match($password,$confirm_password))
        {
            $errors['password_match'] = 'Passwords do not match';
        }
        else if(is_email_registered($email)){
            $errors['email_taken'] = 'Email is taken';
        }
        else if(!validatePassword($password))
        {
            $errors['invalid_password'] = 'Password is not secure enough it must contain at least 1 digit, 1 special character and be 8 characters long';
        }

        require_once '../config_session.php';

        if(count($errors)>0)
        {
            $_SESSION['error_signup'] = $errors;

            $user_data = [
                'name' => $name,
                'password' => "",
                'confirm_password' => "",
                'email' => $email,
                'surname' => $surname,
            ];

            $_SESSION['user_signup_data'] = $user_data;
            header('Location: ./signup.php');
            die();
        }

        $user_data = [
            'type' => 'Register',
            'name' => $name,
            'password' => $password,
            'email' => $email,
            'surname' => $surname,
        ];

        //set_user($name,$surname,$email,$password);
        $url = 'https://wheatley.cs.up.ac.za/u21528790/COS216/PA3/includes/api.php';
        // Encode the username and password for basic authentication
        $username = 'u21528790';
        $password = '345803Moo';
        $auth = base64_encode("$username:$password");

        $jsonData = json_encode($user_data);
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
        // Check for errors
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            $errors = [];
            $errors['Failed Signup'] = $error;
            $_SESSION['error_signup'] = $errors;
            header('Location: ./signup.php');
        } else {
            // Check the HTTP response code
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($httpCode == 201 || $httpCode == 200)
            {
                echo "Signup successful!";
                header('Location: ./login.php?signup=success');
            } else {
                // Failed signup
                $errors = [];
                $errors['Failed Signup'] = "Signup Failed";
                $_SESSION['error_signup'] = $errors;
                header('Location: ./signup.php');
            }
        }

        curl_close($ch);
        die();

    } catch(mysqli_sql_exception $e)
    {
        die('Signup Failed: ' . $e->getMessage());
    }

}
else{
    header("Location: ./signup.php");
    die();
}
?>
