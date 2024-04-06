<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');


class GetImage {
    private const APIURL = 'https://wheatley.cs.up.ac.za/api/getimage';

    protected function getImageUrl($queryParams) {
        // Construct the full URL with query parameters
        $urlWithParams = GetImage::APIURL . '?' . http_build_query($queryParams);

        // Initialize cURL session
        $ch = curl_init($urlWithParams);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session and get the result
        $jsonResponse  = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            // Handle cURL error
            // Log the error or return an appropriate response
            return null;
        }

        // Close cURL session
        curl_close($ch);

        $response = json_decode($jsonResponse, true);

        if ($response === null) {
            // Handle JSON decoding error
            // Log the error or return an appropriate response
            return null;
        }

        // Check if the response contains a 'data' key
        if (!isset($response['data'])) {
            // Handle missing 'data' key
            // Log the error or return an appropriate response
            return null;
        }

        // Get the image URLs from the 'data' key
        $imageUrls = $response['data'];

        foreach ($imageUrls as &$imageUrl) {
            $imageUrl = preg_replace('/[^a-zA-Z0-9_:.\/-]/', '', $imageUrl);
        }

        // Check if the response contains valid image URLs
        foreach ($imageUrls as $imageUrl) {
            if (filter_var($imageUrl, FILTER_VALIDATE_URL) === false) {
                // Handle invalid image URL
                // Log the error or return an appropriate response
                return null;
            }
        }

        return $imageUrls;
    }

    public function handleRequest($in_id,$in_agent){
        // Extract parameters from the query string
        $id = $in_id ?? null;
        $agent = $in_agent ?? null;

        if ($agent === null) {
            $queryParams = ['listing_id' => $id];
        }
        else{
            $queryParams = ['agency' => $agent];
        }
        // Get the image URL
        $url = $this->getImageUrl($queryParams);
        var_dump($url);
        if ($url === null) {
            return GetImage::APIURL;
        } else {
            return ($url);
        }
    }

    private function respondWithSuccess($url):void
    {
        // Determine the content type based on the image file extension
        $contentType = mime_content_type($url);
        header("HTTP/1.1 200 OK");
        header('Content-Type: ' . $contentType);

        // Output the image content
        echo ($url);
    }

    private function respondWithError():void
    {

        header('Content-Type: ');

    }
    public function verifyUser($apikey):bool
    {
        global $db;

        $query = "SELECT apikey FROM u21528790_users WHERE apikey = ?";

        try {
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $apikey); // 's' indicates a string parameter
            $stmt->execute();

            // Bind the result variable
            $stmt->bind_result($resultApiKey);

            // Fetch the user data
            $stmt->fetch();

            // Return the user data
            return $resultApiKey !== null;

        } catch (Exception $e) {
            // Handle the exception (log, display an error, etc.)
            echo "Error: " . $e->getMessage();
            echo "Error verifying user: GetAllListings";
            return false;
        }
    }
}

$api = new GetImage();

