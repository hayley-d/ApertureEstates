<?php
declare(strict_types=1);
function is_password_valid($password, $hashed_password, $salt)
{
    // Compare the hashed password with the stored hashed password
    return password_verify($password . $salt, $hashed_password);
}

function is_input_empty($username,$password)
{
    if(empty($username) || empty($password))
    {
        return true;
    }
    else{
        return false;
    }
}

function is_email_valid(string $email):bool
{
    // Check if the email contains an "@" symbol
    if (strpos($email, '@') === false) {
        return false;
    }

    // Check if the email has at least one character before the "@" symbol
    $username = explode('@', $email)[0];
    if (empty($username)) {
        return false;
    }

    if(filter_var($email,FILTER_VALIDATE_EMAIL)){
        return true;
    }
    else{
        return false;
    }
}



