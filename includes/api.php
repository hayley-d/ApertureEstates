<?php
require_once '../config.php';

//get the post data
$json = file_get_contents('php://input');
// Converts it into a PHP object
$requestData = json_decode($json,true);

class api
{
    protected const APIURL = 'https://wheatley.cs.up.ac.za/api/getimage';
    /*Verify the apikey*/
    public function verifyUser($apikey)
    {
        // Sanitize the API key using FILTER_SANITIZE_STRING
        $sanitizedApiKey = filter_var($apikey, FILTER_SANITIZE_STRING);

        global $db;

        $query = "SELECT apikey FROM u21528790_users WHERE apikey = ?";

        try {
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $sanitizedApiKey);
            $stmt->execute();

            // Bind the result variable
            $stmt->bind_result($resultApiKey);

            // Fetch the user data
            $stmt->fetch();

            // Return the user data
            return $resultApiKey !== null;

        } catch (Exception $e) {
            $error_message = "Error verifying user";
            http_response_code(400);
            echo json_encode(['error' => $error_message]);
            return false;
        }
    }

    public function response($success, $message = "", $data="")
    {
        header('Content-Type: application/json');

        $time = time();

        $responseData = ["status" => 'success', "timestamp" => $time, "data" => $data];

        // Encode the response data
        echo json_encode($responseData, JSON_PRETTY_PRINT);
    }

    public function GetAllListings($db,$limit,$sort_field,$sort_order, $search,$page,$fuzzy)
    {
        // Sanitize and validate parameters
        $limit = filter_var($limit, FILTER_VALIDATE_INT);
        $sort_field = filter_var($sort_field, FILTER_SANITIZE_STRING);
        $sort_order = strtoupper(filter_var($sort_order, FILTER_SANITIZE_STRING));
        $page = filter_var($page, FILTER_VALIDATE_INT);

        // Calculate the offset based on the page number and limit
        $offset = ($page - 1) * $limit;

        $query = "SELECT * FROM u21528790_properties ";

        if ($search !== null) {
            // Convert the object to an array of key-value pairs
            $searchArray = [];
            foreach ($search as $key => $value) {
                if ($fuzzy) {
                    $searchArray[] = "$key LIKE ?";
                    $value = "%$value%";
                } else {
                    $searchArray[] = "$key = ?";
                }
            }

            // Build WHERE clause for search parameters
            $whereClause = implode(' AND ', $searchArray);
            $query .= " WHERE $whereClause";
        }

        // Add ORDER BY and LIMIT clauses
        if ($sort_field !== null && in_array(strtoupper($sort_order), ['ASC', 'DESC'])) {
            $query .= " ORDER BY $sort_field $sort_order";
        }
        if ($limit !== null && is_numeric($limit)) {
            $query .= " LIMIT $limit OFFSET $offset";
        }

        try{

            $stmt = $db->prepare($query);

            if (!$stmt) {
                throw new Exception("Error preparing the SQL query.");
            }

            if($search !== null)
            {
                // Bind parameters dynamically
                $bindTypes = str_repeat('s', count($search));
                $stmt->bind_param($bindTypes, ...array_values($search));
            }

            // Execute the statement
            $executionResult = $stmt->execute();

            if (!$executionResult) {
                throw new Exception("Error executing the SQL query: " . $stmt->error);
            }

            // Get the result set
            $result = $stmt->get_result();

            if (!$result) {
                throw new Exception("Error getting the result set: " . $stmt->error);
            }

            // Fetch all results
            $results = $result->fetch_all(MYSQLI_ASSOC);
            // Return the user data

           $this->handleReturn('*',$results);

            return $results;
        }

        catch (Exception $e) {

            $error_message = "Error fetching data. Please try again later.";

            http_response_code(500);
            echo json_encode(['error' => $error_message]);
            return null;
        }
    }

    public function getImageUrl($queryParams) {
        // Construct the full URL with query parameters
        $urlWithParams = API::APIURL . '?' . http_build_query($queryParams);
        // Initialize cURL session
        $ch = curl_init($urlWithParams);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session and get the result
        $jsonResponse  = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            return null;
        }

        // Close cURL session
        curl_close($ch);

        $response = json_decode($jsonResponse, true);

        if ($response === null || !isset($response['data']))
        {
            echo "Error fetching images";
            return null;
        }

        $imageUrls = $response['data'];

        if(gettype($imageUrls)=='String')
        {
            $imageUrlsArray = explode(",", $imageUrls);
            $sanitizedUrls = array_map(function ($imageUrl) {
                return htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8');
            }, $imageUrlsArray);

            // Check if the response contains valid image URLs
            foreach ($sanitizedUrls as $imageUrl) {
                if (filter_var($imageUrl, FILTER_VALIDATE_URL) === false) {
                    return null;
                }
            }
            return $sanitizedUrls;
        }

        $sanitizedUrls = array_map(function ($imageUrl) {
            return htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8');
        }, $imageUrls);

        // Check if the response contains valid image URLs
        foreach ($sanitizedUrls as $imageUrl) {
            if (filter_var($imageUrl, FILTER_VALIDATE_URL) === false) {
                return null;
            }
        }
        return $sanitizedUrls;
    }

    public function registerUser($name,$surname,$email,$password)
    {

        if($name == null || $surname == null || $email  == null || $password == null)
        {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "invalid user signup information",
                "data" => []
            ]);
            die();
        }

        if (!$this->is_email_valid($email)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Invalid email address",
                "data" => []
            ]);
            die();
        }

        if (strlen($password) < 8 ||
            !preg_match('/[A-Z]/', $password) ||
            !preg_match('/[a-z]/', $password) ||
            !preg_match('/\d/', $password) ||
            !preg_match('/[!@#$%^&*()\-_=+{};:,<.>ยง~]/', $password)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
                "data" => []
            ]);
            die();
        }

        // Check if user with the email already exists
        $user = $this->get_user($email);

        if ($user === null)
        {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "User with this email already exists",
                "data" => []
            ]);
            die();
        }

        $hash = $this->argon2i($password);
        $apikey = $this->generateApiKey();

        $salt = $hash["salt"];
        $hashedPassword = $hash["password"];
        global $db;
        $query = "INSERT INTO u21528790_users (name, surname, email, password, apikey, salt) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            $stmt = $db->prepare($query);
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $db->error);
            }
            $stmt->bind_param("ssssss", $name, $surname, $email, $hashedPassword, $apikey, $salt);
            $stmt->execute();
        } catch (Exception $e) {
            var_dump( $db->error);
            // If an exception occurs, handle it and return an error response
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => $e->getMessage(),
                "data" => []
            ]);
            die();
        }

// If the insertion was successful, return a success response
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "User registered successfully",
            "data" => []
        ]);
        die();
    }

    public function GetAllAgents ()
    {
        global $db;

        $query = "SELECT * FROM agencies";

        try {
            $stmt = $db->prepare($query);
            $stmt->execute();

            // Bind the result variable
            $stmt->bind_result($id,$name,$description,$logo,$url);

            // Fetch all rows
            $agents = [];
            while ($stmt->fetch()) {
                $agent = [
                    'id' => $id,
                    'name' => $name,
                    'description' => $description,
                    'logo' => $logo,
                    'url' => $url
                ];
                $agents [] = $agent;
            }

            // Return the makes array
            $this->response(true,'All agents fetched',$agents);
        } catch (Exception $e) {
            // Handle the exception (log, display an error, etc.)
            echo "Error: " . $e->getMessage();
            echo "Error fetching call makes.";
            return null;
        }
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
    
    public  function handleReturn( $return, $database_results)
    {
        $results = [];
        // function filters out any unwanted data

        if (gettype($return) === 'string')
        {
            foreach ($database_results as $result) {

                $images = $this->getImageUrl(['listing_id' => $result['id']]);
                $result['images'] = $images;
            }
            $this->response(true,"success",$database_results);
            return $database_results;
        } else {
            foreach ($database_results as $result) {
                $singleResult = [];

                foreach ($return as $key) {
                    // Check if the key exists in the current result
                    if (array_key_exists($key, $result)) {
                        $singleResult[$key] = $result[$key];
                    } else {
                        // Handle non-existent key (you can log a warning or take other actions)
                        echo "Error invalid key: " . $key;
                    }
                }
                $images = $this->getImageUrl(['listing_id' => $result['id']]);
                $singleResult['images'] = $images;
                $results[] = $singleResult;
            }
            $this->response(true,"success",$results);
            return $results;
        }
    }

    function is_email_valid($email):bool
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

    function login($email_given,$password_given)
    {
        if($email_given == null || $password_given == null)
        {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => "Invalid Input"
            );
            echo json_encode($response, JSON_PRETTY_PRINT);

            die();
        }

        if(!$this->is_email_valid($email_given))
        {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => "Invalid Email"
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            die();
        }

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



            if($email == null)
            {
                header('Content-Type: application/json');
                http_response_code(400);
                $timestamp = round(microtime(true) * 1000);
                $response = array(
                    "status" => "Fail",
                    "timestamp" => $timestamp,
                    "data" => "User not found"
                );
                echo json_encode($response, JSON_PRETTY_PRINT);
                die();
            }
            else{
                if(!$this->is_password_valid($password_given,$password,$salt))
                {
                    header('Content-Type: application/json');
                    http_response_code(400);
                    $timestamp = round(microtime(true) * 1000);
                    $response = array(
                        "status" => "Fail",
                        "timestamp" => $timestamp,
                        "data" => "Wrong Password"
                    );
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    die();
                }
                else{
                    header('Content-Type: application/json');
                    http_response_code(400);
                    $timestamp = round(microtime(true) * 1000);
                    $response = array(
                        "status" => "success",
                        "timestamp" => $timestamp,
                        "data" => [
                            [
                                "apikey" => $apikey
                            ]
                        ]
                    );
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    die();
                }
            }

        } catch (Exception $e) {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => $e->getMessage()
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            die();
        }
    }

    function loginImplement($email_given,$password_given)
    {
        if($email_given == null || $password_given == null)
        {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => "Invalid Input"
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            die();
        }

        if(!$this->is_email_valid($email_given))
        {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => "Invalid Email"
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            die();
        }

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
            $user = [
                'id' => $id,
                'name' => $name,
                'surname' => $surname,
                'email' => $email,
                'password' => $password,
                'apikey' => $apikey,
                'salt' => $salt
            ];

            if($email == null)
            {
                header('Content-Type: application/json');
                http_response_code(400);
                $timestamp = round(microtime(true) * 1000);
                $response = array(
                    "status" => "Fail",
                    "timestamp" => $timestamp,
                    "data" => "User not found"
                );
                echo json_encode($response, JSON_PRETTY_PRINT);
                die();
            }
            else{
                if(!$this->is_password_valid($password_given,$password,$salt))
                {
                    header('Content-Type: application/json');
                    http_response_code(400);
                    $timestamp = round(microtime(true) * 1000);
                    $response = array(
                        "status" => "Fail",
                        "timestamp" => $timestamp,
                        "data" => "Wrong Password"
                    );
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    die();
                }
                else{
                    header('Content-Type: application/json');
                    http_response_code(400);
                    $timestamp = round(microtime(true) * 1000);
                    $response = array(
                        "status" => "success",
                        "timestamp" => $timestamp,
                        "data" => $user
                    );
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    die();
                }
            }

        } catch (Exception $e) {
            header('Content-Type: application/json');
            http_response_code(400);
            $timestamp = round(microtime(true) * 1000);
            $response = array(
                "status" => "Fail",
                "timestamp" => $timestamp,
                "data" => $e->getMessage()
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            die();
        }
    }

    function is_password_valid( $password, $hashed_password, $salt)
    {
        if($this->verify_argon2i($password,$hashed_password,$salt))
        {
            return true;
        }
        else{
            return false;
        }
    }

    function verify_argon2i($password, $hashed_password , $salt)
    {
        // Verify the password
        return password_verify($password . $salt, $hashed_password);
    }
}

$api = new api();

if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    $type = $requestData['type'] ?? null;
    /*$type = "Register";
    $requestData['name'] = "Tom";
    $requestData['surname'] = "Nook";
    $requestData['email'] = "tom@proton.me";
    $requestData['password'] = "123456Woo*";*/
    if($type == 'Register')
    {
        $name = $requestData['name'] ?? null;
        $surname = $requestData['surname'] ?? null;
        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;
        $api->registerUser($name,$surname,$email,$password);
        die();
    }
    else if($type == "Login")
    {
        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;
        $api->login($email,$password);
        die();
    }
    else if($type == "Login_")
    {
        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;
        $api->loginImplement($email,$password);
        die();
    }

    $apiKey = $requestData['apikey'] ?? null;
    $limit = $requestData['limit'] ?? null;
    $sort = $requestData['sort'] ?? null;
    $order = $requestData['order'] ?? null;
    $search = $requestData['search'] ?? null;
    $fuzzy = $requestData['fuzzy'] ?? null;

    $page = $requestData['page'] ?? null;

    /*$type = 'GetAllListings';
    $page=1;
    $limit = 20;*/



    if($api->verifyUser($apiKey)){
        global $db;

        if($type == 'GetAllListings')
        {
            $api->GetAllListings($db,$limit,$sort,$order,$search,$page,$fuzzy);
        }
        else if($type == 'GetAllAgents')
        {
            $api->GetAllAgents();
        }
        else {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "invalid type",
            ]);
            die();
        }
    }
    else{
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "invalid user",
            "data" => $apiKey
        ]);
        die();
    }

}
