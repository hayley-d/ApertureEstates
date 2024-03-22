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

        if(empty($errors))
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

        set_user($name,$surname,$email,$password);

        header('Location: ./login.php?signup=success');
        $stmt = null;

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
