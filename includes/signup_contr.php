<?php
declare(strict_types=1);

//handels user input

function is_input_empty( string $name,string $surname,string $email,string $password,string $confirm_password):bool
{
    if( empty($name) || empty($surname) || empty($password) || empty($email) || empty($confirm_password))
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

function passwords_match(string $password,string $confirm_password): bool
{
    if($password === $confirm_password)
    {
        return true;
    }
    else{
        return false;
    }
}

function is_email_registered($email)
{
    if(get_email($email)['email'] !== null)
    {
        return true;
    }
    else {
        return false;
    }
}

function set_user($name,$surname,$email,$password):void
{
    create_user($name,$surname,$email,$password);
}

function generateApiKey() {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $apiKey = '';

    for ($i = 0; $i < 16; $i++) {
        $apiKey .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $apiKey;
}

function argon2i($password)
{
    $salt = bin2hex(random_bytes(16)); // generate a random 16-byte salt
    $hash_options = [
        'memory_cost' => 1024, // memory cost parameter
        'time_cost' => 2, // time cost parameter
        'threads' => 2 // number of threads to use
    ];

    // Hash the password with Argon2i
    $hashed_password = password_hash($password . $salt, PASSWORD_ARGON2I, $hash_options);

    // Return the hashed password and the salt
    return [
        "password" => $hashed_password,
        "salt" => $salt
    ];
}

function validatePassword($password)
{
    if(!strlen($password)>=8)
    {
        return false;
    }

    //check for at least 1 digit
    if (!preg_match('/\d/', $password)) {
        return false;
    }

    //check for special character
    if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
        return false;
    }

    return true;
}


?>
