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
    public function verifyUser($apikey):bool
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

        $time = time();
        // Check if there is a message and set the message key
        $responseData = ["status" => 'success', "timestamp" => $time, "data" => $data];

        // Encode the response data
        echo json_encode($responseData, JSON_PRETTY_PRINT);
    }

    public function GetAllListings($db,$limit,$sort_field,$sort_order, $search,$page,$fuzzy):array|null
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

    public function getImageUrl(array $queryParams): array|null {
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

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
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

        $name = filter_var($name, FILTER_SANITIZE_STRING);
        $surname = filter_var($surname, FILTER_SANITIZE_STRING);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $password = filter_var($password, FILTER_SANITIZE_STRING);

        // Check if user with the email already exists
        global $db;
        $query = "SELECT COUNT(*) FROM u21528790_users WHERE email = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();

        if ($count > 0) {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "User with this email already exists",
                "data" => []
            ]);
            die();
        }

        $hashedPassword = argon2i($password);
        $apikey = generateApiKey();

        $query = "INSERT INTO u21528790_users (name, surname, email, password, apikey) VALUES (?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("sssss", $name, $surname, $email, $hashedPassword, $apikey);

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to register user",
                "data" => []
            ]);
            die();
        }
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "User registered successfully",
            "data" => []
        ]);
        die();
    }

    function generateApiKey() {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $apiKey = '';

        for ($i = 0; $i < 16; $i++) {
            $apiKey .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $apiKey;
    }

    function argon2i($password): string
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
        return $hashed_password . '|' . $salt;
    }

    /*public function getImageUrl(array $queryParams): array|null {
        // Construct the full URL with query parameters
        $urlWithParams = API::APIURL . '?' . http_build_query($queryParams);

        // Initialize cURL session
        $ch = curl_init($urlWithParams);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session and get the result
        $jsonResponse = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            // Handle cURL error
            return null;
        }

        // Close cURL session
        curl_close($ch);

        $response = json_decode($jsonResponse, true);

        if ($response === null || !isset($response['data'])) {
            // Handle error
            return null;
        }

        $imageUrls = $response['data'];

        // Sanitize the image URLs
        $sanitizedUrls = array_map(function ($imageUrl) {
            return htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8');
        }, $imageUrls);

        return $sanitizedUrls;
    }*/



    public  function handleReturn(string|array $return,array $database_results):array
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
}

$api = new api();

if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    $type = $requestData['type'] ?? null;
    if($type == 'Register')
    {
        $name = $requestData['name'] ?? null;
        $surname = $requestData['surname'] ?? null;
        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;
        $api->registerUser($name,$surname,$email,$password);
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
            $api->GetAllListings($db,$limit,$sort,$order,$search,$page,$fuzzy);
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
