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
        $stmt->bind_result($id,$name,$surname,$email,$password,$apikey);

        // Fetch the user data
        $stmt->fetch();

        // Return the user data
        return [
            'id' => $id,
            'name' => $name,
            'surname' => $surname,
            'email' => $email,
            'password' => $password,
            'apikey' => $apikey
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
    $hashed_password = argon2i($password);

    $query = "INSERT INTO u21528790_users (name,surname,email,password,apikey) VALUES (?,?,?,?,?);";

    try {
        $stmt = $db->prepare($query);
        $stmt->bind_param("sssss", $name,$surname,$email,$hashed_password,$apikey);
        $stmt->execute();

    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
        header('Location: ../listings.php');
        die();
    }
}

function get_email(string $email_given)
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
        $stmt->bind_result($id,$name,$surname,$email,$password,$apikey);

        // Fetch the user data
        $stmt->fetch();

        // Return the user data
        return [
            'id' => $id,
            'name' => $name,
            'surname' => $surname,
            'email' => $email,
            'password' => $password,
            'apikey' => $apikey
        ];
    } catch (Exception $e) {
        // Handle the exception (log, display an error, etc.)
        echo "Error: " . $e->getMessage();
        return null;
    }
}
?>
