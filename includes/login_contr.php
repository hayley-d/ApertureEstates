<?php
declare(strict_types=1);
function is_password_valid(string $password, string $hashed_password_with_salt)
{
    if(verify_argon2i($password,$hashed_password_with_salt))
    {
        return true;
    }
    else{
        ?>
        <script>console.log("passwords do not match.")</script>
        <?php
        return false;
    }
}

function verify_argon2i($password, $hashed_password_with_salt): bool
{
    // Extract the hash and salt from the stored value
    list($stored_hash, $stored_salt) = explode('|', $hashed_password_with_salt);

    // Verify the password
    return password_verify($password . $stored_salt, $stored_hash);
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
    if(filter_var($email,FILTER_VALIDATE_EMAIL)){
        return true;
    }
    else{
        return false;
    }
}



