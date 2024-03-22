<?php
require_once '../config.php';
/*require_once './api.php';*/

class GetAllAgents{
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

/*    protected function handelRequest(){
        //get the JSON data from the request body
        $jsonInput = file_get_contents('php://input');

        //decode the JSON into an associative array
        $requestData = json_decode($jsonInput,true);

        // Check if the required keys are present in the request
        $requiredKeys = ['apikey', 'type', 'return'];

        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $requestData)) {
                $this->respondWithError("Missing '$key' in the request.");
                return;
            }
        }

        // Extract data from the request
        $apiKey = $requestData['apikey'];
        $type = $requestData['type'];
        $return = $requestData['return'];

        // Optional keys with default values if not present
        $limit = $requestData['limit'] ?? null;
        $sort = $requestData['sort'] ?? null;
        $order = $requestData['order'] ?? null;
        $search = $requestData['search'] ?? null;


        //process data


        // Respond with a success message
        $this->respondWithSuccess('Request processed successfully.');
    }*/

    public function response($success, $message = "", $data="")
    {

        echo json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ]);
    }

    private function respondWithError($message)
    {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $message]);
    }
}

$api = new GetAllAgents();

$agents = $api->GetAllAgents();


