<?php
//only database queries and communicating with the datatbase
declare(strict_types=1);

require_once '../config.php';

function get_user(string $email_given)
{
    global $db;
    $query = "SELECT * FROM u21528790_users WHERE email = ?";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $email_given); // 's' indicates a string parameter
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

function create_user($name,$surname,$email,$password):void
{
    global $db;
    $apikey = generateApiKey();
    $hash = argon2i($password);
    $hashed_password = $hash['password'];
    $salt = $hash['salt'];

    $query = "INSERT INTO u21528790_users (name,surname,email,password,apikey,salt) VALUES (?,?,?,?,?,?);";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("ssssss", $name,$surname,$email,$hashed_password,$apikey,$salt);
        $stmt->execute();

    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
        header('Location: ../listings.php');
        die();
    }
}

function get_email($email_given)
{
    global $db;
    $query = "SELECT * FROM u21528790_users WHERE email = ?";

    try {
        $stmt = $db->prepare($query);
        if (!$stmt) {
            throw new Exception("Error preparing statement: " . $db->error);
        }
        $stmt->bind_param("s", $email_given); // 's' indicates a string parameter
        if (!$stmt->execute()) {
            throw new Exception("Error executing statement: " . $stmt->error);
        }

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

function create_user_info($apikey):void
{
    global $db;
    $favourites = "";
    $theme = "dark";


    $query = "INSERT INTO user_information (apikey,favourites,theme) VALUES (?,?,?);";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("sss", $apikey,$favourites,$theme);
        $stmt->execute();

    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
        header('Location: ../listings.php');
        die();
    }
}

function get_user_key(string $email_given)
{
    global $db;
    $query = "SELECT apikey FROM u21528790_users WHERE email = ?";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $email_given); // 's' indicates a string parameter
        $stmt->execute();

        // Bind the result variable
        $stmt->bind_result($apikey);

        // Fetch the user data
        $stmt->fetch();

        // Return the user data
        return $apikey;
    } catch (Exception $e) {
        // Handle the exception (log, display an error, etc.)
        echo "Error: " . $e->getMessage();
        return null;
    }
}
?>
