<?php
declare(strict_types=1);

function get_user(string $email_given)
{
    global $db;

    $query = "SELECT * FROM u21528790_users WHERE email = ?";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $email_given);
        $stmt->execute();

        // Bind the result variable
        $stmt->bind_result($id,$name,$surname,$email,$password,$apikey,$salt);

        // Fetch the user data
        $stmt->fetch();

        // Return the user data
        return [
            'id' => $id,
            'name' => $name,
            'surname' => $surname,
            'email' => $email,
            'password' => $password,
            'apikey' => $apikey,
            'salt' => $salt
        ];
    } catch (Exception $e) {
        // Handle the exception (log, display an error, etc.)
        echo "Error: " . $e->getMessage();
        return null;
    }
}

function get_user_info(string $apikey_given)
{
    global $db;

    $query = "SELECT * FROM user_information WHERE apikey = ?";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $apikey_given);
        $stmt->execute();

        // Bind the result variable
        $stmt->bind_result($apikey,$favourites,$theme,$min_bathrooms,$max_bathrooms,$min_bedrooms,$max_bedrooms,$min_price,$max_price);

        // Fetch the user data
        $stmt->fetch();

        // Return the user data
        return [
            'apikey' => $apikey,
            'favourites' => $favourites,
            'theme' => $theme,
            'min_bathrooms' => $min_bathrooms,
            'max_bathrooms' => $max_bathrooms,
            'min_bedrooms' => $min_bedrooms,
            'max_bedrooms' => $max_bedrooms,
            'min_price' => $min_price,
            'max_price' => $max_price
        ];
    } catch (Exception $e) {
        // Handle the exception (log, display an error, etc.)
        echo "Error: " . $e->getMessage();
        return null;
    }
}

