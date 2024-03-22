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

